<?php
/**
 * Uratex Philippines IT Service Desk
 * Main Single-File Application (AdminLTE 3 + PHP 8.x + SQLite/MySQL)
 *
 * Ubuntu 22.04 LTS / Apache 2.4.52 / NGINX / PHP 8.6 compatible
 * Path: /var/www/html/index.php
 */

require_once __DIR__ . '/config.php';

// Check if user is logged in, default guest simulation for employee
$currentUser = $_SESSION['user_email'] ?? 'marketing@uratex.com.ph';
$currentUserName = $_SESSION['user_name'] ?? 'Marketing Team (Uratex PH)';
$isLoggedIn = !empty($_SESSION['user_email']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Uratex Philippines IT Service Desk & ROBBIE AI</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- AdminLTE 3 CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
  
  <style>
    :root {
      --uratex-blue: #003399;
      --uratex-navy: #001f5c;
      --uratex-yellow: #fdb913;
    }
    .brand-link {
      background-color: var(--uratex-navy) !important;
      border-bottom: 2px solid var(--uratex-yellow) !important;
    }
    .bg-uratex {
      background-color: var(--uratex-blue) !important;
      color: #fff !important;
    }
    .sidebar-dark-primary .nav-sidebar>.nav-item>.nav-link.active {
      background-color: var(--uratex-blue) !important;
    }
    .chat-box {
      height: 440px;
      overflow-y: auto;
      padding: 15px;
      background: #f8fafc;
      border-radius: 6px;
    }
    .chat-msg {
      margin-bottom: 14px;
      display: flex;
      flex-direction: column;
    }
    .chat-msg.user {
      align-items: flex-end;
    }
    .chat-msg.bot {
      align-items: flex-start;
    }
    .bubble {
      max-width: 80%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.5;
    }
    .bubble.user {
      background: var(--uratex-blue);
      color: white;
      border-bottom-right-radius: 2px;
    }
    .bubble.bot {
      background: #ffffff;
      color: #1e293b;
      border: 1px solid #e2e8f0;
      border-bottom-left-radius: 2px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .badge-urgent { background-color: #ef4444; color: white; }
    .badge-high { background-color: #f97316; color: white; }
    .badge-medium { background-color: #3b82f6; color: white; }
    .badge-low { background-color: #64748b; color: white; }
  </style>
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#user-view" class="nav-link active nav-tab-link" onclick="switchView('user')">User Service Desk</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#admin-view" class="nav-link nav-tab-link" onclick="switchView('admin')">IT Admin Dashboard</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Domain Verification Badge -->
      <li class="nav-item d-flex align-items-center mr-3">
        <span class="badge badge-success px-2 py-1"><i class="fab fa-google mr-1"></i> @uratex.com.ph Verified</span>
      </li>
      <!-- Notifications -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge" id="alert-count">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-header">Uratex IT Alerts</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-exclamation-triangle mr-2 text-danger"></i> 1 Urgent SAP PRD Ticket
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-print mr-2 text-warning"></i> Valenzuela Plant Zebra Printer
          </a>
        </div>
      </li>
      <li class="nav-item dropdown user-menu">
        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">
          <i class="fas fa-user-circle fa-lg mr-1 text-primary"></i>
          <span class="d-none d-md-inline" id="user-display-email"><?php echo htmlspecialchars($currentUser); ?></span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-3 text-center">
          <p class="font-weight-bold mb-1"><?php echo htmlspecialchars($currentUserName); ?></p>
          <p class="text-muted small"><?php echo htmlspecialchars($currentUser); ?></p>
          <div class="dropdown-divider"></div>
          <button class="btn btn-sm btn-outline-danger btn-block" onclick="promptGoogleLogin()"><i class="fab fa-google mr-1"></i> Switch Google Account</button>
        </div>
      </li>
    </ul>
  </nav>

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <span class="brand-text font-weight-bold ml-3" style="color: #fdb913;">URATEX</span>
      <span class="brand-text text-white small ml-1">IT Service Desk</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- User Info -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
        <div class="image">
          <i class="fas fa-building text-warning fa-2x ml-2"></i>
        </div>
        <div class="info">
          <a href="#" class="d-block font-weight-bold">Uratex Philippines</a>
          <small class="text-muted">RGC Group of Companies</small>
        </div>
      </div>

      <!-- Plant / Branch Selector -->
      <div class="form-group px-2">
        <label class="text-muted small mb-1">Your Plant / Branch:</label>
        <select class="form-control form-control-sm bg-dark text-white border-secondary" id="active-plant">
          <option selected>Muntinlupa Head Office</option>
          <option>Valenzuela Foam Plant</option>
          <option>Canlubang Plant (Laguna)</option>
          <option>Plaridel Plant (Bulacan)</option>
          <option>Cebu Plant & Showroom</option>
          <option>Davao Plant (Mindanao)</option>
          <option>Iloilo Showroom</option>
        </select>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
          <li class="nav-header">EMPLOYEE SELF-SERVICE</li>
          <li class="nav-item">
            <a href="#" class="nav-link active" onclick="switchSection('robbie-section')">
              <i class="nav-icon fas fa-robot text-warning"></i>
              <p>ROBBIE AI Assistant</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="switchSection('new-ticket-section')">
              <i class="nav-icon fas fa-plus-circle text-info"></i>
              <p>Submit IT Ticket</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="switchSection('my-tickets-section')">
              <i class="nav-icon fas fa-tasks text-success"></i>
              <p>Track My Tickets</p>
            </a>
          </li>

          <li class="nav-header">IT DEPARTMENT</li>
          <li class="nav-item">
            <a href="#" class="nav-link" onclick="switchView('admin')">
              <i class="nav-icon fas fa-tachometer-alt text-danger"></i>
              <p>Admin Dashboard</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>

  <!-- Content Wrapper -->
  <div class="content-wrapper">
    <!-- User View Container -->
    <div id="user-view-container" class="p-3">
      <!-- ROBBIE AI Main Section -->
      <div id="robbie-section">
        <div class="row">
          <div class="col-lg-8">
            <div class="card card-primary card-outline shadow-sm">
              <div class="card-header bg-uratex">
                <h3 class="card-title font-weight-bold">
                  <i class="fas fa-robot mr-2 text-warning"></i> ROBBIE - Resolution Oriented Bot for Business & IT Efficiency
                </h3>
                <div class="card-tools">
                  <span class="badge badge-light text-primary">Gemini 3.8 Flash Powered</span>
                </div>
              </div>
              <div class="card-body">
                <div class="chat-box" id="chat-messages">
                  <div class="chat-msg bot">
                    <div class="bubble bot">
                      <strong>Kumusta! I am ROBBIE</strong>, your Uratex Philippines IT Service Desk assistant.<br>
                      I can help you troubleshoot SAP logon errors, Zebra label printers, FortiClient VPN, Outlook 365, Wi-Fi connections, and account requests.<br><br>
                      <em>How can I assist your department today?</em>
                    </div>
                  </div>
                </div>

                <!-- Quick Prompt Chips -->
                <div class="mt-2 mb-2 d-flex flex-wrap" style="gap: 6px;">
                  <button class="btn btn-xs btn-outline-secondary" onclick="sendQuickPrompt('SAP S/4HANA Error 10060 connection timeout')">SAP 10060 Timeout</button>
                  <button class="btn btn-xs btn-outline-secondary" onclick="sendQuickPrompt('Zebra ZT411 label printer paper ribbon jam')">Zebra Printer Jam</button>
                  <button class="btn btn-xs btn-outline-secondary" onclick="sendQuickPrompt('FortiClient VPN IPsec disconnected from Muntinlupa server')">FortiClient VPN</button>
                  <button class="btn btn-xs btn-outline-secondary" onclick="sendQuickPrompt('Outlook 365 OST mailbox size quota full')">Outlook Mailbox Full</button>
                  <button class="btn btn-xs btn-outline-danger" onclick="escalateToHumanTicket()">Request Human IT Support</button>
                </div>

                <!-- Input area -->
                <div class="input-group">
                  <input type="text" id="chat-input" class="form-control" placeholder="Describe your technical issue (e.g. SAP won't open, printer offline)..." onkeydown="if(event.key==='Enter') sendChatMessage()">
                  <div class="input-group-append">
                    <button class="btn btn-primary bg-uratex" onclick="sendChatMessage()">
                      <i class="fas fa-paper-plane mr-1"></i> Ask ROBBIE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions & Status column -->
          <div class="col-lg-4">
            <div class="card card-outline card-warning shadow-sm">
              <div class="card-header">
                <h3 class="card-title font-weight-bold text-dark"><i class="fas fa-hands-helping text-warning mr-1"></i> Need Urgent Human Help?</h3>
              </div>
              <div class="card-body">
                <p class="small text-muted">If ROBBIE cannot solve your hardware fault or network downtime, file an official ticket to page on-duty IT staff.</p>
                <button class="btn btn-warning btn-block font-weight-bold mb-3" onclick="switchSection('new-ticket-section')">
                  <i class="fas fa-file-alt mr-1"></i> File New Support Ticket
                </button>
                <div class="callout callout-info py-2">
                  <h6 class="font-weight-bold mb-1"><i class="fas fa-shield-alt mr-1"></i> Uratex IT Hotline</h6>
                  <p class="small mb-0">Local Extension: <strong>2110 / 2112</strong><br>Email: <strong>itsupport@uratex.com.ph</strong></p>
                </div>
              </div>
            </div>

            <!-- Recent Active Tickets Widget -->
            <div class="card card-outline card-secondary shadow-sm">
              <div class="card-header">
                <h3 class="card-title font-weight-bold"><i class="fas fa-history mr-1"></i> Active Tickets</h3>
              </div>
              <div class="card-body p-0" id="user-active-tickets-widget">
                <div class="p-3 text-center text-muted small">Loading your tickets...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- New Ticket Form Section -->
      <div id="new-ticket-section" style="display: none;">
        <div class="card card-primary card-outline shadow-sm">
          <div class="card-header bg-uratex">
            <h3 class="card-title font-weight-bold"><i class="fas fa-edit mr-2"></i> Submit Technical Support Ticket</h3>
          </div>
          <form id="create-ticket-form" onsubmit="submitNewTicket(event)">
            <div class="card-body">
              <div id="escalation-alert-banner" class="alert alert-info alert-dismissible" style="display: none;">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <h5><i class="icon fas fa-info"></i> Pre-filled by ROBBIE AI Assistant</h5>
                Your inquiry has been summarized for the Uratex IT Support Team. Review and submit below.
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Employee Name</label>
                    <input type="text" id="t-creator-name" class="form-control" value="Marketing Specialist" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Corporate Email (@uratex.com.ph only)</label>
                    <input type="email" id="t-creator-email" class="form-control" value="<?php echo htmlspecialchars($currentUser); ?>" required>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Category</label>
                    <select id="t-category" class="form-control">
                      <option>SAP / ERP</option>
                      <option>Network & VPN</option>
                      <option>Hardware & Printers</option>
                      <option>Email & Microsoft 365</option>
                      <option>Access & Security</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Priority Level</label>
                    <select id="t-priority" class="form-control">
                      <option value="Urgent">Urgent (Production/Plant Halted - 2hr SLA)</option>
                      <option value="High">High (Impacting Major Work - 4hr SLA)</option>
                      <option value="Medium" selected>Medium (Standard Service Request - 8hr SLA)</option>
                      <option value="Low">Low (General Query/Inquiry - 24hr SLA)</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Plant / Facility Location</label>
                    <select id="t-plant" class="form-control">
                      <option>Muntinlupa Head Office</option>
                      <option>Valenzuela Plant</option>
                      <option>Canlubang Plant</option>
                      <option>Plaridel Plant</option>
                      <option>Cebu Plant & Showroom</option>
                      <option>Davao Plant</option>
                      <option>Iloilo Showroom</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Department</label>
                    <input type="text" id="t-department" class="form-control" value="Marketing & Brand Strategy" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Local Intercom / Contact Number</label>
                    <input type="text" id="t-contact" class="form-control" placeholder="e.g. Local 2088 or 0917-XXX-XXXX">
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label>Issue Subject</label>
                <input type="text" id="t-subject" class="form-control" placeholder="Brief summary of the issue" required>
              </div>

              <div class="form-group">
                <label>Detailed Description</label>
                <textarea id="t-description" class="form-control" rows="4" placeholder="Detail the error message, steps taken, computer hostname, etc." required></textarea>
              </div>

              <div class="form-group">
                <label>ROBBIE AI Diagnostic Transcript (Optional)</label>
                <textarea id="t-robbie-notes" class="form-control bg-light" rows="2" readonly></textarea>
              </div>
            </div>
            <div class="card-footer bg-light d-flex justify-content-between">
              <button type="button" class="btn btn-default" onclick="switchSection('robbie-section')">Cancel</button>
              <button type="submit" class="btn btn-primary bg-uratex"><i class="fas fa-paper-plane mr-1"></i> Submit Ticket & Alert IT Team</button>
            </div>
          </form>
        </div>
      </div>

      <!-- My Tickets Section -->
      <div id="my-tickets-section" style="display: none;">
        <div class="card card-outline card-primary shadow-sm">
          <div class="card-header">
            <h3 class="card-title font-weight-bold"><i class="fas fa-list-alt mr-1"></i> My Submitted Tickets</h3>
            <div class="card-tools">
              <button class="btn btn-sm btn-primary bg-uratex" onclick="loadTicketsTable()">
                <i class="fas fa-sync-alt mr-1"></i> Refresh
              </button>
            </div>
          </div>
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap" id="user-tickets-table">
              <thead>
                <tr>
                  <th>Ticket #</th>
                  <th>Subject</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned Tech</th>
                  <th>Date Filed</th>
                </tr>
              </thead>
              <tbody id="user-tickets-tbody">
                <tr><td colspan="7" class="text-center py-4">Loading tickets...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Dashboard Container -->
    <div id="admin-view-container" style="display: none;" class="p-3">
      <!-- Admin KPI Info Boxes -->
      <div class="row">
        <div class="col-12 col-sm-6 col-md-3">
          <div class="info-box shadow-sm">
            <span class="info-box-icon bg-info elevation-1"><i class="fas fa-ticket-alt"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">Total Tickets</span>
              <span class="info-box-number" id="m-total">--</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="info-box shadow-sm">
            <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-fire"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">Urgent / High Queue</span>
              <span class="info-box-number" id="m-urgent">--</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="info-box shadow-sm">
            <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-clock"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">Open & In Progress</span>
              <span class="info-box-number" id="m-open">--</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="info-box shadow-sm">
            <span class="info-box-icon bg-success elevation-1"><i class="fas fa-check-circle"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">SLA Compliance</span>
              <span class="info-box-number">96.8%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ticket Management Table -->
      <div class="card card-outline card-danger shadow-sm">
        <div class="card-header">
          <h3 class="card-title font-weight-bold"><i class="fas fa-headset mr-1 text-danger"></i> Incoming IT Service Tickets</h3>
          <div class="card-tools d-flex align-items-center">
            <input type="text" id="admin-search-input" class="form-control form-control-sm mr-2" placeholder="Search ticket..." onkeyup="filterAdminTickets()">
            <button class="btn btn-sm btn-outline-secondary" onclick="loadAdminTickets()"><i class="fas fa-sync-alt"></i></button>
          </div>
        </div>
        <div class="card-body table-responsive p-0">
          <table class="table table-hover table-striped text-nowrap">
            <thead>
              <tr>
                <th>Ticket #</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Plant Location</th>
                <th>Requester</th>
                <th>Assigned IT</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="admin-tickets-tbody">
              <tr><td colspan="9" class="text-center py-4">Loading incoming tickets...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <footer class="main-footer">
    <strong>Copyright &copy; 2026 <a href="#">Uratex Philippines - RGC Group of Companies</a>.</strong>
    All rights reserved. IT Operations & Infrastructure Department.
  </footer>
</div>

<!-- jQuery & Bootstrap 4 -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
<!-- AdminLTE App -->
<script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>

<script>
  let allTickets = [];

  function switchView(view) {
    if (view === 'user') {
      document.getElementById('user-view-container').style.display = 'block';
      document.getElementById('admin-view-container').style.display = 'none';
      switchSection('robbie-section');
    } else {
      document.getElementById('user-view-container').style.display = 'none';
      document.getElementById('admin-view-container').style.display = 'block';
      loadAdminTickets();
      loadMetrics();
    }
  }

  function switchSection(sectionId) {
    document.getElementById('robbie-section').style.display = 'none';
    document.getElementById('new-ticket-section').style.display = 'none';
    document.getElementById('my-tickets-section').style.display = 'none';

    document.getElementById(sectionId).style.display = 'block';
    if (sectionId === 'my-tickets-section') {
      loadTicketsTable();
    }
  }

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

    // Temporary thinking bubble
    const thinkingId = 'thinking-' + Date.now();
    appendChatMsg('bot', '<i class="fas fa-spinner fa-spin mr-1"></i> ROBBIE is analyzing issue with Uratex knowledge base...', thinkingId);

    try {
      const res = await fetch('api.php?action=chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, email: 'marketing@uratex.com.ph' })
      });
      const data = await res.json();
      
      const el = document.getElementById(thinkingId);
      if (el) el.remove();

      let replyHtml = (data.reply || '').replace(/\n/g, '<br>');
      if (data.escalated) {
        replyHtml += `<div class="mt-2 pt-2 border-top">
          <button class="btn btn-sm btn-danger font-weight-bold" onclick="escalateToHumanTicket('${encodeURIComponent(msg)}')">
            <i class="fas fa-ticket-alt mr-1"></i> Pre-fill Support Ticket from this Chat
          </button>
        </div>`;
      }
      appendChatMsg('bot', replyHtml);
    } catch (e) {
      const el = document.getElementById(thinkingId);
      if (el) el.remove();
      appendChatMsg('bot', 'Sorry, I encountered an issue connecting to the IT Assistant. You can file a ticket directly using the left menu.');
    }
  }

  function appendChatMsg(sender, text, id) {
    const box = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-msg ' + sender;
    if (id) div.id = id;

    div.innerHTML = `<div class="bubble ${sender}">${text}</div>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function escalateToHumanTicket(initialQuery) {
    switchSection('new-ticket-section');
    document.getElementById('escalation-alert-banner').style.display = 'block';
    
    if (initialQuery) {
      document.getElementById('t-subject').value = decodeURIComponent(initialQuery);
    } else {
      document.getElementById('t-subject').value = 'Assistance requested via ROBBIE AI Chatbot';
    }

    document.getElementById('t-description').value = 'Employee encountered issues while troubleshooting with ROBBIE. Requires IT department review and on-site support if necessary.';
    document.getElementById('t-robbie-notes').value = 'Transferred from ROBBIE AI Diagnostic session.';
  }

  async function submitNewTicket(e) {
    e.preventDefault();
    const payload = {
      creator_name: document.getElementById('t-creator-name').value,
      creator_email: document.getElementById('t-creator-email').value,
      category: document.getElementById('t-category').value,
      priority: document.getElementById('t-priority').value,
      plant_location: document.getElementById('t-plant').value,
      department: document.getElementById('t-department').value,
      contact_number: document.getElementById('t-contact').value,
      subject: document.getElementById('t-subject').value,
      description: document.getElementById('t-description').value,
      robbie_notes: document.getElementById('t-robbie-notes').value
    };

    try {
      const res = await fetch('api.php?action=tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Ticket ' + data.ticket_number + ' created and alerted to Uratex IT Support!');
        switchSection('my-tickets-section');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (e) {
      alert('Failed to connect to server: ' + e.message);
    }
  }

  async function loadTicketsTable() {
    try {
      const res = await fetch('api.php?action=tickets');
      const data = await res.json();
      allTickets = data.tickets || [];
      renderUserTickets(allTickets);
    } catch(e) {}
  }

  function renderUserTickets(tickets) {
    const tbody = document.getElementById('user-tickets-tbody');
    if (!tickets.length) {
      tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No tickets recorded.</td></tr>';
      return;
    }

    tbody.innerHTML = tickets.map(t => `
      <tr>
        <td><strong>${t.ticket_number}</strong></td>
        <td>${t.subject}</td>
        <td><span class="badge badge-light border">${t.category}</span></td>
        <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
        <td><span class="badge badge-${getStatusBadge(t.status)}">${t.status}</span></td>
        <td>${t.assigned_to || '<span class="text-muted">Unassigned</span>'}</td>
        <td>${(t.created_at || '').substring(0, 16)}</td>
      </tr>
    `).join('');
  }

  function getStatusBadge(status) {
    if (status === 'Resolved' || status === 'Closed') return 'success';
    if (status === 'In Progress') return 'primary';
    if (status === 'Waiting for User') return 'warning';
    return 'danger';
  }

  async function loadAdminTickets() {
    await loadTicketsTable();
    renderAdminTickets(allTickets);
  }

  function renderAdminTickets(tickets) {
    const tbody = document.getElementById('admin-tickets-tbody');
    tbody.innerHTML = tickets.map(t => `
      <tr>
        <td><strong>${t.ticket_number}</strong></td>
        <td>${t.subject}</td>
        <td>${t.category}</td>
        <td><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></td>
        <td><span class="badge badge-${getStatusBadge(t.status)}">${t.status}</span></td>
        <td><i class="fas fa-map-marker-alt text-muted mr-1"></i> ${t.plant_location}</td>
        <td>${t.creator_name} <br><small class="text-muted">${t.creator_email}</small></td>
        <td>${t.assigned_to || '<span class="text-muted">Queue</span>'}</td>
        <td>
          <button class="btn btn-xs btn-primary" onclick="quickAssign('${t.id || t.ticket_number}')"><i class="fas fa-user-check"></i> Assign</button>
          <button class="btn btn-xs btn-success" onclick="quickResolve('${t.id || t.ticket_number}')"><i class="fas fa-check"></i> Resolve</button>
        </td>
      </tr>
    `).join('');
  }

  async function quickAssign(id) {
    const tech = prompt('Enter IT Technician Name:', 'Mark Reyes (Senior SAP Analyst)');
    if (!tech) return;
    await fetch('api.php?action=update_ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, assigned_to: tech, status: 'In Progress' })
    });
    loadAdminTickets();
  }

  async function quickResolve(id) {
    const notes = prompt('Enter IT Resolution Summary:', 'Issue inspected and fixed on-site.');
    if (!notes) return;
    await fetch('api.php?action=update_ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, status: 'Resolved', resolution_notes: notes })
    });
    loadAdminTickets();
  }

  async function loadMetrics() {
    try {
      const res = await fetch('api.php?action=metrics');
      const m = await res.json();
      document.getElementById('m-total').textContent = m.total;
      document.getElementById('m-urgent').textContent = (m.urgentCount + m.highCount);
      document.getElementById('m-open').textContent = (m.openCount + m.inProgressCount);
    } catch(e) {}
  }

  function promptGoogleLogin() {
    const email = prompt('Enter your corporate @uratex.com.ph email to switch session:', 'marketing@uratex.com.ph');
    if (email) {
      if (!email.toLowerCase().endsWith('@uratex.com.ph')) {
        alert('Access Restricted: Only @uratex.com.ph Google Workspace accounts are permitted.');
        return;
      }
      document.getElementById('user-display-email').textContent = email;
      document.getElementById('t-creator-email').value = email;
    }
  }

  // Initial load
  loadTicketsTable();
</script>
</body>
</html>
