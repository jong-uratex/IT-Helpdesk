import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Load IT Directory & System Prompts from attached files
const directoryPath = path.join(__dirname, 'public', 'assets', 'aistudio', 'directory_4a5f4575.json');
const promptCsvPath = path.join(__dirname, 'public', 'assets', 'aistudio', 'prompt_64e1d06d.csv');

let itDirectory = [];
try {
  if (fs.existsSync(directoryPath)) {
    itDirectory = JSON.parse(fs.readFileSync(directoryPath, 'utf8'));
  }
} catch (e) {
  console.error('Error loading directory_4a5f4575.json:', e);
}

let promptRules = [];
let fullSystemInstruction = '';

function parseCsvLine(line) {
  const parts = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      parts.push(cur.trim());
      cur = '';
    } else {
      cur += c;
    }
  }
  parts.push(cur.trim());
  return parts;
}

function buildSystemInstruction() {
  try {
    const filePath = fs.existsSync(promptCsvPath) ? promptCsvPath : path.join(__dirname, 'prompt_64e1d06d.csv');
    if (fs.existsSync(filePath)) {
      let csvContent = fs.readFileSync(filePath, 'utf8');
      if (csvContent.charCodeAt(0) === 0xfeff) {
        csvContent = csvContent.slice(1);
      }
      const lines = csvContent.split('\n');
      const rules = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = parseCsvLine(line);
        if (parts.length >= 6) {
          rules.push({
            id: parts[0],
            category: parts[1],
            name: parts[2],
            role: parts[3],
            content: parts[4],
            isActive: parts[5] === 'TRUE',
            description: parts[6] || '',
          });
        }
      }
      promptRules = rules;

      // Construct comprehensive system prompt
      const rulesText = rules.map((r) => `[${r.name}]\n${r.content}`).join('\n\n');

      // Add directory summary so ROBBIE knows who to route queries to
      const directorySummary = itDirectory.map((d) => 
        `- ${d.name} (${d.applicationRole}): Dept: ${d.departmentName || d.department}, Plant: ${d.plantLocation}, Email: ${d.email}, Mobile: ${d.mobile || 'N/A'}`
      ).join('\n');

      fullSystemInstruction = `${rulesText}

[URATEX IT PERSONNEL DIRECTORY (48 STAFF MEMBERS)]:
${directorySummary}

CRITICAL ESCALATION RULE:
If a user issue cannot be resolved via self-service troubleshooting, requires physical technician intervention, administrator privileges, or if the user requests a human/ticket, explain why and append "[ESCALATE_TO_TICKET]". Suggest Recommended Category and Priority.`;
    }
  } catch (err) {
    console.error('Error parsing prompt_64e1d06d.csv:', err);
  }

  if (!fullSystemInstruction) {
    fullSystemInstruction = `You are ROBBIE (Resolution Oriented Bot for Business and IT Efficiency), the IT Service Desk Assistant for Uratex Philippines.
Help employees with SAP S/4HANA (Error 10060, O2C VA01/VA02), Zebra printers, FortiClient VPN, Office 365, Active Directory, and Email Signatures (https://email-signature-4ti.pages.dev).
If human help is needed, append [ESCALATE_TO_TICKET].`;
  }
}

buildSystemInstruction();

let tickets = [
  {
    id: 't-101',
    ticketNumber: 'URX-2026-0839',
    subject: 'SAP S/4HANA Logon Failure - Error 10060 (WSAETIMEDOUT)',
    category: 'SAP / ERP',
    priority: 'Urgent',
    status: 'In Progress',
    creatorName: 'Maria Santos',
    creatorEmail: 'msantos@uratex.com.ph',
    department: 'Supply Chain & Logistics',
    plantLocation: 'Muntinlupa Head Office',
    contactNumber: 'Local 2041',
    description: 'Cannot connect to SAP PRD instance since 8:30 AM. Need to release shipment manifests for distributor delivery trucks.',
    robbieNotes: 'ROBBIE verified SAP port 3200 unreachable from subnet. Escalated to Myrna Reyes (Sap Support Luzon).',
    assignedTo: 'Myrna Reyes (Sap Support)',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    slaTargetHours: 2,
  },
  {
    id: 't-102',
    ticketNumber: 'URX-2026-0838',
    subject: 'Zebra ZT411 Barcode Label Printer - Head Jams in Foam Cutting Line',
    category: 'Hardware & Printers',
    priority: 'High',
    status: 'Open',
    creatorName: 'Arnel Mendoza',
    creatorEmail: 'amendoza@uratex.com.ph',
    department: 'Foam Production Plant 2',
    plantLocation: 'Valenzuela Plant',
    contactNumber: 'Local 1108',
    description: 'Production line barcode printer displays "Ribbon Out / Paper Jam" even after reloading.',
    robbieNotes: 'ROBBIE provided thermal sensor guide. Physical sensor failure confirmed. Assigned to Tech Luzon.',
    assignedTo: 'Joel Genaloc (Tech Luzon Specialist)',
    createdAt: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    slaTargetHours: 4,
  },
  {
    id: 't-103',
    ticketNumber: 'URX-2026-0835',
    subject: 'FortiClient VPN IPsec Tunnel drops during remote plant access',
    category: 'Network & VPN',
    priority: 'Medium',
    status: 'Waiting for User',
    creatorName: 'Danielle Tan',
    creatorEmail: 'dtan@uratex.com.ph',
    department: 'Finance & Accounting',
    plantLocation: 'Canlubang Plant',
    contactNumber: 'Local 3012',
    description: 'VPN disconnects every 15 minutes when accessing centralized billing server.',
    robbieNotes: 'ROBBIE suggested MTU packet adjustment.',
    assignedTo: 'Daniel Fabon (Tech Luzon Specialist)',
    createdAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    slaTargetHours: 8,
  },
];

// GET IT Directory endpoint
app.get('/api/directory', (req, res) => {
  res.json({
    total: itDirectory.length,
    directory: itDirectory,
  });
});

// GET System Prompt Rules endpoint
app.get('/api/rules', (req, res) => {
  res.json({
    total: promptRules.length,
    rules: promptRules,
  });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const edenApiKey = process.env.EDENAI_API_KEY || 'sk-eden-live-CVZ09ShNkXn4290VA67QwVbBLX4T-VLAslQ4a07s4rkf57d742f';
    const edenModel = process.env.EDENAI_MODEL || 'google/gemma-4-26b-a4b-it';

    // Priority 1: Activate ROBBIE with Eden AI (google/gemma-4-26b-a4b-it)
    if (edenApiKey) {
      try {
        const edenRes = await fetch('https://api.edenai.run/v3/chat/completions', {
          method: 'POST',
          signal: AbortSignal.timeout(20000),
          headers: {
            'Authorization': `Bearer ${edenApiKey}`,
            'Content-Type': 'application/json',
            'x-edenai-metadata': 'enabled',
          },
          body: JSON.stringify({
            model: edenModel,
            messages: [
              {
                role: 'system',
                content: fullSystemInstruction,
              },
              {
                role: 'user',
                content: message,
              },
            ],
          }),
        });

        if (edenRes.ok) {
          const edenData = await edenRes.json();
          const replyText = edenData.choices?.[0]?.message?.content;
          if (replyText) {
            const escalated = replyText.includes('[ESCALATE_TO_TICKET]') ||
              message.toLowerCase().includes('human') ||
              message.toLowerCase().includes('ticket') ||
              message.toLowerCase().includes('escalat');

            return res.json({
              reply: replyText.replace(/\[ESCALATE_TO_TICKET\]/g, '').trim(),
              escalated,
              provider: 'Eden AI (google/gemma-4-26b-a4b-it)',
            });
          }
        } else {
          console.error('Eden AI HTTP error:', edenRes.status, await edenRes.text());
        }
      } catch (edenErr) {
        console.error('Eden AI fetch exception:', edenErr);
      }
    }

    const currentApiKey = process.env.GEMINI_API_KEY || '';
    if (currentApiKey && currentApiKey !== 'MY_GEMINI_API_KEY') {
      const ai = new GoogleGenAI({
        apiKey: currentApiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: { systemInstruction: fullSystemInstruction },
      });

      const replyText = response.text || 'Unable to process query. Please file an IT ticket.';
      const escalated = replyText.includes('[ESCALATE_TO_TICKET]') ||
        message.toLowerCase().includes('human') ||
        message.toLowerCase().includes('ticket') ||
        message.toLowerCase().includes('escalat');

      return res.json({ reply: replyText, escalated, provider: 'Gemini' });
    }

    // Intelligent fallback using prompt rules and directory
    let fallbackText = `Kumusta! I am ROBBIE, your Uratex Philippines IT Service Desk assistant.\n\n`;
    if (message.toLowerCase().includes('signature') || message.toLowerCase().includes('email sign')) {
      fallbackText += `**Official Uratex Email Signature Generator:**\n1. Visit the portal at **https://email-signature-4ti.pages.dev**.\n2. Fill in your Name, Job Title, Department, and @uratex.com.ph email.\n3. Select Company Entity (e.g. MULTIFLEX RNC PHILS., INC.) and Office Address.\n4. Click **'COPY SIGNATURE'** and paste into Gmail / Outlook settings.\n*Note: Do not delete the official privacy notice.*`;
    } else if (message.toLowerCase().includes('sap') || message.toLowerCase().includes('o2c') || message.toLowerCase().includes('va01')) {
      fallbackText += `**SAP & URIE O2C Guidelines:**\n- Sales Orders: Transaction **VA01 / VA02**\n- Credit Limits: **BP / FD32**\n- ATP Stock Checks: **CO09**\n- Outbound Deliveries: **VL01N**\n- Billing Documents: **VF01 / VF02**\nFor unexplained transaction authorization errors, contact **Myrna Reyes** or **Jezalin Mendoza** (Sap Support Luzon).\n\n[ESCALATE_TO_TICKET]`;
    } else {
      fallbackText += `Here is your safe troubleshooting workflow:\n1. Verify connection to 'Uratex-Corp' network or active FortiClient VPN.\n2. Restart affected business application.\n3. If physical hardware, permissions, or administrative access is needed, please file an IT ticket.\n\n[ESCALATE_TO_TICKET]\nRecommended Priority: Medium`;
    }

    res.json({
      reply: fallbackText,
      escalated: fallbackText.includes('[ESCALATE_TO_TICKET]') || message.toLowerCase().includes('ticket') || message.toLowerCase().includes('human'),
      provider: 'Local Rules Engine',
    });
  } catch (error) {
    res.json({
      reply: `Kumusta! I am ROBBIE. If your issue requires physical intervention or administrative access, please file an IT ticket.\n\n[ESCALATE_TO_TICKET]\nRecommended Priority: Medium`,
      escalated: true,
    });
  }
});

app.get('/api/tickets', (req, res) => res.json({ tickets }));

app.post('/api/tickets', (req, res) => {
  const { subject, category, priority, department, plantLocation, contactNumber, description, creatorName, creatorEmail, robbieNotes } = req.body;
  if (!subject || !description || !creatorEmail) {
    return res.status(400).json({ error: 'Subject, description, and email are required.' });
  }
  if (!creatorEmail.toLowerCase().endsWith('@uratex.com.ph')) {
    return res.status(400).json({ error: 'Only @uratex.com.ph email accounts are authorized.' });
  }

  const ticketNumber = `URX-2026-${String(tickets.length + 840).padStart(4, '0')}`;
  let slaTargetHours = priority === 'Urgent' ? 2 : priority === 'High' ? 4 : priority === 'Low' ? 24 : 8;

  // Auto-assign appropriate technician based on category and plant
  let autoAssign = 'Unassigned';
  if (category === 'SAP / ERP') {
    autoAssign = 'Myrna Reyes (Sap Support)';
  } else if (plantLocation && plantLocation.includes('Cebu')) {
    autoAssign = 'Glecer Jay Pejana (Tech VisMin)';
  } else if (plantLocation && plantLocation.includes('Plaridel')) {
    autoAssign = 'Aaron Bernardo (Tech Luzon)';
  } else if (category === 'Hardware & Printers' || category === 'Network & VPN') {
    autoAssign = 'Joel Genaloc (Tech Luzon Specialist)';
  }

  const newTicket = {
    id: `t-${Date.now()}`,
    ticketNumber,
    subject,
    category: category || 'Other',
    priority: priority || 'Medium',
    status: 'Open',
    creatorName: creatorName || 'Uratex Employee',
    creatorEmail: creatorEmail.toLowerCase(),
    department: department || 'General',
    plantLocation: plantLocation || 'Muntinlupa Head Office',
    contactNumber: contactNumber || 'N/A',
    description,
    robbieNotes: robbieNotes || '',
    assignedTo: autoAssign,
    createdAt: new Date().toISOString(),
    slaTargetHours,
  };

  tickets.unshift(newTicket);
  res.status(201).json({ message: 'Ticket created', ticket: newTicket });
});

app.patch('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { status, priority, assignedTo, resolutionNotes } = req.body;
  const idx = tickets.findIndex((t) => t.id === id || t.ticketNumber === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });

  tickets[idx] = {
    ...tickets[idx],
    status: status || tickets[idx].status,
    priority: priority || tickets[idx].priority,
    assignedTo: assignedTo !== undefined ? assignedTo : tickets[idx].assignedTo,
    resolutionNotes: resolutionNotes !== undefined ? resolutionNotes : tickets[idx].resolutionNotes,
    updatedAt: new Date().toISOString(),
  };
  res.json({ ticket: tickets[idx] });
});

app.get('/api/metrics', (req, res) => {
  const total = tickets.length;
  const openCount = tickets.filter((t) => t.status === 'Open').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved' || t.status === 'Closed').length;
  const urgentCount = tickets.filter((t) => t.priority === 'Urgent').length;
  const highCount = tickets.filter((t) => t.priority === 'High').length;

  res.json({
    total,
    openCount,
    inProgressCount,
    resolvedCount,
    urgentCount,
    highCount,
    slaComplianceRate: '96.8%',
    avgResolutionHours: 2.4,
    csatScore: '4.8 / 5.0',
    directoryCount: itDirectory.length,
    rulesCount: promptRules.length,
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Uratex IT Service Desk running at http://localhost:${PORT}`);
});
