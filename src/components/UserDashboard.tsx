import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  FilePlus2,
  ClipboardList,
  BookOpen,
  Send,
  Users,
  LogOut,
  Shield,
  ArrowRight,
  BellRing,
  Phone,
  Mail,
  MapPin,
  Search,
} from 'lucide-react';
import {
  UratexUser,
  SupportTicket,
  RobbieChatMessage,
  TicketCategory,
  TicketPriority,
} from '../types';
import { DIRECTORY_DATA, UratexDirectoryPerson, AVAILABLE_MODELS } from '../data/uratexDirectory';
import { resolveWithRobbieEngine } from '../data/robbieEngine';

interface UserDashboardProps {
  user: UratexUser;
  tickets: SupportTicket[];
  onCreateTicket: (ticketData: {
    title: string;
    description: string;
    category: TicketCategory;
    priority: TicketPriority;
    robbieTranscriptSummary?: string;
  }) => Promise<SupportTicket>;
  onSwitchToAdmin: () => void;
  onSignOut: () => void;
}

type UserTab = 'robbie' | 'submit' | 'tickets' | 'directory' | 'kb';

const CATEGORIES: TicketCategory[] = [
  'Network & VPN',
  'SAP / ERP System',
  'Hardware & Peripherals',
  'Microsoft 365 & Email',
  'Account & Access',
  'Printer & Scanner',
];

const PRIORITIES: TicketPriority[] = ['Critical', 'High', 'Medium', 'Low'];

const QUICK_PROMPTS = [
  'Live Tech Support (Ext. 4401)',
  'How do I use the Email Signature Generator?',
  "What's my IP Address?",
  'Keyboard / Hardware Help (Rule 7)',
  'Who is the contact person for SAP Support?',
  'What is the SAP Order-to-Cash (O2C) process?',
  'How to calibrate Zebra barcode printer',
  'I need human assistance from IT Support',
];

export const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  tickets,
  onCreateTicket,
  onSwitchToAdmin,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<UserTab>('robbie');
  const [selectedModel, setSelectedModel] = useState('gemini-3.8-flash');
  const [messages, setMessages] = useState<RobbieChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'robbie',
      text: `Hello ${user.name.split(' ')[0]}! 👋 I am **ROBBIE** (*Resolution Oriented Bot for Business and IT Efficiency*), your official Uratex Philippines IT Service Desk AI Assistant, powered by **Google Gemini AI**.

I am ready to help resolve technical issues across Uratex plants and offices (VPN, SAP O2C, Zebra barcode printers, Microsoft 365, Rule 7 workstation hardware, or staff lookup).

What technical issue can I help troubleshoot today?`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Ticket Form State
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketCategory, setTicketCategory] = useState<TicketCategory>('Network & VPN');
  const [ticketPriority, setTicketPriority] = useState<TicketPriority>('Medium');
  const [ticketDescription, setTicketDescription] = useState('');
  const [robbieSummary, setRobbieSummary] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertBanner, setAlertBanner] = useState<string | null>(null);

  // Directory Search State
  const [dirSearch, setDirSearch] = useState('');
  const [dirDeptFilter, setDirDeptFilter] = useState('All');

  // Selected Ticket for Real-Time Status Detail
  const myTickets = tickets.filter(
    (t) => t.reporterEmail.toLowerCase() === user.email.toLowerCase()
  );
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    myTickets[0]?.id || null
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!selectedTicketId && myTickets.length > 0) {
      setSelectedTicketId(myTickets[0].id);
    }
  }, [myTickets, selectedTicketId]);

  const sendMessageToRobbie = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isTyping) return;

    const nowStr = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: RobbieChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: nowStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/robbie/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages,
          userName: user.name,
          model: selectedModel,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      const robbieMsg: RobbieChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'robbie',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        shouldEscalate: Boolean(data.shouldEscalate),
        suggestedTicket: data.suggestedTicket,
      };

      setMessages((prev) => [...prev, robbieMsg]);
    } catch {
      // Resilient local engine fallback: guarantees user problem is resolved immediately
      const resolution = resolveWithRobbieEngine(trimmed, messages, user.name);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'robbie',
          text: resolution.reply,
          timestamp: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          shouldEscalate: resolution.shouldEscalate,
          suggestedTicket: resolution.suggestedTicket,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEscalateToForm = (suggested?: RobbieChatMessage['suggestedTicket']) => {
    if (suggested) {
      setTicketTitle(suggested.title);
      setTicketCategory(
        CATEGORIES.includes(suggested.category) ? suggested.category : 'Hardware & Peripherals'
      );
      setTicketPriority(
        PRIORITIES.includes(suggested.priority) ? suggested.priority : 'Medium'
      );
      setTicketDescription(suggested.summary);
      setRobbieSummary(suggested.summary);
    }
    setActiveTab('submit');
  };

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle.trim() || !ticketDescription.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const created = await onCreateTicket({
        title: ticketTitle.trim(),
        description: ticketDescription.trim(),
        category: ticketCategory,
        priority: ticketPriority,
        robbieTranscriptSummary: robbieSummary,
      });

      setAlertBanner(
        `Ticket ${created.id} submitted! Uratex IT Support Team has been alerted immediately.`
      );
      setTicketTitle('');
      setTicketDescription('');
      setRobbieSummary(undefined);
      setSelectedTicketId(created.id);
      setActiveTab('tickets');

      setTimeout(() => {
        setAlertBanner(null);
      }, 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedTicket = myTickets.find((t) => t.id === selectedTicketId) || myTickets[0];

  const getTabTitle = () => {
    switch (activeTab) {
      case 'robbie':
        return 'ROBBIE AI Assistant';
      case 'submit':
        return 'Submit Support Ticket';
      case 'tickets':
        return 'My Tickets & Real-Time Status';
      case 'directory':
        return 'Uratex IT Staff & Specialists Directory';
      case 'kb':
        return 'IT Knowledge Base & Standard Procedures';
    }
  };

  const filteredDirectory = DIRECTORY_DATA.filter((p) => {
    const q = dirSearch.toLowerCase().trim();
    const matchesDept = dirDeptFilter === 'All' || p.department === dirDeptFilter;
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.applicationRole.toLowerCase().includes(q) ||
      p.plantLocation.toLowerCase().includes(q) ||
      (p.mobile && p.mobile.includes(q));

    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* AdminLTE-Inspired Left Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0">
        {/* Brand */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-display font-bold text-white text-sm shrink-0">
            U
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-sm text-white truncate">
              Uratex IT Desk
            </div>
            <div className="text-xs text-slate-400 truncate">Employee Portal</div>
          </div>
        </div>

        {/* User Profile Block */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 flex items-center justify-center text-xs font-semibold shrink-0">
            {user.avatarInitials}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">{user.name}</div>
            <div className="text-xs text-slate-400 truncate">{user.location}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <button
            type="button"
            onClick={() => setActiveTab('robbie')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'robbie'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4 shrink-0" />
            <span>ROBBIE AI Assistant</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('submit')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'submit'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FilePlus2 className="w-4 h-4 shrink-0" />
            <span>Submit New Ticket</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tickets')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'tickets'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <ClipboardList className="w-4 h-4 shrink-0" />
              <span>My Tickets & Status</span>
            </span>
            <span className="font-mono-tabular text-xs text-slate-300">
              {myTickets.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('directory')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'directory'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <Users className="w-4 h-4 shrink-0" />
              <span>IT Staff Directory</span>
            </span>
            <span className="font-mono-tabular text-xs text-slate-300">
              {DIRECTORY_DATA.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('kb')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'kb'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>IT Knowledge Base</span>
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1.5">
          <button
            type="button"
            onClick={onSwitchToAdmin}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap"
          >
            <Shield className="w-4 h-4 text-blue-400 shrink-0" />
            <span>IT Admin Console</span>
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between gap-8">
          <div className="flex items-center gap-2 text-sm min-w-0">
            <span className="text-slate-400 whitespace-nowrap">Uratex IT Desk</span>
            <span className="text-slate-300">/</span>
            <h1 className="font-display font-semibold text-slate-900 truncate">
              {getTabTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Help Desk Ext: <strong className="text-slate-700 font-mono-tabular">4401</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveTab('submit')}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              + New Support Ticket
            </button>
          </div>
        </header>

        {/* Immediate Support Team Alert Banner */}
        {alertBanner && (
          <div className="mx-6 mt-4 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-4 text-sm text-emerald-900">
            <div className="flex items-center gap-2.5">
              <BellRing className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="font-medium">{alertBanner}</span>
            </div>
            <button
              type="button"
              onClick={() => setAlertBanner(null)}
              className="text-xs text-emerald-700 hover:underline whitespace-nowrap"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Main Viewport */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* TAB 1: ROBBIE AI ASSISTANT */}
          {activeTab === 'robbie' && (
            <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] bg-white border border-slate-200 rounded-xl overflow-hidden">
              {/* ROBBIE Header */}
              <div className="px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display font-bold text-sm text-slate-900 truncate">
                        ROBBIE AI Assistant
                      </h2>
                      <span className="text-[10px] font-mono-tabular bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1.5 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                        {selectedModel === 'gemini-3.8-flash'
                          ? 'Google Gemini 3.8 Flash (Active)'
                          : selectedModel === 'uratex-expert-v1'
                          ? 'ROBBIE Domain AI (Active)'
                          : `Ollama: ${selectedModel}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      Resolution Oriented Bot for Business & IT Efficiency · Powered by Google Gemini AI
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs"
                    title="Select AI Model"
                  >
                    {AVAILABLE_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label} ({m.badge})
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      handleEscalateToForm({
                        title: 'Human Assistance Request',
                        category: 'Hardware & Peripherals',
                        priority: 'Medium',
                        summary: 'Employee requested direct human assistance from IT Support.',
                      })
                    }
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    Request Human Help
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-xl rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-800 border border-slate-200/80'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 font-mono-tabular">
                      {msg.sender === 'user' ? user.name : 'ROBBIE'} · {msg.timestamp}
                    </span>

                    {/* Escalation Action Card */}
                    {msg.sender === 'robbie' && msg.shouldEscalate && (
                      <div className="mt-2.5 max-w-xl w-full p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-amber-900">
                            Human IT Support Recommended
                          </div>
                          <div className="text-xs text-amber-800 mt-0.5 truncate">
                            {msg.suggestedTicket?.title || 'Create a support ticket for IT review'}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleEscalateToForm(msg.suggestedTicket)}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
                        >
                          <span>Create Support Ticket</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start">
                    <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-500">
                      ROBBIE is analyzing your request...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="px-6 py-2.5 border-t border-slate-100 bg-slate-50/50 flex items-center gap-2 overflow-x-auto">
                <span className="text-xs text-slate-400 shrink-0">Quick ask:</span>
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessageToRobbie(prompt)}
                    className="px-3 py-1.5 text-xs bg-white border border-slate-200 hover:border-blue-600 text-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessageToRobbie(chatInput);
                }}
                className="p-4 border-t border-slate-200 bg-white flex items-center gap-3"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Describe your IT issue (e.g., VPN, SAP O2C, Outlook, Zebra printer, or search IT staff)..."
                  className="flex-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SUBMIT NEW TICKET */}
          {activeTab === 'submit' && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl p-6">
              <div className="mb-6">
                <h2 className="font-display text-lg font-bold text-slate-900">
                  File a New IT Support Ticket
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Submitting this form immediately alerts the Uratex IT Support Team.
                </p>
              </div>

              {robbieSummary && (
                <div className="mb-5 p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900">
                  <span className="font-semibold">ROBBIE Escalation Summary attached:</span>{' '}
                  {robbieSummary}
                </div>
              )}

              <form onSubmit={handleTicketSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Issue Title
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    placeholder="e.g., Unable to connect to Plant 1000 SAP Server"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Category
                    </label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value as TicketCategory)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Priority Level
                    </label>
                    <select
                      value={ticketPriority}
                      onChange={(e) => setTicketPriority(e.target.value as TicketPriority)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {PRIORITIES.map((prio) => (
                        <option key={prio} value={prio}>
                          {prio}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    placeholder="Include any error messages, workstation asset tag, or steps already tried..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('robbie')}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                  >
                    Back to ROBBIE
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Ticket & Alert IT'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: MY TICKETS & REAL-TIME STATUS */}
          {activeTab === 'tickets' && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Ticket List */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
                  <h2 className="font-display font-semibold text-sm text-slate-900">
                    Your Submitted Tickets
                  </h2>
                  <span className="font-mono-tabular text-xs text-slate-500">
                    {myTickets.length} total
                  </span>
                </div>

                {myTickets.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-sm text-slate-500 mb-3">
                      You have not submitted any support tickets yet.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('submit')}
                      className="px-4 py-2 bg-blue-700 text-white text-xs font-medium rounded-lg"
                    >
                      Submit First Ticket
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {myTickets.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedTicketId(t.id)}
                        className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                          selectedTicket?.id === t.id ? 'bg-blue-50/60' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1">
                          <span className="font-mono-tabular font-semibold text-slate-700">
                            {t.id}
                          </span>
                          <span
                            className={`font-medium ${
                              t.status === 'Resolved'
                                ? 'text-emerald-700'
                                : t.status === 'In Progress'
                                ? 'text-blue-700'
                                : 'text-amber-700'
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900 truncate">
                          {t.title}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {t.category} · Priority: {t.priority}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Real-Time Status & Timeline */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6">
                {selectedTicket ? (
                  <div>
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
                      <div>
                        <div className="text-xs font-mono-tabular text-slate-500">
                          {selectedTicket.id} · Updated {selectedTicket.updatedAt}
                        </div>
                        <h3 className="font-display text-lg font-bold text-slate-900 mt-1">
                          {selectedTicket.title}
                        </h3>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                          selectedTicket.status === 'Resolved'
                            ? 'bg-emerald-50 text-emerald-700'
                            : selectedTicket.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {selectedTicket.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-4 border-b border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 block">Category</span>
                        <span className="font-medium text-slate-800">
                          {selectedTicket.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Priority</span>
                        <span className="font-medium text-slate-800">
                          {selectedTicket.priority}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Assigned Technician</span>
                        <span className="font-medium text-slate-800">
                          {selectedTicket.assignedTo}
                        </span>
                      </div>
                    </div>

                    <div className="py-4 border-b border-slate-100">
                      <h4 className="text-xs font-semibold text-slate-500 mb-1.5">
                        Issue Description
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {selectedTicket.description}
                      </p>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-xs font-semibold text-slate-500 mb-3">
                        Real-Time Status Updates
                      </h4>
                      <div className="space-y-3">
                        {selectedTicket.updates.map((upd) => (
                          <div
                            key={upd.id}
                            className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs"
                          >
                            <div className="flex items-center justify-between text-slate-500 mb-1">
                              <span className="font-semibold text-slate-800">
                                {upd.authorName}
                              </span>
                              <span className="font-mono-tabular">{upd.timestamp}</span>
                            </div>
                            <p className="text-slate-700">{upd.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-sm text-slate-400">
                    Select a ticket to view real-time status updates.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: IT STAFF & SPECIALISTS DIRECTORY */}
          {activeTab === 'directory' && (
            <div className="max-w-6xl mx-auto space-y-4">
              {/* Directory Filter Bar */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={dirSearch}
                    onChange={(e) => setDirSearch(e.target.value)}
                    placeholder="Search by specialist name, application, or plant..."
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={dirDeptFilter}
                    onChange={(e) => setDirDeptFilter(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="All">All Departments ({DIRECTORY_DATA.length})</option>
                    <option value="SUPPORT LUZON">Application Support Luzon</option>
                    <option value="SUPPORT VISMIN">Application Support VisMin</option>
                    <option value="TECH LUZON">Infrastructure Tech Luzon</option>
                    <option value="TECH VISMIN">Infrastructure Tech VisMin</option>
                    <option value="BSA">Business System Analysts (BSA)</option>
                    <option value="DEV">Software Developers (DEV)</option>
                  </select>
                </div>
              </div>

              {/* Personnel Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDirectory.map((person) => (
                  <div
                    key={person.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-blue-400 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-display font-semibold text-sm text-slate-900">
                            {person.name}
                          </h3>
                          <p className="text-xs font-medium text-blue-700">
                            {person.applicationRole}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {person.department}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{person.plantLocation}</span>
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a
                            href={`mailto:${person.email}`}
                            className="text-slate-700 hover:text-blue-600 truncate"
                          >
                            {person.email}
                          </a>
                        </div>
                        {person.mobile && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <a
                              href={`tel:${person.mobile}`}
                              className="font-mono-tabular text-slate-700 hover:text-blue-600"
                            >
                              {person.mobile}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono-tabular">{person.id}</span>
                      <button
                        type="button"
                        onClick={() => {
                          sendMessageToRobbie(`Who is ${person.name} and how can they help me?`);
                          setActiveTab('robbie');
                        }}
                        className="text-blue-700 hover:underline font-medium"
                      >
                        Ask ROBBIE →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: IT KNOWLEDGE BASE & PROCEDURES */}
          {activeTab === 'kb' && (
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Cisco AnyConnect & FortiClient VPN Troubleshooting',
                  badge: 'Network & Access',
                  desc: 'Gateway: vpn.uratex.com.ph on DC01-VAL domain.',
                  steps:
                    '1. Verify internet connectivity is active.\n2. Server: vpn.uratex.com.ph.\n3. Login using standard @uratex.com.ph credentials.\n4. If encountering "Login Failed", verify password has not expired on DC01-VAL domain.\n5. Contact Help Desk Ext. 4401 if a password/token reset is needed.',
                },
                {
                  title: 'SAP S/4HANA Order-to-Cash (O2C) Workflow',
                  badge: 'Enterprise ERP',
                  desc: 'End-to-end guidance for sales orders, stock checks, and billing.',
                  steps:
                    '• Sales Order: VA01 / VA02 (Check customer PO & pricing).\n• Credit Block Check: VKM1 / VKM3 & BP.\n• Availability & Scheduling (ATP): CO09 for plant inventory.\n• Outbound Delivery: VL01N / VL02N (picking, packing, PGI).\n• Billing & Invoicing: VF01 / VF02 & F-28 accounting interface.',
                },
                {
                  title: 'Zebra Barcode & Label Printer Calibration',
                  badge: 'Packaging & Warehouse',
                  desc: 'Sensor calibration for Packaging Line 1–6 label printers.',
                  steps:
                    '1. Verify power and ribbon media feed alignment.\n2. Hold FEED + CANCEL (or hold FEED until status LED flashes once) to calibrate media sensor.\n3. Restart Windows Print Spooler service (Win+R > services.msc > Print Spooler > Restart).\n4. Clean adhesive residue from sensor glass.',
                },
                {
                  title: 'Uratex Email Signature Generator',
                  badge: 'Corporate Identity',
                  desc: 'Generate approved company email signatures (https://email-signature-4ti.pages.dev).',
                  steps:
                    '1. Visit https://email-signature-4ti.pages.dev.\n2. Enter Full Name, Job Title, Department, and @uratex.com.ph email.\n3. Select company affiliate (e.g. MULTIFLEX RNC PHILS., INC.) and plant.\n4. Click "COPY SIGNATURE".\n5. In Gmail or Outlook, paste (Ctrl+V) into Signature Settings.',
                },
                {
                  title: 'Rule 7: Keyboard, Mouse & Peripheral Hardware Checks',
                  badge: 'Hardware Support',
                  desc: 'Safe, reversible troubleshooting steps for workplace workstations.',
                  steps:
                    '1. Re-plug USB connection or 2.4GHz wireless dongle to a different direct port.\n2. Verify battery switch is ON and replace AA/AAA cells.\n3. Press NumLock & CapsLock to inspect LEDs. If letters type numbers, press Fn+NumLock.\n4. Restart workstation.\n5. Device Manager > Keyboards > Uninstall device > Action > Scan for hardware changes.',
                },
                {
                  title: 'IT Help Desk Escalation & Emergency Dispatch',
                  badge: 'Escalation Directory',
                  desc: 'Direct phone lines for urgent system and plant outages.',
                  steps:
                    '• Uratex IT Help Desk Local Ext: 4401\n• Support Manager: Eric Borromeo (0917-822-4595)\n• Tech Luzon Specialists: Joel Genaloc, Daniel Fabon, Aaron Bernardo\n• Tech VisMin Specialists: Glecer Jay Pejana (Cebu), Joselito Cobaria (CDO), Glenn Fernandez (Davao)\n• For plant-wide outages, file a Critical ticket immediately.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-sm text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    <pre className="text-xs text-slate-700 mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100 font-sans whitespace-pre-wrap leading-relaxed">
                      {item.steps}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
