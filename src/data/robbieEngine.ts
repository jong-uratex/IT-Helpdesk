import { DIRECTORY_DATA, UratexDirectoryPerson } from './uratexDirectory';
import { TicketCategory, TicketPriority } from '../types';

export interface RobbieResolution {
  reply: string;
  shouldEscalate: boolean;
  suggestedTicket?: {
    title: string;
    category: TicketCategory;
    priority: TicketPriority;
    summary: string;
  };
  engine: string;
}

export function resolveWithRobbieEngine(
  message: string,
  history: Array<{ sender: string; text: string }> = [],
  userName: string = 'Employee',
  ip: string = '127.0.0.1'
): RobbieResolution {
  const rawMsg = (message || '').trim();
  const lower = rawMsg.toLowerCase();
  const firstName = userName.split(' ')[0] || 'Employee';

  // 1. Explicit Human Assistance or Ticket Request
  const explicitHumanKeywords = [
    'human',
    'agent',
    'technician',
    'live agent',
    'live person',
    'real person',
    'representative',
    'file a ticket',
    'file ticket',
    'create a ticket',
    'create ticket',
    'submit a ticket',
    'submit ticket',
    'raise a ticket',
    'open a ticket',
    'escalate',
    'escalate this',
    'call it',
    'talk to it',
    'speak to someone',
    'talk to someone',
    'talk to a person',
    'speak with a human',
    'speak to a human',
    'contact support',
    'help desk phone',
  ];

  if (explicitHumanKeywords.some((k) => lower.includes(k))) {
    return {
      reply: `I understand, ${firstName}. I have prepared an official Uratex IT support ticket for you so our technician on duty can take over immediately.\n\nClick **Create Support Ticket** below to submit this request directly to our IT Help Desk (Local Ext. 4401 / Eric Borromeo: 0917-822-4595).`,
      shouldEscalate: true,
      suggestedTicket: {
        title: `IT Support Assistance Request — ${firstName}`,
        category: 'Hardware & Peripherals',
        priority: 'Medium',
        summary: `Employee requested direct human technician support: "${rawMsg}"`,
      },
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 2. Pure Greetings ONLY (No technical problem or topic mentioned)
  const topicKeywords = [
    'keyboard',
    'mouse',
    'keys',
    'typing',
    'numlock',
    'capslock',
    'vpn',
    'forticlient',
    'cisco',
    'anyconnect',
    'sap',
    's/4hana',
    'o2c',
    'order to cash',
    'va01',
    'va02',
    'vkm1',
    'co09',
    'printer',
    'zebra',
    'barcode',
    'label',
    'outlook',
    'm365',
    'email',
    'signature',
    'password',
    'login',
    'account',
    'monitor',
    'screen',
    'wifi',
    'wi-fi',
    'network',
    'internet',
    'slow',
    'freeze',
    'hang',
    'who is',
    'contact',
    'phone',
    'specialist',
    'issue',
    'problem',
    'help with',
    'error',
    'broken',
    'repair',
    'replace',
    'fix',
  ];

  const hasTechnicalTopic = topicKeywords.some((w) => lower.includes(w));

  const isGreetingWord =
    /^(hello|hi|hey|good\s*(morning|afternoon|evening|day)|kamusta|musta|greetings|hola)\b/i.test(lower) ||
    lower === 'hello robbie' ||
    lower === 'hi robbie' ||
    lower === 'hey robbie';

  if (isGreetingWord && !hasTechnicalTopic) {
    return {
      reply: `Hello ${firstName}! 👋 I am **ROBBIE** (*Resolution Oriented Bot for Business and IT Efficiency*), your dedicated Uratex Philippines IT Helpdesk AI Assistant.\n\n` +
             `I am ready to help resolve technical issues across Uratex plants and offices:\n` +
             `• **Workstations & Keyboards (Rule 7)**: Typing numbers instead of letters (Fn+NumLock), stuck keys, driver reinstall\n` +
             `• **FortiClient & Cisco AnyConnect VPN**: Gateway \`vpn.uratex.com.ph\`, DNS flush, tunnel drop\n` +
             `• **SAP S/4HANA & Order-to-Cash (O2C)**: VA01, VKM1 credit clearance, CO09 stock availability, locks, timeouts\n` +
             `• **Zebra Barcode & Label Printers**: Packaging Lines 1–6 media calibration (FEED+CANCEL) and ribbon fixes\n` +
             `• **Microsoft 365 & Outlook**: SSPR password reset (\`aka.ms/sspr\`), cached exchange mode\n` +
             `• **Official Email Signature Generator**: Link to \`email-signature-4ti.pages.dev\` and setup guide\n` +
             `• **IT Staff Directory**: Lookup 56 IT staff across Luzon & VisMin\n\n` +
             `What technical issue can I help you resolve today?`,
      shouldEscalate: false,
      engine: 'ROBBIE Domain AI (Uratex Autonomous Engine)',
    };
  }

  // 3. User indicates troubleshooting failed / persistent issue (Escalate after failed self-service)
  const persistentFailureKeywords = [
    'still not working',
    'did not work',
    "didn't work",
    'tried that already',
    'already tried that',
    'same error',
    'still failing',
    'does not work',
    "doesn't work",
    'still broken',
    'still slow',
    'not resolved',
    'it failed',
    'nothing happened',
  ];

  if (persistentFailureKeywords.some((k) => lower.includes(k))) {
    return {
      reply: `Thank you for testing those troubleshooting steps, ${firstName}. Since the issue persists after standard self-service, this requires direct investigation by our IT Support / Systems team.\n\nI have drafted a high-priority support ticket for you below. Click **Create Support Ticket** to immediately alert our technicians on duty.`,
      shouldEscalate: true,
      suggestedTicket: {
        title: `Persistent Technical Issue — ${rawMsg.slice(0, 50)}`,
        category: 'Hardware & Peripherals',
        priority: 'High',
        summary: `Standard self-service troubleshooting was unsuccessful. Employee reports: "${rawMsg}"`,
      },
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 4. Physical Damage or Hardware Safety Danger (Immediate Escalation)
  const physicalDamageKeywords = [
    'swollen',
    'swelling',
    'smoke',
    'smoking',
    'spark',
    'sparking',
    'burnt',
    'burning',
    'water spill',
    'liquid spill',
    'spilled water',
    'spilled coffee',
    'cracked screen',
    'broken screen',
    'dropped laptop',
    'shattered',
  ];

  if (physicalDamageKeywords.some((k) => lower.includes(k))) {
    return {
      reply: `⚠️ **SAFETY ALERT**: For physical hardware hazards (battery swelling, liquid spills, or electrical issues):\n\n1. **Immediately disconnect the AC power charger**.\n2. **Shut down the workstation immediately** to prevent electrical short-circuiting.\n3. Do not attempt to charge or press swollen chassis components.\n\nI am escalating this immediately as a **Critical** hardware ticket so an on-site technician can inspect or replace your equipment.`,
      shouldEscalate: true,
      suggestedTicket: {
        title: `Physical Hardware Alert: ${rawMsg.slice(0, 55)}`,
        category: 'Hardware & Peripherals',
        priority: 'Critical',
        summary: `Physical damage or safety hazard reported by ${firstName}: "${rawMsg}". Requires urgent on-site hardware inspection.`,
      },
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 5. Question is Too Hard for AI Training / Beyond Automated Tier 1-2 Scope
  const beyondTrainingKeywords = [
    'abap dump',
    'kernel panic',
    'cx_sy_',
    'syntax error in custom report',
    'database corruption',
    'ora-00600',
    'bgp routing flap',
    'core switch stack failure',
    'plc logic error',
    'solder',
    'motherboard chip',
    'firmware reflash',
    'active directory schema',
  ];

  if (beyondTrainingKeywords.some((k) => lower.includes(k))) {
    return {
      reply: `⚠️ **SPECIALIZED ENGINEERING ESCALATION**:\n\nThe issue you described (**"${rawMsg}"**) involves specialized low-level backend architecture, core infrastructure, or custom code that exceeds standard AI helpdesk training.\n\nTo prevent data corruption, production downtime, or unauthorized schema modifications, this requires direct assignment to our **Tier 3 Senior Technical Specialists / SAP Basis & DEV team**.\n\nI have pre-populated a High-Priority Technical Ticket for you below. Click **Create Support Ticket** to dispatch to our senior engineers.`,
      shouldEscalate: true,
      suggestedTicket: {
        title: `Tier 3 Engineering Escalation: ${rawMsg.slice(0, 60)}`,
        category: lower.includes('abap') || lower.includes('sap') ? 'SAP / ERP System' : 'Network & VPN',
        priority: 'High',
        summary: `Issue exceeded automated self-service training. User reported: "${rawMsg}"`,
      },
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 5. Zebra Barcode & Packaging Line Printers
  if (
    lower.includes('zebra') ||
    lower.includes('barcode') ||
    lower.includes('label printer') ||
    (lower.includes('printer') && (lower.includes('skip') || lower.includes('calibrate') || lower.includes('ribbon') || lower.includes('feed')))
  ) {
    return {
      reply: `🖨️ **Zebra Industrial Barcode Printer Troubleshooting (Packaging Lines 1–6)**:\n\n` +
             `1. **Media Sensor Calibration**:\n` +
             `   • Ensure media (labels) and ribbon are properly threaded through the sensor.\n` +
             `   • Press and hold the **FEED + CANCEL** buttons together for 2 seconds (or hold **FEED** until the status LED flashes once green), then release.\n` +
             `   • The printer will feed several blank labels to calibrate label gap sensors.\n\n` +
             `2. **Sensor & Head Cleaning**:\n` +
             `   • Power OFF the printer.\n` +
             `   • Open the printhead mechanism and gently wipe the thermal printhead and transmissive sensor with a 99% isopropanol alcohol swab to remove adhesive residue.\n\n` +
             `3. **Windows Print Spooler Refresh**:\n` +
             `   • Press \`Win + R\` > type \`services.msc\` > press Enter.\n` +
             `   • Right-click **Print Spooler** > select **Restart**.\n\n` +
             `Did this recalibrate your labels, or would you like me to dispatch an on-site technician to your packaging line?`,
      shouldEscalate: false,
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 6. SAP ERP & Order-to-Cash (O2C)
  if (
    lower.includes('sap') ||
    lower.includes('s/4hana') ||
    lower.includes('o2c') ||
    lower.includes('order to cash') ||
    lower.includes('va01') ||
    lower.includes('va02') ||
    lower.includes('vf01') ||
    lower.includes('vkm1') ||
    lower.includes('co09') ||
    lower.includes('plant 1000') ||
    lower.includes('plant 2000') ||
    lower.includes('batch confirmation')
  ) {
    // If it mentions lock, timeout, or authorization error
    if (lower.includes('timeout') || lower.includes('lock') || lower.includes('authoriz') || lower.includes('permission') || lower.includes('dump')) {
      return {
        reply: `📊 **SAP ERP Session & Lock Troubleshooting**:\n\n` +
               `1. **Session Timeout / Work Process Delay**:\n` +
               `   • Close duplicate SAP GUI windows and log out completely via transaction \`/nend\`.\n` +
               `   • Reopen **SAP Logon 770** and log back into the production instance (\`PRD\`).\n\n` +
               `2. **Batch / Table Locks (SM12)**:\n` +
               `   • If a sales order or production batch is locked by your user ID, a previous disconnected session may still hold the lock.\n` +
               `   • Wait 5 minutes for automatic rollback, or contact SAP Support to release the lock.\n\n` +
               `3. **Key Contacts**:\n` +
               `   • **Manager**: Eric Borromeo (\`eric.borromeo@uratex.com.ph\` / \`0917-822-4595\`)\n` +
               `   • **Luzon SAP**: Myrna Reyes, Jezalin Mendoza, Meryl Narciso, Ghina Carla Alarcon\n` +
               `   • **VisMin SAP**: Lotchelle Briigoli (Cebu), Aiza Grace Ardon (CDO)\n\n` +
               `If you need an SAP Basis admin to reset your session immediately, click **Request Human Assistance** below!`,
        shouldEscalate: false,
        engine: 'Uratex Intelligent IT Engine',
      };
    }

    return {
      reply: `📦 **Uratex SAP Order-to-Cash (O2C) & Application Guide**:\n\n` +
             `• **O2C Process Flow & Standard Transactions**:\n` +
             `   1. **Sales Order Entry**: Transaction \`VA01\` / \`VA02\` (Verify customer purchase order, distribution channel, pricing conditions).\n` +
             `   2. **Credit Limit Clearance**: Credit block review via \`VKM1\` / \`VKM3\` and Business Partner (\`BP\` / \`FD32\`).\n` +
             `   3. **ATP Stock Availability**: Check plant inventory and foam production schedule via \`CO09\`.\n` +
             `   4. **Outbound Delivery**: Transaction \`VL01N\` / \`VL02N\` with picking, packing, & Post Goods Issue (\`PGI\`).\n` +
             `   5. **Billing & Invoicing**: Generate billing document via \`VF01\` / \`VF02\` & financial interface (\`F-28\`).\n\n` +
             `• **Plant Support**: Plant 1 (Valenzuela ACPO), Plant 2 (Laguna), Plaridel, Cebu, CDO, Davao.\n\n` +
             `Are you encountering a specific error code or transaction timeout?`,
      shouldEscalate: false,
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 7. VPN & Network Connectivity
  if (
    lower.includes('vpn') ||
    lower.includes('forticlient') ||
    lower.includes('cisco') ||
    lower.includes('anyconnect') ||
    lower.includes('disconnect') ||
    lower.includes('wifi') ||
    lower.includes('wi-fi') ||
    lower.includes('ethernet') ||
    lower.includes('network') ||
    lower.includes('internet')
  ) {
    return {
      reply: `🔐 **Uratex Corporate VPN & Network Resolution Steps**:\n\n` +
             `1. **VPN Gateway Verification**:\n` +
             `   • Ensure the gateway address is configured to: \`vpn.uratex.com.ph\`\n` +
             `   • Sign in with your official Active Directory credentials (\`username@uratex.com.ph\`).\n\n` +
             `2. **Tunnel Drop / Disconnection Fix**:\n` +
             `   • Right-click FortiClient / Cisco AnyConnect in your Windows system tray > select **Disconnect**.\n` +
             `   • Press \`Win + R\` > type \`cmd\` > run: \`ipconfig /flushdns\`\n` +
             `   • Reconnect to \`vpn.uratex.com.ph\`.\n\n` +
             `3. **Account / Password Check**:\n` +
             `   • If getting "Authentication Failed" or "Permission Denied", your domain password may have expired on **DC01-VAL**.\n` +
             `   • Contact Tech Luzon Ext. 4401 or Joel Genaloc for an Active Directory password sync.\n\n` +
             `If your connection still drops after flushing DNS, click **Request Human Assistance** to file a network ticket!`,
      shouldEscalate: false,
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 8. Workstation, Keyboard & Mouse (Rule 7 Hardware)
  if (
    lower.includes('keyboard') ||
    lower.includes('keys') ||
    lower.includes('mouse') ||
    lower.includes('typing') ||
    lower.includes('numlock') ||
    lower.includes('capslock') ||
    lower.includes('monitor') ||
    lower.includes('screen') ||
    lower.includes('workstation') ||
    lower.includes('computer slow') ||
    lower.includes('freezing') ||
    lower.includes('hang')
  ) {
    const isKeyboard =
      lower.includes('keyboard') ||
      lower.includes('keys') ||
      lower.includes('typing') ||
      lower.includes('numlock') ||
      lower.includes('capslock');

    if (isKeyboard) {
      return {
        reply: `Hello ${firstName}! 👋 I can definitely help resolve your **keyboard** issue right away.\n\n` +
               `Here are the verified troubleshooting steps for Uratex workstations:\n\n` +
               `1. **NumLock / Letters Typing Numbers (Most Common Issue)**:\n` +
               `   • If pressing letters (such as U, I, O, J, K, L) outputs numbers (4, 5, 6, 1, 2, 3), your integrated numeric keypad is locked on.\n` +
               `   • Press **Fn + Num Lock** (or **Fn + F11 / F12** depending on your laptop model) to toggle it back to letter mode.\n\n` +
               `2. **Direct Motherboard USB Port Swap (Rule 7 Check)**:\n` +
               `   • If an external keyboard is unresponsive or lagging, unplug the USB cable (or 2.4GHz wireless dongle) and plug it directly into a USB 3.0 port on the back or side of the workstation.\n` +
               `   • **Rule 7 Rule**: Avoid unpowered USB multiport hubs or loose front-panel extensions.\n\n` +
               `3. **Wireless Battery & Power Switch**:\n` +
               `   • Ensure the power switch on the bottom of the keyboard is set to **ON**.\n` +
               `   • Replace the AAA/AA batteries if keys are lagging or skipping characters.\n\n` +
               `4. **Device Manager Driver Refresh**:\n` +
               `   • Press \`Win + X\` > click **Device Manager** > expand **Keyboards**.\n` +
               `   • Right-click your keyboard device (*Standard PS/2 Keyboard* or *HID Keyboard Device*) > select **Uninstall device**.\n` +
               `   • At the top menu, click **Action > Scan for hardware changes** to cleanly reinstall the driver.\n\n` +
               `5. **Workstation Restart**:\n` +
               `   • Save all open documents and restart your workstation to clear stuck keyboard buffer interrupts.\n\n` +
               `Are specific physical keys broken, or did these steps restore your typing? (If physical keys or liquid was spilled, click **Request Human Assistance** at the top right to file for a hardware replacement).`,
        shouldEscalate: false,
        engine: 'ROBBIE Domain AI (Uratex Autonomous Engine)',
      };
    }

    return {
      reply: `Hello ${firstName}! 👋 I can help you troubleshoot your **workstation / peripheral** issue:\n\n` +
             `1. **Mouse / Trackpad Lag or Freezing**:\n` +
             `   • For wireless mice: check the optical sensor lens underneath for dust/lint, and verify fresh AA/AAA batteries.\n` +
             `   • Reconnect the USB receiver dongle directly into a primary USB 3.0 port.\n\n` +
             `2. **Display / Monitor No Signal**:\n` +
             `   • Firmly reseat both the HDMI/DisplayPort cable and the monitor power cable.\n` +
             `   • Press \`Win + P\` to cycle display modes (choose **Duplicate** or **Extend**).\n\n` +
             `3. **Workstation Freezing / Unresponsive**:\n` +
             `   • Press \`Ctrl + Shift + Esc\` to launch **Task Manager** and check for processes with 100% CPU or Memory utilization.\n` +
             `   • Perform a safe system reboot.\n\n` +
             `Did this resolve the issue on your workstation?`,
      shouldEscalate: false,
      engine: 'ROBBIE Domain AI (Uratex Autonomous Engine)',
    };
  }

  // 9. Uratex Email Signature Generator
  if (
    lower.includes('signature') ||
    lower.includes('email signature') ||
    lower.includes('generator') ||
    lower.includes('email-signature')
  ) {
    return {
      reply: `✉️ **How to Use the Official Uratex Email Signature Generator**:\n\n` +
             `Link: **https://email-signature-4ti.pages.dev**\n\n` +
             `1. **Fill Out Your Profile**:\n` +
             `   • Enter your Full Name, Job Title, Department, Mobile number, and official \`@uratex.com.ph\` email.\n\n` +
             `2. **Select Affiliate & Plant Location**:\n` +
             `   • Choose your company entity (e.g. \`MULTIFLEX RNC PHILS., INC.\`) and plant location from dropdowns.\n\n` +
             `3. **Copy Signature**:\n` +
             `   • Check the live preview, then click the green **COPY SIGNATURE** button.\n\n` +
             `4. **Set Up in Gmail / Outlook**:\n` +
             `   • **Gmail / Google Workspace**: Settings (⚙️) > *See all settings* > *General* > scroll to *Signature* > paste (\`Ctrl + V\`) > click *Save Changes*.\n` +
             `   • **Outlook Desktop / M365**: File > Options > Mail > *Signatures* > paste and set as default.\n\n` +
             `_Note: Company policy requires keeping the NPC Data Privacy Act disclaimer attached to all official emails._`,
      shouldEscalate: false,
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 10. Microsoft 365, Outlook, Teams & SSPR Password Reset
  if (
    lower.includes('outlook') ||
    lower.includes('m365') ||
    lower.includes('office 365') ||
    lower.includes('teams') ||
    lower.includes('mailbox') ||
    lower.includes('password') ||
    lower.includes('reset password') ||
    lower.includes('forgot password') ||
    lower.includes('mfa') ||
    lower.includes('authenticator')
  ) {
    return {
      reply: `📧 **Microsoft 365, Outlook & Password Self-Service**:\n\n` +
             `1. **Self-Service Password Reset (SSPR)**:\n` +
             `   • Go to **https://aka.ms/sspr** from any browser or your mobile phone.\n` +
             `   • Enter your \`@uratex.com.ph\` email and verify via Microsoft Authenticator or SMS code.\n\n` +
             `2. **Outlook Search & Sync Cache Fix**:\n` +
             `   • If Outlook desktop is not displaying recent emails, verify the status bar says "Connected to Microsoft Exchange".\n` +
             `   • In Outlook: File > Account Settings > Account Settings > Double-click your account > ensure "Cached Exchange Mode" is enabled.\n\n` +
             `3. **Shared Mailbox Permissions**:\n` +
             `   • Access to shared mailboxes (e.g. \`logistics.laguna@uratex.com.ph\`) must be requested via an IT ticket approved by your department manager.\n\n` +
             `Do you need assistance resetting your password, or would you like to submit a permissions ticket?`,
      shouldEscalate: false,
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 11. What is my IP address
  if (
    lower.includes("what's my ip") ||
    lower.includes('what is my ip') ||
    lower === 'my ip' ||
    lower.includes('my ip address')
  ) {
    return {
      reply: `🌐 **Your Detected IP Address & Network Information**:\n\n` +
             `• **Client IP**: \`${ip || '127.0.0.1'}\`\n` +
             `• **Network Environment**: Uratex Corporate Intranet / Edge Network\n` +
             `• **Domain Controller**: \`DC01-VAL\` (Active Directory)\n` +
             `• **Core Gateway**: Uratex Core Corporate Firewall\n\n` +
             `For static IP reservations, VLAN switching, or switch port patching, contact Tech Luzon Local Ext. 4401.`,
      shouldEscalate: false,
      engine: 'Uratex Intelligent IT Engine',
    };
  }

  // 12. Directory Search & Specialist Lookups
  const directorySearchTerms = [
    'who is',
    'contact for',
    'email of',
    'phone of',
    'mobile of',
    'contact person',
    'who can i contact',
    'who can i speak to',
    'who can i talk to',
    'specialist',
    'developer',
    'support staff',
  ];

  if (directorySearchTerms.some((t) => lower.includes(t)) || lower.includes('eric borromeo') || lower.includes('joel genaloc')) {
    const q = lower
      .replace(/who is|contact for|email of|phone of|mobile of|please|tell me about|in the|who are the members of the|who can i talked to|who can i talk to|who can i speak to|who can i contact|specialist/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();

    const matched = DIRECTORY_DATA.filter((p) => {
      const name = (p.name || '').toLowerCase();
      const role = (p.applicationRole || '').toLowerCase();
      const dept = (p.departmentName || p.department || '').toLowerCase();
      const plant = (p.plantLocation || '').toLowerCase();
      const email = (p.email || '').toLowerCase();

      const words = q.split(/\s+/).filter((w) => w.length > 2);
      const matchesWords = words.length > 0 && words.some((w) => name.includes(w) || role.includes(w) || dept.includes(w));

      return name.includes(q) || role.includes(q) || dept.includes(q) || plant.includes(q) || email.includes(q) || matchesWords;
    });

    if (matched.length > 0) {
      const count = Math.min(3, matched.length);
      let reply = `🔍 **Uratex IT Directory Results (${matched.length} found)**:\n\n`;
      for (let i = 0; i < count; i++) {
        const item = matched[i];
        reply += `**${item.name}**\n` +
                 `• **Role**: ${item.applicationRole || 'IT Staff'}\n` +
                 `• **Department**: ${item.departmentName || item.department}\n` +
                 `• **Plant / Location**: ${item.plantLocation}\n` +
                 `• **Email**: \`${item.email}\`\n` +
                 (item.mobile ? `• **Mobile**: \`${item.mobile}\`\n` : '') + `\n`;
      }
      if (matched.length > count) {
        reply += `_Check the **IT Staff Directory** tab on the left panel to browse all ${DIRECTORY_DATA.length} team members._`;
      }
      return {
        reply: reply.trim(),
        shouldEscalate: false,
        engine: 'Uratex Intelligent IT Engine',
      };
    }
  }

  // 13. General Conversational / Contextual AI Response
  return {
    reply: `I understand, ${firstName}. Regarding **"${rawMsg}"**:\n\n` +
           `1. **Self-Service Checks**:\n` +
           `   • Verify that your network connection is active (VPN: \`vpn.uratex.com.ph\`).\n` +
           `   • Save any open documents and perform a clean application restart.\n` +
           `   • If this is an SAP error, confirm your user authorization on the target plant.\n\n` +
           `2. **Immediate Assistance**:\n` +
           `   • You can contact the **Uratex IT Help Desk at Local Ext. 4401** or Support Manager **Eric Borromeo** (\`0917-822-4595\`).\n\n` +
           `If this requires technical hands-on support, click **Request Human Help** at the top right of this chat to file a support ticket immediately!`,
    shouldEscalate: false,
    engine: 'Uratex Intelligent IT Engine',
  };
}
