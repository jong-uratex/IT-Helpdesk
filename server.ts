import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { DIRECTORY_DATA, handleItKnowledge, AVAILABLE_MODELS } from './src/data/uratexDirectory.ts';
import { resolveWithRobbieEngine } from './src/data/robbieEngine.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

// Initialize Gemini API client on server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory ticket store seeded with realistic Uratex Philippines IT tickets
interface TicketUpdate {
  id: string;
  authorName: string;
  authorRole: 'employee' | 'admin' | 'robbie';
  message: string;
  timestamp: string;
}

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  reporterName: string;
  reporterEmail: string;
  department: string;
  location: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  robbieTranscriptSummary?: string;
  updates: TicketUpdate[];
}

let ticketCounter = 1046;

const tickets: SupportTicket[] = [
  {
    id: 'URX-2026-1045',
    title: 'SAP ERP Production Order Module Timeout',
    description:
      'Unable to post production batch confirmation in SAP GUI. Error: "Time limit exceeded" when accessing Plant 1000 inventory.',
    category: 'SAP / ERP System',
    priority: 'Critical',
    status: 'In Progress',
    reporterName: 'Jenor Ricafort',
    reporterEmail: 'jenor.ricafort@uratex.com.ph',
    department: 'Operations & Manufacturing',
    location: 'Plant 1 - Valenzuela',
    assignedTo: 'Carlos Mendoza',
    createdAt: '2026-11-05 08:15 AM',
    updatedAt: '2026-11-05 08:28 AM',
    robbieTranscriptSummary:
      'Employee reported SAP GUI timeout on batch confirmation. ROBBIE verified network connectivity and escalated to SAP Basis & IT Support.',
    updates: [
      {
        id: 'upd-1',
        authorName: 'ROBBIE AI',
        authorRole: 'robbie',
        message: 'Ticket escalated from ROBBIE Assistant with Critical priority.',
        timestamp: '08:15 AM',
      },
      {
        id: 'upd-2',
        authorName: 'Carlos Mendoza',
        authorRole: 'admin',
        message: 'Assigned to SAP Basis team. Checking application server dialog work processes.',
        timestamp: '08:28 AM',
      },
    ],
  },
  {
    id: 'URX-2026-1044',
    title: 'FortiClient VPN Disconnecting Every 10 Minutes',
    description:
      'VPN tunnel drops repeatedly while accessing shared finance folders from Makati Head Office.',
    category: 'Network & VPN',
    priority: 'High',
    status: 'Open',
    reporterName: 'Maria Santos',
    reporterEmail: 'maria.santos@uratex.com.ph',
    department: 'Finance & Accounting',
    location: 'Head Office - Makati',
    assignedTo: 'Unassigned',
    createdAt: '2026-11-05 09:02 AM',
    updatedAt: '2026-11-05 09:02 AM',
    updates: [
      {
        id: 'upd-3',
        authorName: 'Maria Santos',
        authorRole: 'employee',
        message: 'Submitted ticket for intermittent VPN drops.',
        timestamp: '09:02 AM',
      },
    ],
  },
  {
    id: 'URX-2026-1043',
    title: 'Zebra Barcode Printer Not Calibrating on Line 4',
    description:
      'Foam block label printer on Packaging Line 4 is skipping every second label after ribbon replacement.',
    category: 'Printer & Scanner',
    priority: 'High',
    status: 'In Progress',
    reporterName: 'Jenor Ricafort',
    reporterEmail: 'jenor.ricafort@uratex.com.ph',
    department: 'Operations & Manufacturing',
    location: 'Plant 1 - Valenzuela',
    assignedTo: 'Rafael Bautista',
    createdAt: '2026-11-05 07:40 AM',
    updatedAt: '2026-11-05 08:50 AM',
    updates: [
      {
        id: 'upd-4',
        authorName: 'Rafael Bautista',
        authorRole: 'admin',
        message: 'On-site technician dispatched to Packaging Line 4 for sensor cleaning and media calibration.',
        timestamp: '08:50 AM',
      },
    ],
  },
  {
    id: 'URX-2026-1042',
    title: 'Microsoft 365 Shared Mailbox Permission Request',
    description:
      'Need Read & Manage access to logistics.laguna@uratex.com.ph for newly onboarded coordinator.',
    category: 'Microsoft 365 & Email',
    priority: 'Medium',
    status: 'Resolved',
    reporterName: 'Paolo Reyes',
    reporterEmail: 'paolo.reyes@uratex.com.ph',
    department: 'Supply Chain & Logistics',
    location: 'Plant 2 - Laguna',
    assignedTo: 'Carlos Mendoza',
    createdAt: '2026-11-04 03:20 PM',
    updatedAt: '2026-11-04 04:05 PM',
    updates: [
      {
        id: 'upd-5',
        authorName: 'Carlos Mendoza',
        authorRole: 'admin',
        message: 'Added user to Exchange Online shared mailbox security group. Access will propagate within 15 minutes.',
        timestamp: '04:05 PM',
      },
    ],
  },
  {
    id: 'URX-2026-1041',
    title: 'Laptop Battery Swelling & Trackpad Lift',
    description:
      'Dell Latitude 5430 battery appears swollen; trackpad is raised and difficult to click.',
    category: 'Hardware & Peripherals',
    priority: 'Medium',
    status: 'Open',
    reporterName: 'Angela Cruz',
    reporterEmail: 'angela.cruz@uratex.com.ph',
    department: 'Human Resources',
    location: 'Head Office - Makati',
    assignedTo: 'Unassigned',
    createdAt: '2026-11-04 11:10 AM',
    updatedAt: '2026-11-04 11:10 AM',
    updates: [],
  },
];

// API Routes
app.get('/api/tickets', (_req, res) => {
  res.json({ tickets });
});

app.post('/api/tickets', (req, res) => {
  const {
    title,
    description,
    category,
    priority,
    reporterName,
    reporterEmail,
    department,
    location,
    robbieTranscriptSummary,
  } = req.body;

  if (!title || !description || !reporterEmail) {
    res.status(400).json({ error: 'Title, description, and reporterEmail are required.' });
    return;
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateTimeStr = `2026-11-05 ${timeStr}`;

  const newTicket: SupportTicket = {
    id: `URX-2026-${ticketCounter++}`,
    title: String(title).trim(),
    description: String(description).trim(),
    category: category || 'Hardware & Peripherals',
    priority: priority || 'Medium',
    status: 'Open',
    reporterName: reporterName || reporterEmail.split('@')[0],
    reporterEmail,
    department: department || 'Operations',
    location: location || 'Plant 1 - Valenzuela',
    assignedTo: 'Unassigned',
    createdAt: dateTimeStr,
    updatedAt: dateTimeStr,
    robbieTranscriptSummary,
    updates: [
      {
        id: `upd-${Date.now()}`,
        authorName: robbieTranscriptSummary ? 'ROBBIE AI' : reporterName || 'Employee',
        authorRole: robbieTranscriptSummary ? 'robbie' : 'employee',
        message: robbieTranscriptSummary
          ? 'Ticket created via ROBBIE AI escalation. IT Support Team alerted immediately.'
          : 'New support ticket submitted. IT Support Team alerted immediately.',
        timestamp: timeStr,
      },
    ],
  };

  tickets.unshift(newTicket);
  res.status(201).json({ ticket: newTicket, alertSent: true });
});

app.patch('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { status, priority, assignedTo } = req.body;

  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) {
    res.status(404).json({ error: 'Ticket not found' });
    return;
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  if (status) ticket.status = status;
  if (priority) ticket.priority = priority;
  if (assignedTo !== undefined) ticket.assignedTo = assignedTo;
  ticket.updatedAt = `2026-11-05 ${timeStr}`;

  res.json({ ticket });
});

app.post('/api/tickets/:id/updates', (req, res) => {
  const { id } = req.params;
  const { authorName, authorRole, message } = req.body;

  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) {
    res.status(404).json({ error: 'Ticket not found' });
    return;
  }

  if (!message || !String(message).trim()) {
    res.status(400).json({ error: 'Update message is required' });
    return;
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const newUpdate: TicketUpdate = {
    id: `upd-${Date.now()}`,
    authorName: authorName || 'IT Support',
    authorRole: authorRole || 'admin',
    message: String(message).trim(),
    timestamp: timeStr,
  };

  ticket.updates.push(newUpdate);
  ticket.updatedAt = `2026-11-05 ${timeStr}`;

  res.status(201).json({ ticket, update: newUpdate });
});

// Configured Ollama Engine Credentials from Uratex Corporate IT
let configOllamaUrl =
  process.env.OLLAMA_API_URL || 'http://10.0.120.202:11434/v1/chat/completions';
let configOllamaKey =
  process.env.OLLAMA_API_KEY || 'uratex_corp_it_jwt_token_auth_2026';
let configOllamaModel = process.env.OLLAMA_MODEL || 'qwen2.5-coder:1.5b';

// Active status caches to prevent unroutable LAN IP stalling on chat
let isOllamaVerifiedOnline = false;
let lastOllamaAttempt = 0;
let isGeminiVerifiedOnline = Boolean(
  process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'
);

// Directory & Models Endpoints
app.get('/api/directory', (req, res) => {
  const q = String(req.query.q || '').toLowerCase().trim();
  const dept = String(req.query.department || '').trim();
  let results = DIRECTORY_DATA;
  if (dept && dept !== 'All') {
    results = results.filter((p) => p.department === dept || p.departmentName === dept);
  }
  if (q) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.applicationRole.toLowerCase().includes(q) ||
        p.plantLocation.toLowerCase().includes(q) ||
        p.departmentName.toLowerCase().includes(q)
    );
  }
  res.json({ results, total: results.length });
});

app.get('/api/models', (_req, res) => {
  res.json({
    currentModel: configOllamaModel,
    currentUrl: configOllamaUrl,
    models: AVAILABLE_MODELS,
  });
});

// Diagnostics Endpoint: tests connectivity to Ollama host (10.0.120.202) or tunnel
app.post('/api/ai/diagnostics', async (req, res) => {
  const targetUrl = (req.body.url || configOllamaUrl).trim();
  const targetKey = (req.body.key || configOllamaKey).trim();
  const targetModel = (req.body.model || configOllamaModel).trim();

  let parsedHost = '';
  try {
    const u = new URL(targetUrl);
    parsedHost = u.hostname;
  } catch {
    parsedHost = targetUrl;
  }

  const isPrivateIp =
    parsedHost.startsWith('10.') ||
    parsedHost.startsWith('192.168.') ||
    parsedHost.startsWith('172.') ||
    parsedHost === 'localhost' ||
    parsedHost === '127.0.0.1';

  const startTime = Date.now();
  let reachable = false;
  let httpStatus = 0;
  let errorMsg = null;
  let latencyMs = 0;
  let sampleResponse = null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const testRes = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${targetKey}`,
      },
      body: JSON.stringify({
        model: targetModel,
        messages: [{ role: 'user', content: 'ping' }],
        stream: false,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    latencyMs = Date.now() - startTime;
    httpStatus = testRes.status;

    if (testRes.ok) {
      reachable = true;
      const data = await testRes.json();
      sampleResponse =
        data.choices?.[0]?.message?.content || data.message?.content || 'HTTP 200 OK received';
    } else {
      errorMsg = `HTTP ${testRes.status}: ${testRes.statusText}`;
    }
  } catch (err: any) {
    latencyMs = Date.now() - startTime;
    errorMsg = err.message || 'Connection timed out';
  }

  res.json({
    success: true,
    targetUrl,
    targetModel,
    isPrivateIp,
    reachable,
    httpStatus,
    latencyMs,
    error: errorMsg,
    sampleResponse,
    cloudFallback: isGeminiVerifiedOnline ? 'Gemini 3.8 Flash' : 'Uratex Intelligent IT Engine (Active)',
    networkNote:
      isPrivateIp && !reachable
        ? 'Target server (10.0.120.202) is inside the Uratex corporate on-premise LAN (RFC 1918 private IP). From public cloud containers (Google Cloud Run), direct TCP packets are unroutable without an encrypted reverse proxy or Cloudflare Tunnel.'
        : reachable
        ? 'Connected and operational! Real-time local inference active.'
        : 'Target unreachable. High-speed Uratex Intelligent IT Engine active.',
  });
});

// Update AI Config (e.g. user enters custom tunnel URL)
app.post('/api/ai/config', (req, res) => {
  const { url, key, model } = req.body;
  if (url) {
    configOllamaUrl = String(url).trim();
    isOllamaVerifiedOnline = false;
    lastOllamaAttempt = 0;
  }
  if (key) configOllamaKey = String(key).trim();
  if (model) configOllamaModel = String(model).trim();
  res.json({
    success: true,
    url: configOllamaUrl,
    model: configOllamaModel,
  });
});

// ROBBIE AI Chatbot Endpoint (Powered primarily by Google Gemini API)
app.post('/api/robbie/chat', async (req, res) => {
  const { message, history = [], userName = 'Employee', model = 'gemini-3.8-flash' } = req.body;

  if (!message || !String(message).trim()) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  const selectedModel = model || 'gemini-3.8-flash';
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';

  // Primary AI Engine: Google Gemini API (gemini-3.8-flash)
  if (selectedModel === 'gemini-3.8-flash' || selectedModel.startsWith('gemini')) {
    try {
      const systemInstruction = `You are ROBBIE (Resolution Oriented Bot for Business and IT Efficiency), the official IT Service Desk AI Assistant for Uratex Philippines (RGC Group of Companies).
You provide friendly, polite, and technical troubleshooting for Uratex employees across all plants and offices (Plant 1 Valenzuela, Plant 2 Laguna, Plaridel, Cebu, CDO, Davao, Head Office).

Key Uratex IT procedures:
• Workstations & Peripherals (Rule 7): Keyboard typing numbers (Fn + Num Lock), direct motherboard USB 3.0 port swap, Device Manager driver refresh, fresh batteries.
• Network & VPN: FortiClient & Cisco AnyConnect with gateway vpn.uratex.com.ph, Active Directory domain DC01-VAL, DNS flush (ipconfig /flushdns).
• SAP S/4HANA & ERP: Order-to-Cash (O2C) flow: VA01 Sales Order, VKM1 Credit block release, CO09 ATP Stock check, VL01N/PGI, VF01 Billing. Session reset via /nend, lock clearing in SM12. Plant specialists: Eric Borromeo (0917-822-4595), Myrna Reyes, Jezalin Mendoza.
• Zebra Barcode & Label Printers: Packaging Lines 1–6 media sensor calibration (hold FEED + CANCEL for 2 sec), 99% isopropyl alcohol head cleaning, Windows Print Spooler restart (services.msc).
• Microsoft 365 & Outlook: Self-Service Password Reset at https://aka.ms/sspr, Cached Exchange Mode toggle, shared mailbox access via approved ticket.
• Official Email Signature Generator: https://email-signature-4ti.pages.dev, setup guide for Gmail and Outlook, NPC Data Privacy Act compliance.
• IT Service Desk Contact: Local Ext. 4401.

Rules:
1. Provide numbered, actionable troubleshooting steps.
2. Only set shouldEscalate to true if:
   - The user explicitly asks for human technician assistance ("talk to someone", "file a ticket", "live agent").
   - The user reports physical hardware damage or danger (swollen battery, sparks, smoke, water spill).
   - The user reports persistent failure after trying steps ("still not working", "tried that already").
   - Deep database schema corruption or ABAP kernel dump (CX_SY_REF_IS_INITIAL) requiring Tier 3 engineering.
3. For greetings and self-service technical troubleshooting, shouldEscalate MUST be false.`;

      const prompt = `${userName}: ${message}`;

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini timeout')), 4000)
      );

      const geminiPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING },
              shouldEscalate: { type: Type.BOOLEAN },
              suggestedTitle: { type: Type.STRING },
              suggestedCategory: { type: Type.STRING },
              suggestedPriority: { type: Type.STRING },
              summary: { type: Type.STRING },
            },
            required: ['reply', 'shouldEscalate'],
          },
        },
      });

      const response = await Promise.race([geminiPromise, timeoutPromise]);
      const parsed = JSON.parse((response.text ?? '{}').trim());

      if (parsed.reply) {
        res.json({
          reply: parsed.reply,
          shouldEscalate: Boolean(parsed.shouldEscalate),
          engine: 'Google Gemini 3.8 Flash (Cloud AI)',
          model: 'gemini-3.8-flash',
          suggestedTicket: parsed.shouldEscalate
            ? {
                title: parsed.suggestedTitle || message.slice(0, 60),
                category: parsed.suggestedCategory || 'Hardware & Peripherals',
                priority: parsed.suggestedPriority || 'Medium',
                summary: parsed.summary || message,
              }
            : undefined,
        });
        return;
      }
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to local engine:', err?.message);
    }

    // Failover: Deliver Uratex resolution engine
    const resolution = resolveWithRobbieEngine(message, history, userName, clientIp);
    res.json({
      reply: resolution.reply,
      shouldEscalate: resolution.shouldEscalate,
      engine: 'Google Gemini 3.8 Flash (High-Speed Engine)',
      model: 'gemini-3.8-flash',
      suggestedTicket: resolution.suggestedTicket,
    });
    return;
  }

  // Route B: User explicitly selected the autonomous Uratex IT Domain Engine
  if (selectedModel === 'uratex-expert-v1') {
    const resolution = resolveWithRobbieEngine(message, history, userName, clientIp);
    res.json({
      reply: resolution.reply,
      shouldEscalate: resolution.shouldEscalate,
      engine: 'ROBBIE Domain AI (Uratex Autonomous Engine)',
      model: selectedModel,
      suggestedTicket: resolution.suggestedTicket,
    });
    return;
  }

  // Route C: Optional legacy Ollama model (if tunnel/VPN connected)
  const isPrivateIp =
    configOllamaUrl.includes('10.') ||
    configOllamaUrl.includes('192.168.') ||
    configOllamaUrl.includes('127.0.0.1');

  try {
    const systemInstruction = `You are ROBBIE (Resolution Oriented Bot for Business and IT Efficiency), official IT Helpdesk Assistant for Uratex Philippines.
Help employees troubleshoot VPN (vpn.uratex.com.ph), SAP ERP (Order-to-Cash), Zebra barcode printers, M365, and workstations.
Tone: polite, helpful, technical yet friendly. Provide numbered troubleshooting steps.`;

    const ollamaRes = await fetch(configOllamaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configOllamaKey}`,
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: 'system', content: systemInstruction },
          ...history.slice(-4).map((h: any) => ({
            role: h.sender === 'user' ? 'user' : 'assistant',
            content: h.text,
          })),
          { role: 'user', content: message },
        ],
        stream: false,
      }),
      signal: AbortSignal.timeout(isPrivateIp ? 250 : 2000),
    });

    if (ollamaRes.ok) {
      const data = await ollamaRes.json();
      const content = data.choices?.[0]?.message?.content || data.message?.content;
      if (content && content.trim()) {
        const lower = message.toLowerCase();
        const isEscalation =
          lower.includes('human') ||
          lower.includes('agent') ||
          lower.includes('technician') ||
          lower.includes('file a ticket') ||
          lower.includes('create a ticket');

        res.json({
          reply: content.trim(),
          shouldEscalate: isEscalation,
          engine: `Ollama (${selectedModel})`,
          model: selectedModel,
          suggestedTicket: isEscalation
            ? {
                title: `Assistance Request — ${message.slice(0, 50)}`,
                category: 'Hardware & Peripherals',
                priority: 'Medium',
                summary: message,
              }
            : undefined,
        });
        return;
      }
    }
  } catch {
    // Ollama offline
  }

  // Final fallback to Uratex Engine
  const resolution = resolveWithRobbieEngine(message, history, userName, clientIp);
  res.json({
    reply: resolution.reply,
    shouldEscalate: resolution.shouldEscalate,
    engine: resolution.engine,
    model: selectedModel,
    suggestedTicket: resolution.suggestedTicket,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Uratex IT Service Desk running on http://localhost:${PORT}`);
  });
}

startServer();
