// Uratex Philippines IT Service Desk - Pure JavaScript Client
let currentView = 'user';
let userSection = 'robbie';
let currentUserEmail = 'marketing@uratex.com.ph';
let currentPlant = 'Muntinlupa Head Office';
let allTickets = [];
let itDirectory = [];
let promptRules = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchTickets();
  fetchMetrics();
  fetchDirectory();
  fetchRules();
});

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.nav-tab-link').forEach(el => el.classList.remove('active'));
  const activeLink = document.getElementById(`nav-${view}`);
  if (activeLink) activeLink.classList.add('active');

  document.getElementById('view-user').style.display = view === 'user' ? 'block' : 'none';
  document.getElementById('view-admin').style.display = view === 'admin' ? 'block' : 'none';
  document.getElementById('view-php').style.display = view === 'php' ? 'block' : 'none';

  if (view === 'admin') {
    fetchMetrics();
    renderAdminTickets(allTickets);
  }
}

function switchSection(section) {
  userSection = section;
  document.querySelectorAll('.user-section').forEach(el => el.style.display = 'none');
  const target = document.getElementById(`section-${section}`);
  if (target) target.style.display = 'block';

  document.querySelectorAll('.sidebar-link').forEach(el => el.classList.remove('active'));
  const sideLink = document.getElementById(`side-${section}`);
  if (sideLink) sideLink.classList.add('active');

  if (section === 'my-tickets') renderUserTickets(allTickets);
  if (section === 'directory') renderDirectory(itDirectory);
  if (section === 'rules') renderRules(promptRules);
}

async function fetchTickets() {
  try {
    const res = await fetch('/api/tickets');
    const data = await res.json();
    allTickets = data.tickets || [];
    renderUserTickets(allTickets);
    renderAdminTickets(allTickets);
    document.getElementById('badge-open-count').textContent = allTickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
  } catch (e) {
    console.error(e);
  }
}

async function fetchMetrics() {
  try {
    const res = await fetch('/api/metrics');
    const m = await res.json();
    document.getElementById('kpi-total').textContent = m.total;
    document.getElementById('kpi-urgent').textContent = m.urgentCount + m.highCount;
    document.getElementById('kpi-open').textContent = m.openCount + m.inProgressCount;
    document.getElementById('kpi-sla').textContent = m.slaComplianceRate;
    if (document.getElementById('kpi-staff-count')) {
      document.getElementById('kpi-staff-count').textContent = m.directoryCount || 48;
    }
  } catch (e) {
    console.error(e);
  }
}

async function fetchDirectory() {
  try {
    const res = await fetch('/api/directory');
    const data = await res.json();
    itDirectory = data.directory || [];
    renderDirectory(itDirectory);
  } catch (e) {
    console.error(e);
  }
}

async function fetchRules() {
  try {
    const res = await fetch('/api/rules');
    const data = await res.json();
    promptRules = data.rules || [];
    renderRules(promptRules);
  } catch (e) {
    console.error(e);
  }
}

// Render IT Directory
function renderDirectory(list) {
  const tbody = document.getElementById('directory-tbody');
  if (!tbody) return;
  if (!list.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No IT staff found.</td></tr>';
    return;
  }

  tbody.innerHTML = list.map(item => `
    <tr>
      <td class="font-mono text-muted text-xs">${item.id}</td>
      <td class="font-weight-bold text-slate-900">
        ${item.name}
        ${item.isManager ? '<span class="badge badge-warning ml-1">Manager</span>' : ''}
      </td>
      <td><span class="badge badge-primary">${item.applicationRole}</span></td>
      <td><span class="badge badge-light border">${item.departmentName || item.department}</span></td>
      <td><i class="fas fa-map-marker-alt text-muted mr-1"></i>${item.plantLocation}</td>
      <td><a href="mailto:${item.email}" class="text-primary">${item.email}</a></td>
      <td class="font-mono">${item.mobile || '<span class="text-muted">N/A</span>'}</td>
    </tr>
  `).join('');

  document.getElementById('directory-count-badge').textContent = `${list.length} Staff Members`;
}

function filterDirectory() {
  const query = document.getElementById('dir-search').value.toLowerCase();
  const dept = document.getElementById('dir-dept-filter').value;

  const filtered = itDirectory.filter(item => {
    const matchQuery = item.name.toLowerCase().includes(query) ||
      item.applicationRole.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.plantLocation.toLowerCase().includes(query);

    const matchDept = dept === 'all' || item.department === dept;
    return matchQuery && matchDept;
  });

  renderDirectory(filtered);
}

// Render Prompt Rules
function renderRules(rules) {
  const container = document.getElementById('rules-accordion');
  if (!container) return;
  if (!rules.length) {
    container.innerHTML = '<p class="text-muted">No rules loaded.</p>';
    return;
  }

  container.innerHTML = rules.map((r, i) => `
    <div class="card mb-2 shadow-none border">
      <div class="card-header p-2 bg-light d-flex justify-content-between align-items-center">
        <h6 class="mb-0 font-weight-bold text-xs">
          <span class="badge badge-info mr-2">${r.id}</span>
          ${r.name}
        </h6>
        <span class="badge badge-success text-[10px]">ACTIVE RULE</span>
      </div>
      <div class="card-body p-3 text-xs text-slate-700 bg-white">
        <p class="mb-1">${r.content}</p>
        <small class="text-muted"><i class="fas fa-info-circle mr-1"></i>${r.description}</small>
      </div>
    </div>
  `).join('');
}

// ROBBIE AI Chat
function sendQuickPrompt(promptText) {
  document.getElementById('chat-input').value = promptText;
  sendChatMessage();
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  appendChatMsg('user', msg);
  input.value = '';

  const thinkingId = 'thinking-' + Date.now();
  appendChatMsg('bot', '<i class="fas fa-spinner fa-spin mr-1"></i> ROBBIE is referencing prompt rules & IT directory...', thinkingId);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg, plantLocation: currentPlant, email: currentUserEmail })
    });
    const data = await res.json();
    const thinkEl = document.getElementById(thinkingId);
    if (thinkEl) thinkEl.remove();

    let replyHtml = (data.reply || '').replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (data.escalated) {
      replyHtml += `
        <div class="mt-2 pt-2 border-top">
          <button class="btn btn-sm btn-danger font-weight-bold" onclick="escalateToTicket('${encodeURIComponent(msg)}')">
            <i class="fas fa-ticket-alt mr-1"></i> Proceed to File IT Support Ticket
          </button>
        </div>`;
    }
    appendChatMsg('bot', replyHtml);
  } catch (err) {
    const thinkEl = document.getElementById(thinkingId);
    if (thinkEl) thinkEl.remove();
    appendChatMsg('bot', 'Temporary error connecting to AI gateway. You may file an IT ticket directly using the left menu.');
  }
}

function appendChatMsg(sender, html, id) {
  const box = document.getElementById('chat-box');
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  if (id) div.id = id;
  div.innerHTML = `<div class="chat-bubble ${sender}">${html}</div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function escalateToTicket(query) {
  switchView('user');
  switchSection('new-ticket');
  document.getElementById('escalate-banner').style.display = 'block';
  if (query) {
    document.getElementById('t-subject').value = decodeURIComponent(query);
  }
  document.getElementById('t-description').value = 'Employee reported problem during ROBBIE AI session. Requires technician investigation.';
  document.getElementById('t-robbie-notes').value = 'Forwarded from ROBBIE AI session (Prompt Rules & Directory verified).';
}

// Ticket Form Submission
async function submitTicket(e) {
  e.preventDefault();
  const email = document.getElementById('t-email').value.trim();
  if (!email.toLowerCase().endsWith('@uratex.com.ph')) {
    alert('Security Policy: Only @uratex.com.ph email accounts are authorized.');
    return;
  }

  const payload = {
    creatorName: document.getElementById('t-name').value,
    creatorEmail: email,
    category: document.getElementById('t-category').value,
    priority: document.getElementById('t-priority').value,
    plantLocation: document.getElementById('t-plant').value,
    department: document.getElementById('t-dept').value,
    contactNumber: document.getElementById('t-contact').value,
    subject: document.getElementById('t-subject').value,
    description: document.getElementById('t-description').value,
    robbieNotes: document.getElementById('t-robbie-notes').value,
  };

  try {
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      showToast(`Ticket Created: ${data.ticket.ticketNumber}`, `Dispatched & Assigned to: ${data.ticket.assignedTo}!`);
      fetchTickets();
      switchSection('my-tickets');
    } else {
      alert(data.error || 'Failed to submit ticket');
    }
  } catch (err) {
    alert('Failed to connect to server: ' + err.message);
  }
}

// Render User Tickets Table
function renderUserTickets(tickets) {
  const tbody = document.getElementById('user-tickets-tbody');
  if (!tbody) return;
  if (!tickets.length) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No tickets recorded.</td></tr>';
    return;
  }
  tbody.innerHTML = tickets.map(t => `
    <tr>
      <td class="font-weight-bold text-primary font-mono">${t.ticketNumber}</td>
      <td>${t.subject}</td>
      <td><span class="badge badge-light border">${t.category}</span></td>
      <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
      <td><span class="badge badge-${getStatusBadge(t.status)}">${t.status}</span></td>
      <td>${t.assignedTo || '<span class="text-muted">In Queue</span>'}</td>
      <td>
        <button class="btn btn-xs btn-outline-primary" onclick="showTimelineModal('${t.id}')">Timeline</button>
      </td>
    </tr>
  `).join('');
}

// Render Admin Tickets Table
function renderAdminTickets(tickets) {
  const tbody = document.getElementById('admin-tickets-tbody');
  if (!tbody) return;
  tbody.innerHTML = tickets.map(t => `
    <tr>
      <td class="font-weight-bold text-primary">${t.ticketNumber}</td>
      <td>${t.subject}</td>
      <td>${t.category}</td>
      <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
      <td><span class="badge badge-${getStatusBadge(t.status)}">${t.status}</span></td>
      <td>${t.plantLocation}</td>
      <td>${t.creatorName}</td>
      <td><strong>${t.assignedTo || 'Unassigned'}</strong></td>
      <td>
        <button class="btn btn-xs btn-primary" onclick="openAssignModal('${t.id}')">Assign Staff</button>
        <button class="btn btn-xs btn-success" onclick="adminResolve('${t.id}')">Resolve</button>
      </td>
    </tr>
  `).join('');
}

function getStatusBadge(status) {
  if (status === 'Resolved' || status === 'Closed') return 'success';
  if (status === 'In Progress') return 'primary';
  if (status === 'Waiting for User') return 'warning';
  return 'danger';
}

function showTimelineModal(id) {
  const t = allTickets.find(item => item.id === id);
  if (!t) return;
  document.getElementById('modal-t-num').textContent = t.ticketNumber;
  document.getElementById('modal-t-subj').textContent = t.subject;
  document.getElementById('modal-t-desc').textContent = t.description;
  document.getElementById('modal-t-sla').textContent = `${t.priority} (${t.slaTargetHours}h SLA)`;
  document.getElementById('modal-t-plant').textContent = t.plantLocation;
  document.getElementById('modal-t-assigned').textContent = t.assignedTo || 'Unassigned (Queue)';
  $('#timelineModal').modal('show');
}

let currentAssignTicketId = null;
function openAssignModal(id) {
  currentAssignTicketId = id;
  const select = document.getElementById('staff-assign-select');
  if (select && itDirectory.length) {
    select.innerHTML = itDirectory.map(staff => `
      <option value="${staff.name} (${staff.applicationRole})">
        ${staff.name} - ${staff.applicationRole} [${staff.department}] (${staff.plantLocation})
      </option>
    `).join('');
  }
  $('#assignStaffModal').modal('show');
}

async function confirmStaffAssign() {
  if (!currentAssignTicketId) return;
  const tech = document.getElementById('staff-assign-select').value;
  await fetch(`/api/tickets/${currentAssignTicketId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assignedTo: tech, status: 'In Progress' })
  });
  $('#assignStaffModal').modal('hide');
  fetchTickets();
  fetchMetrics();
}

async function adminResolve(id) {
  const notes = prompt('Resolution summary:', 'Inspected and resolved on-site.');
  if (!notes) return;
  await fetch(`/api/tickets/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'Resolved', resolutionNotes: notes })
  });
  fetchTickets();
  fetchMetrics();
}

async function simulateIncomingTicket() {
  const payload = {
    creatorName: 'Rogelio Diaz',
    creatorEmail: 'rdiaz@uratex.com.ph',
    category: 'Hardware & Printers',
    priority: 'Urgent',
    plantLocation: 'Valenzuela Plant',
    department: 'Foam Production Line 3',
    contactNumber: 'Local 1144',
    subject: 'URGENT: Foam Cutting Line PLC & Barcode Scanner Offline',
    description: 'Mattress cutting conveyor line stopped due to barcode scanner timeout.',
    robbieNotes: 'ROBBIE verified device ping failure. Critical production halt alert.'
  };

  const res = await fetch('/api/tickets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (res.ok) {
    showToast(`Incoming Alert: ${data.ticket.ticketNumber}`, `Urgent ticket auto-assigned to ${data.ticket.assignedTo}!`);
    fetchTickets();
    fetchMetrics();
  }
}

function promptGoogleLogin() {
  const email = prompt('Enter your corporate @uratex.com.ph email:', currentUserEmail);
  if (email) {
    if (!email.toLowerCase().endsWith('@uratex.com.ph')) {
      alert('Access Denied: Only @uratex.com.ph Google Workspace accounts are permitted.');
      return;
    }
    currentUserEmail = email;
    document.getElementById('user-email-display').textContent = email;
    document.getElementById('t-email').value = email;
  }
}

function showToast(title, msg) {
  const toast = document.getElementById('live-toast');
  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-msg').textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 5000);
}
