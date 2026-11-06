import React, { useState } from 'react';
import {
  Search,
  LogOut,
  Send,
  LayoutDashboard,
  Users,
  ClipboardList,
  Phone,
  Mail,
  MapPin,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Network,
} from 'lucide-react';
import {
  UratexUser,
  SupportTicket,
  TicketPriority,
  TicketStatus,
} from '../types';
import { DIRECTORY_DATA, AVAILABLE_MODELS } from '../data/uratexDirectory';

interface AdminDashboardProps {
  user: UratexUser;
  tickets: SupportTicket[];
  onUpdateTicket: (
    id: string,
    updates: { status?: TicketStatus; priority?: TicketPriority; assignedTo?: string }
  ) => Promise<void>;
  onAddTicketUpdate: (id: string, message: string) => Promise<void>;
  onSwitchToUser: () => void;
  onSignOut: () => void;
}

const TECHNICIANS = [
  'Unassigned',
  ...DIRECTORY_DATA.map((p) => `${p.name} (${p.applicationRole} · ${p.plantLocation})`),
];

const PRIORITIES: TicketPriority[] = ['Critical', 'High', 'Medium', 'Low'];
const STATUSES: TicketStatus[] = ['Open', 'In Progress', 'Resolved'];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  tickets,
  onUpdateTicket,
  onAddTicketUpdate,
  onSwitchToUser,
  onSignOut,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'tickets' | 'roster' | 'gateway'>('tickets');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    tickets[0]?.id || null
  );
  const [updateNote, setUpdateNote] = useState('');
  const [isPostingNote, setIsPostingNote] = useState(false);

  // Roster Filter State
  const [rosterSearch, setRosterSearch] = useState('');
  const [rosterDept, setRosterDept] = useState('All');

  // AI Gateway & Ollama Diagnostics State
  const [targetOllamaUrl, setTargetOllamaUrl] = useState('http://10.0.120.202:11434/v1/chat/completions');
  const [targetOllamaKey, setTargetOllamaKey] = useState('uratex_corp_it_jwt_token_auth_2026');
  const [targetOllamaModel, setTargetOllamaModel] = useState('qwen2.5-coder:1.5b');
  const [diagResult, setDiagResult] = useState<any>(null);
  const [isTestingDiag, setIsTestingDiag] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const openCount = tickets.filter((t) => t.status === 'Open').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const criticalHighCount = tickets.filter(
    (t) => (t.priority === 'Critical' || t.priority === 'High') && t.status !== 'Resolved'
  ).length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;
  const slaRate =
    tickets.length > 0
      ? `${(((tickets.length - criticalHighCount * 0.2) / tickets.length) * 100).toFixed(1)}%`
      : '100%';

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const selectedTicket =
    tickets.find((t) => t.id === selectedTicketId) || filteredTickets[0] || null;

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !updateNote.trim() || isPostingNote) return;

    setIsPostingNote(true);
    try {
      await onAddTicketUpdate(selectedTicket.id, updateNote.trim());
      setUpdateNote('');
    } finally {
      setIsPostingNote(false);
    }
  };

  const runAiDiagnostics = async () => {
    setIsTestingDiag(true);
    setDiagResult(null);
    try {
      const res = await fetch('/api/ai/diagnostics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetOllamaUrl,
          key: targetOllamaKey,
          model: targetOllamaModel,
        }),
      });
      const data = await res.json();
      setDiagResult(data);
    } catch (err: any) {
      setDiagResult({
        reachable: false,
        error: err.message || 'Failed to ping diagnostics endpoint',
        cloudFallback: 'Active',
      });
    } finally {
      setIsTestingDiag(false);
    }
  };

  const handleSaveAiConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetOllamaUrl,
          key: targetOllamaKey,
          model: targetOllamaModel,
        }),
      });
      setSaveSuccessMsg('AI Bot configuration updated successfully!');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch {
      // ignore
    }
  };

  const filteredRoster = DIRECTORY_DATA.filter((p) => {
    const q = rosterSearch.toLowerCase().trim();
    const matchesDept = rosterDept === 'All' || p.department === rosterDept;
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Bar */}
      <header className="bg-slate-900 text-white px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-8">
        <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-display font-bold text-sm">
            U
          </div>
          <div>
            <span className="font-display font-bold text-base tracking-tight">
              Uratex IT Service Desk
            </span>
            <span className="text-xs text-slate-400 ml-2.5">
              Admin Operations · {user.name}
            </span>
          </div>
        </div>

        {/* Tab Controls & User Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveAdminTab('tickets')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeAdminTab === 'tickets'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5" />
              <span>Tickets Queue</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveAdminTab('roster')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeAdminTab === 'roster'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>IT Staff ({DIRECTORY_DATA.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveAdminTab('gateway')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeAdminTab === 'gateway'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI Bot & Gateway</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onSwitchToUser}
            className="px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Employee View</span>
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Performance Metrics Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs font-medium text-slate-500">Incoming / Open</div>
            <div className="font-mono-tabular text-2xl font-bold text-slate-900 mt-1">
              {openCount}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono-tabular">
              {inProgressCount} in progress
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs font-medium text-slate-500">Critical & High Priority</div>
            <div className="font-mono-tabular text-2xl font-bold text-red-600 mt-1">
              {criticalHighCount}
            </div>
            <div className="text-xs text-slate-400 mt-1">Immediate attention required</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs font-medium text-slate-500">Avg. First Response</div>
            <div className="font-mono-tabular text-2xl font-bold text-slate-900 mt-1">
              14m
            </div>
            <div className="text-xs text-emerald-700 mt-1">Within 30m SLA target</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="text-xs font-medium text-slate-500">SLA Resolution Rate</div>
            <div className="font-mono-tabular text-2xl font-bold text-slate-900 mt-1">
              {slaRate}
            </div>
            <div className="text-xs text-slate-400 mt-1 font-mono-tabular">
              {resolvedCount} resolved today
            </div>
          </div>
        </section>

        {activeAdminTab === 'tickets' ? (
          /* Incoming Tickets Queue & Detail Panel */
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Incoming Tickets Table */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
              {/* Filters */}
              <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search ticket ID, employee, or plant..."
                    className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="All">All Statuses</option>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>

                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="All">All Priorities</option>
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold text-slate-500">
                      <th className="py-3 px-4">Ticket ID</th>
                      <th className="py-3 px-4">Issue & Reporter</th>
                      <th className="py-3 px-4">Priority</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Assignee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredTickets.map((t) => (
                      <tr
                        key={t.id}
                        onClick={() => setSelectedTicketId(t.id)}
                        className={`cursor-pointer hover:bg-slate-50 transition-colors ${
                          selectedTicket?.id === t.id ? 'bg-blue-50/60' : ''
                        }`}
                      >
                        <td className="py-3 px-4 font-mono-tabular font-semibold text-slate-700 whitespace-nowrap">
                          {t.id}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 line-clamp-1">
                            {t.title}
                          </div>
                          <div className="text-slate-500">
                            {t.reporterName} · {t.location}
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`font-semibold ${
                              t.priority === 'Critical'
                                ? 'text-red-600'
                                : t.priority === 'High'
                                ? 'text-amber-700'
                                : 'text-slate-600'
                            }`}
                          >
                            {t.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
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
                        </td>
                        <td className="py-3 px-4 text-slate-600 whitespace-nowrap max-w-[150px] truncate">
                          {t.assignedTo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right: Ticket Action & Resolution Panel */}
            <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
              {selectedTicket ? (
                <div className="space-y-4">
                  <div className="pb-3 border-b border-slate-200">
                    <div className="text-xs font-mono-tabular text-slate-500">
                      {selectedTicket.id} · {selectedTicket.createdAt}
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900 mt-1">
                      {selectedTicket.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedTicket.reporterName} ({selectedTicket.reporterEmail})
                    </p>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {selectedTicket.description}
                  </p>

                  {/* Controls: Status, Priority, Assignee */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Status
                      </label>
                      <select
                        value={selectedTicket.status}
                        onChange={(e) =>
                          onUpdateTicket(selectedTicket.id, {
                            status: e.target.value as TicketStatus,
                          })
                        }
                        className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-500 mb-1">
                        Priority
                      </label>
                      <select
                        value={selectedTicket.priority}
                        onChange={(e) =>
                          onUpdateTicket(selectedTicket.id, {
                            priority: e.target.value as TicketPriority,
                          })
                        }
                        className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                      >
                        {PRIORITIES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">
                      Assigned IT Specialist / Technician
                    </label>
                    <select
                      value={selectedTicket.assignedTo}
                      onChange={(e) =>
                        onUpdateTicket(selectedTicket.id, { assignedTo: e.target.value })
                      }
                      className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg bg-white truncate"
                    >
                      {TECHNICIANS.map((tech) => (
                        <option key={tech} value={tech}>
                          {tech}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Activity Log */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-500 mb-2">
                      Activity & Updates
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedTicket.updates.map((u) => (
                        <div key={u.id} className="text-xs bg-slate-50 p-2.5 rounded-lg">
                          <div className="flex justify-between text-[11px] text-slate-400">
                            <span className="font-semibold text-slate-700">
                              {u.authorName}
                            </span>
                            <span className="font-mono-tabular">{u.timestamp}</span>
                          </div>
                          <p className="text-slate-700 mt-0.5">{u.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Post Real-Time Update */}
                  <form onSubmit={handlePostUpdate} className="pt-2 flex gap-2">
                    <input
                      type="text"
                      value={updateNote}
                      onChange={(e) => setUpdateNote(e.target.value)}
                      placeholder="Post status update to employee..."
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="submit"
                      disabled={!updateNote.trim() || isPostingNote}
                      className="px-3 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-medium rounded-lg flex items-center gap-1 shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-xs text-slate-400">
                  Select a ticket from the queue to manage.
                </div>
              )}
            </div>
          </section>
        ) : activeAdminTab === 'roster' ? (
          /* IT Staff Directory Roster */
          <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={rosterSearch}
                  onChange={(e) => setRosterSearch(e.target.value)}
                  placeholder="Search IT personnel, plant location, or role..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <select
                value={rosterDept}
                onChange={(e) => setRosterDept(e.target.value)}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRoster.map((staff) => (
                <div
                  key={staff.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">
                          {staff.name}
                        </h4>
                        <div className="text-xs font-medium text-blue-700">
                          {staff.applicationRole}
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        {staff.department}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{staff.plantLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{staff.email}</span>
                      </div>
                      {staff.mobile && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-mono-tabular">{staff.mobile}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/70 text-[11px] text-slate-400 flex justify-between">
                    <span>{staff.id}</span>
                    <span>{staff.isManager ? 'Manager' : 'Specialist'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* AI Bot & Gateway Settings & Diagnostics */
          <section className="space-y-6">
            {/* Top Gateway Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <h3 className="font-display font-bold text-base text-slate-900">
                      Uratex AI Bot Gateway (Ollama & Cloud Hybrid)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct integration with Uratex Corporate IT AI server with seamless cloud fallback
                  </p>
                </div>

                <button
                  type="button"
                  onClick={runAiDiagnostics}
                  disabled={isTestingDiag}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-medium rounded-lg flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTestingDiag ? 'animate-spin' : ''}`} />
                  <span>{isTestingDiag ? 'Testing Connection...' : 'Test Ollama Connection'}</span>
                </button>
              </div>

              {saveSuccessMsg && (
                <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* Diagnostics Test Output */}
              {diagResult && (
                <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {diagResult.reachable ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      <span className="font-semibold text-slate-900">
                        {diagResult.reachable
                          ? 'Connection Successful (HTTP 200 OK)'
                          : 'Internal LAN IP (Private Corporate Intranet)'}
                      </span>
                    </div>
                    {diagResult.latencyMs > 0 && (
                      <span className="font-mono-tabular text-slate-500">
                        {diagResult.latencyMs}ms latency
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed">{diagResult.networkNote}</p>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    Active Cloud Failover Engine:{' '}
                    <strong className="text-slate-700">{diagResult.cloudFallback}</strong>
                  </div>
                </div>
              )}

              {/* Endpoint Configuration Form */}
              <form onSubmit={handleSaveAiConfig} className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Ollama API URL / Tunnel
                  </label>
                  <input
                    type="text"
                    value={targetOllamaUrl}
                    onChange={(e) => setTargetOllamaUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    e.g. http://10.0.120.202:11434/v1/chat/completions or Cloudflare Tunnel URL
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    API Authorization Token (Bearer)
                  </label>
                  <input
                    type="text"
                    value={targetOllamaKey}
                    onChange={(e) => setTargetOllamaKey(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Configured Uratex corporate JWT token
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Default AI Model
                  </label>
                  <select
                    value={targetOllamaModel}
                    onChange={(e) => setTargetOllamaModel(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    {AVAILABLE_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label} ({m.badge})
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Model Catalog */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold text-sm text-slate-900">
                Configured Uratex AI Models Catalog
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AVAILABLE_MODELS.map((m) => (
                  <div
                    key={m.id}
                    className={`bg-white border rounded-xl p-4 flex flex-col justify-between ${
                      targetOllamaModel === m.id
                        ? 'border-blue-600 ring-1 ring-blue-600'
                        : 'border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900">{m.label}</span>
                        <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          {m.badge}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                        {m.category}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {m.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-400 truncate max-w-[150px]">
                        {m.id}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setTargetOllamaModel(m.id);
                        }}
                        className={`text-xs font-medium ${
                          targetOllamaModel === m.id
                            ? 'text-blue-700 font-semibold'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {targetOllamaModel === m.id ? 'Active' : 'Set Active'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
