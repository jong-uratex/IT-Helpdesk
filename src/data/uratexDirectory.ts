export interface UratexDirectoryPerson {
  id: string;
  name: string;
  plantLocation: string;
  applicationRole: string;
  email: string;
  mobile?: string;
  department: string;
  departmentName: string;
  isManager?: boolean;
}

export const DIRECTORY_DATA: UratexDirectoryPerson[] = [
  { id: "DIR-001", name: "Eric Borromeo", plantLocation: "ACPO/B3", applicationRole: "Manager", email: "eric.borromeo@uratex.com.ph", mobile: "09178224595", department: "SUPPORT LUZON", departmentName: "Application Support Luzon", isManager: true },
  { id: "DIR-002", name: "Myrna Reyes", plantLocation: "ACPO/B3", applicationRole: "Sap Support", email: "myrna.reyes@uratex.com.ph", mobile: "09178002313", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-003", name: "Jezalin Mendoza", plantLocation: "ACPO/B3", applicationRole: "Sap Support", email: "jezalin.mendoza@uratex.com.ph", mobile: "09178337738", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-004", name: "Nairomie Hurtado-Mina", plantLocation: "ACPO/B3", applicationRole: "App Support POS", email: "nairomie.hurtado-mina@uratex.com.ph", mobile: "09178372951", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-005", name: "Lorie Jane Gunio", plantLocation: "ACPO/B3", applicationRole: "App Support POS", email: "loriejanegunio@uratex.com.ph", mobile: "09178449967", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-006", name: "Dhay Ann Pama", plantLocation: "ACPO/B3", applicationRole: "App Support BI/Reports", email: "dhayann.pama@uratex.com.ph", mobile: "09178314721", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-007", name: "Beth Consigo-Gilbuena", plantLocation: "ACPO/B3", applicationRole: "App Support ACUMATICA", email: "beth.consigo-gilbuena@uratex.com.ph", mobile: "09178230556", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-008", name: "Sheina Victorio", plantLocation: "ACPO/B3", applicationRole: "App Support POS", email: "sheina.victorio@uratex.com.ph", mobile: "09178435430", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-009", name: "Lovely Rayel", plantLocation: "ACPO/B3", applicationRole: "App Support BI/Reports", email: "lovely.rayel@uratex.com.ph", mobile: "09178465844", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-010", name: "Meryl Narciso", plantLocation: "Admin office/B2", applicationRole: "Sap Support", email: "meryl.narciso@uratex.com.ph", mobile: "09178219537", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-011", name: "Ghina Carla Alarcon", plantLocation: "Admin office/B2", applicationRole: "Sap Support", email: "ghinacarla.alarcon@uratex.com.ph", mobile: "09178363100", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-012", name: "Carmina Creus-Munoz", plantLocation: "Admin office/B2", applicationRole: "Sap Support", email: "carmina.creus@uratex.com.ph", mobile: "09178231029", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-013", name: "Charissa Salinas", plantLocation: "Corporate Office-MHW", applicationRole: "Sap Support", email: "charis.salinas@uratex.com.ph", mobile: "09459832705", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-014", name: "Lanie dela Cruz", plantLocation: "Corporate Office-MHW", applicationRole: "Sap Support", email: "lanie.delacruz@uratex.com.ph", mobile: "09178285816", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-015", name: "Edmar Norona", plantLocation: "Production Office-MHW", applicationRole: "Sap Support", email: "edmar.norona@uratex.com.ph", mobile: "09178305787", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-016", name: "Gladymer Asis", plantLocation: "ACPO/B3", applicationRole: "App Support BI/Reports", email: "gladymer.asis@uratex.com.ph", mobile: "09392263102", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-017", name: "Maria Luiza Padua", plantLocation: "ACPO/B3", applicationRole: "App Support", email: "marialuiza.padua@uratex.com.ph", mobile: "09458462345", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-018", name: "Claude Mar Miguel B. Capulso", plantLocation: "ACPO/B3", applicationRole: "App Support", email: "claudemarmiguel.capulso@uratex.com.ph", mobile: "09150081524", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-019", name: "Dianne Barquilla", plantLocation: "ACPO/B3", applicationRole: "App Support Finance", email: "dianne.lector@uratex.com.ph", mobile: "09296289449", department: "SUPPORT LUZON", departmentName: "Application Support Luzon" },
  { id: "DIR-020", name: "Neil Ian Corinth Caraan", plantLocation: "ACPO/B3", applicationRole: "BSA (Business System Analyst)", email: "neiliancorinth.caraan@uratex.com.ph", mobile: "09178224500", department: "BSA", departmentName: "Business System Analyst" },
  { id: "DIR-021", name: "Vienne Therese Deodores", plantLocation: "ACPO/B3", applicationRole: "BSA (Business System Analyst)", email: "viennetherese.deodores@uratex.com.ph", department: "BSA", departmentName: "Business System Analyst" },
  { id: "DIR-022", name: "Gelo Daet", plantLocation: "ACPO/B3", applicationRole: "BSA (Business System Analyst)", email: "gelo.daet@uratex.com.ph", department: "BSA", departmentName: "Business System Analyst" },
  { id: "DIR-023", name: "Llew Clarence Garcia", plantLocation: "B2/PS Office", applicationRole: "BSA (Business System Analyst)", email: "llewclarence.garcia@uratex.com.ph", department: "BSA", departmentName: "Business System Analyst" },
  { id: "DIR-024", name: "Joel Genaloc", plantLocation: "B3/ACPO", applicationRole: "Tech Luzon Specialist", email: "joel.genaloc@uratex.com.ph", department: "TECH LUZON", departmentName: "Infrastructure Luzon" },
  { id: "DIR-025", name: "Daniel Fabon", plantLocation: "B3/ACPO", applicationRole: "Tech Luzon Specialist", email: "daniel.fabon@uratex.com.ph", department: "TECH LUZON", departmentName: "Infrastructure Luzon" },
  { id: "DIR-026", name: "Aaron Bernardo", plantLocation: "Plaridel", applicationRole: "Tech Luzon Specialist", email: "aaron.bernardo@uratex.com.ph", department: "TECH LUZON", departmentName: "Infrastructure Luzon" },
  { id: "DIR-027", name: "Jameson Daryl Chua", plantLocation: "B2/Admin office", applicationRole: "Tech Luzon Specialist", email: "jamesondaryl.chua@uratex.com.ph", department: "TECH LUZON", departmentName: "Infrastructure Luzon" },
  { id: "DIR-028", name: "Arvin Hermoso", plantLocation: "B2/Admin office", applicationRole: "Tech Luzon Specialist", email: "arvin.hermoso@uratex.com.ph", department: "TECH LUZON", departmentName: "Infrastructure Luzon" },
  { id: "DIR-029", name: "Paul Brian Ramos", plantLocation: "B2/Admin office", applicationRole: "Tech Luzon Specialist", email: "paulbrian.ramos@uratex.com.ph", department: "TECH LUZON", departmentName: "Infrastructure Luzon" },
  { id: "DIR-030", name: "Joel Aquino", plantLocation: "B3/ACPO", applicationRole: "Tech Luzon Specialist", email: "joel.aquino@uratex.com.ph", department: "TECH LUZON", departmentName: "Infrastructure Luzon" },
  { id: "DIR-031", name: "Ryan Christian Banag", plantLocation: "Plaridel", applicationRole: "Tech Luzon Specialist", email: "ryanchristian.banag@uratex.com.ph", department: "TECH LUZON", departmentName: "Infrastructure Luzon" },
  { id: "DIR-032", name: "John Robert Plandez", plantLocation: "Plaridel", applicationRole: "Tech Luzon Specialist", email: "johnrobert.plandez@uratex.com.ph", department: "TECH LUZON", departmentName: "Infrastructure Luzon" },
  { id: "DIR-033", name: "Glecer Jay Pejana", plantLocation: "Cebu Plant", applicationRole: "Tech VisMin Specialist", email: "glecerjay.pejana@uratex.com.ph", department: "TECH VISMIN", departmentName: "Infrastructure VisMin" },
  { id: "DIR-034", name: "Joselito Cobaria", plantLocation: "CDO (Cagayan de Oro)", applicationRole: "Tech VisMin Specialist", email: "joselito.cobaria@uratex.com.ph", department: "TECH VISMIN", departmentName: "Infrastructure VisMin" },
  { id: "DIR-035", name: "Lemuel Villareal", plantLocation: "Cebu Plant", applicationRole: "Tech VisMin Specialist", email: "lemuel.villareal@uratex.com.ph", department: "TECH VISMIN", departmentName: "Infrastructure VisMin" },
  { id: "DIR-036", name: "Glenn Fernandez", plantLocation: "Davao Plant", applicationRole: "Tech VisMin Specialist", email: "glenn.fernandez@uratex.com.ph", department: "TECH VISMIN", departmentName: "Infrastructure VisMin" },
  { id: "DIR-037", name: "Lotchelle Briigoli", plantLocation: "Cebu Plant", applicationRole: "Sap Support (VisMin)", email: "lotchelle.briigoli@uratex.com.ph", department: "SUPPORT VISMIN", departmentName: "Application Support VisMin" },
  { id: "DIR-038", name: "Aiza Grace Ardon", plantLocation: "CDO (Cagayan de Oro)", applicationRole: "Sap Support (VisMin)", email: "aizagrace.ardon@uratex.com.ph", department: "SUPPORT VISMIN", departmentName: "Application Support VisMin" },
  { id: "DIR-DEV-01", name: "Cristopher Evangelista", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "cristopher.evangelista@uratex.com.ph", mobile: "09178175621", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-02", name: "Glenn Sicioco", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "glenn.sicioco@uratex.com.ph", mobile: "09178538648", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-03", name: "Jerome Dayao", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "jerome.dayao@uratex.com.ph", mobile: "09178423114", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-04", name: "Brando Mairina", plantLocation: "ACPO/B3, Pangasinan", applicationRole: "Software Developer (DEV)", email: "brando.mairina@uratex.com.ph", mobile: "09178436044", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-05", name: "Jhun Espinosa", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "jun.espinosa@uratex.com.ph", mobile: "09178065038", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-06", name: "Jenor Recafort", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "jenor.ricafort@uratex.com.ph", mobile: "09178538679", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-07", name: "Angelo Baclaan", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "angelo.baclaan@uratex.com.ph", mobile: "09777515155", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-08", name: "Richard del Altre", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "richarddel.altre@uratex.com.ph", mobile: "0917 846 7897", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-09", name: "Regard Diego Jr.", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "regardjr.diego@uratex.com.ph", mobile: "09178012850", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-10", name: "Erwin Patuga", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "erwin.patuga@uratex.com.ph", mobile: "09300243057", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-11", name: "Melvin Tumimbang", plantLocation: "Valenzuela", applicationRole: "Software Developer (DEV)", email: "melvin.tumimbang@uratex.com.ph", mobile: "09171442487", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-12", name: "John Christian Garon", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "johnchristian.garon@uratex.com.ph", mobile: "09171559986", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-13", name: "Carl Nathaniel Trinidad", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "carlnathaniel.trinidad@uratex.com.ph", mobile: "09182401231", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-14", name: "Raven David", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "raven.david@uratex.com.ph", mobile: "09485272118", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-15", name: "Yhaj-Nary P. Velasco", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "yhajnary.velasco@uratex.com.ph", mobile: "09612776836", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-16", name: "Lucky H. Razo", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "lucky.razo@uratex.com.ph", mobile: "09309563118", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-17", name: "Sheilla Zafra", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "sheilla.zafra@uratex.com.ph", mobile: "09564526788", department: "DEV", departmentName: "Developer" },
  { id: "DIR-DEV-18", name: "Raymond Bastasa", plantLocation: "ACPO/B3", applicationRole: "Software Developer (DEV)", email: "raymond.bastasa@uratex.com.ph", department: "DEV", departmentName: "Developer" }
];

export const AVAILABLE_MODELS = [
  {
    id: 'gemini-3.8-flash',
    name: 'gemini-3.8-flash',
    label: 'Google Gemini 3.8 Flash',
    badge: 'Primary AI',
    category: 'Google Cloud Multimodal AI',
    description: 'Primary AI engine: Google multimodal intelligence for natural IT troubleshooting, smart diagnostics, and fast multi-turn dialogue.',
    recommended: true
  },
  {
    id: 'uratex-expert-v1',
    name: 'uratex-expert-v1',
    label: 'ROBBIE Domain AI (Instant Local)',
    badge: 'Local Engine',
    category: 'Autonomous Resolution Engine',
    description: 'High-speed autonomous IT knowledge engine with all 56 Uratex personnel, SAP S/4HANA O2C, Zebra packaging line printer calibration, and Rule 7 hardware checks.'
  },
  {
    id: 'qwen2.5-coder:1.5b',
    name: 'qwen2.5-coder:1.5b',
    label: 'Qwen 2.5 Coder (1.5B) - Uratex Ollama',
    badge: 'LAN Ollama',
    category: 'SAP / Enterprise ERP',
    description: 'Lightweight on-premise model on Uratex LAN (10.0.120.202) for SAP Order-to-Cash (O2C) and script automation.'
  },
  {
    id: 'qwen2.5vl:3b',
    name: 'qwen2.5vl:3b',
    label: 'Qwen 2.5 VL (3B)',
    badge: 'Vision & OCR',
    category: 'Visual Diagnostics',
    description: 'Vision-language model for troubleshooting error screenshots, hardware photos, and barcode labels.'
  },
  {
    id: 'nemotron-mini:4b',
    name: 'nemotron-mini:4b',
    label: 'Nemotron-Mini (4B)',
    badge: 'Enterprise Helpdesk',
    category: 'General Corporate IT',
    description: 'NVIDIA-optimized fast enterprise helpdesk model for workstations, accounts, and networks.'
  },
  {
    id: 'deepseek-r1:8b',
    name: 'deepseek-r1:8b',
    label: 'DeepSeek-R1 (8B)',
    badge: 'Reasoning (CoT)',
    category: 'Complex IT Problem Solving',
    description: 'High-reasoning model for complex network diagnostics, root-cause investigation, and log analysis.'
  },
  {
    id: 'deepseek-coder-v2:16b',
    name: 'deepseek-coder-v2:16b',
    label: 'DeepSeek Coder v2 (16B)',
    badge: 'Deep IT & Architecture',
    category: 'Software & Systems',
    description: 'Heavyweight 16B parameter model for enterprise systems administration and database debugging.'
  },
  {
    id: 'codestral:latest',
    name: 'codestral:latest',
    label: 'Codestral (Mistral)',
    badge: 'Mistral Code AI',
    category: 'Automation & Scripting',
    description: 'Mistral AI high-performance code model for IT shell scripts, automation pipelines, and API integrations.'
  },
  {
    id: 'moondream:latest',
    name: 'moondream:latest',
    label: 'Moondream',
    badge: 'Edge Vision',
    category: 'Hardware Inspection',
    description: 'Lightweight visual inspection model for verifying patch cables, port connections, and LED indicators.'
  }
];

export const IT_QUICK_ACTIONS = [
  { id: 'support', label: 'Live Tech Support', prompt: 'Live Tech Support' },
  { id: 'signature', label: 'Email Signature Generator', prompt: 'How can I use this Email signature generator?' },
  { id: 'ip', label: "What's my IP Address", prompt: "What's my IP Address" },
  { id: 'kb', label: 'Keyboard / Hardware Help', prompt: 'Hi Robbie. I need help with my keyboard' },
  { id: 'sap', label: 'SAP S/4HANA Support', prompt: 'Who is the contact person for SAP Support?' },
  { id: 'o2c', label: 'Order-to-Cash (O2C)', prompt: 'What is the SAP Order-to-Cash process?' },
  { id: 'zebra', label: 'Zebra Printer Reset', prompt: 'How do I calibrate a Zebra barcode printer?' }
];

export function handleItKnowledge(message: string, ip?: string): string | null {
  const lower = (message || '').toLowerCase().trim();

  // 1. IP check
  if (lower.includes("what's my ip") || lower.includes("what is my ip") || lower === "my ip" || lower.includes("my ip address")) {
    return `🌐 **Your Detected IP Address Information**:\n\n` +
           `• Client IP: \`${ip || '127.0.0.1'}\`\n` +
           `• Network: Uratex Corporate Intranet / Edge Network\n` +
           `• Domain Controller: DC01-VAL (Active Directory)\n` +
           `• Gateway: Uratex Corporate Core Gateway\n\n` +
           `For static IP assignments or VLAN routing, please contact Tech Luzon Ext. 4401.`;
  }

  // 2. Keyboard & Mouse (Rule 7: Hardware)
  if (lower.includes("keyboard") || lower.includes("keys") || lower.includes("mouse") || lower.includes("typing") || lower.includes("numlock") || lower.includes("capslock")) {
    return `⌨️ **Keyboard & Peripheral Troubleshooting (Rule 7: Safe Hardware Check)**:\n\n` +
           `1. **Re-plug USB Connection**: Unplug your keyboard cable (or 2.4GHz wireless USB dongle) and reconnect firmly into a different USB port directly on your workstation.\n` +
           `2. **Battery & Power Check**: If you use a wireless keyboard/mouse, ensure the bottom switch is ON and replace the AA/AAA batteries.\n` +
           `3. **Key Lock Indicator**: Press \`Num Lock\` and \`Caps Lock\` to verify if the LEDs light up. If pressing letters types numbers, press \`Fn + Num Lock\`.\n` +
           `4. **Reboot Test**: Save your open files and restart your workstation (\`Win\` > Power > Restart).\n` +
           `5. **Device Manager Driver Refresh**: Right-click Start > **Device Manager** > expand *Keyboards* > right-click your keyboard > select *Uninstall device*, then click *Action > Scan for hardware changes*.\n\n` +
           `If physical liquid was spilled or keys are physically broken, call **Ext. 4401** or file a ticket below for replacement.`;
  }

  // 3. Ding quote
  if (lower.includes("ang bato") || lower.includes("bato") || lower === "ding") {
    const quotes = [
      `⚡ *"Ding, ang bato!"* — Transforming caffeine into bug-free code and 99.9% network uptime! Keep conquering the workday!`,
      `🛡️ *"Ding, ang bato!"* — To battle against printer jams, BSODs, and forgotten passwords! Stand firm, Tech Warrior!`,
      `🚀 *"Ding, ang bato!"* — No glitch is too big for the Uratex IT Ninjas! Have you rebooted before you panic? Power on!`,
      `🌟 *"Ding, ang bato!"* — Great software isn't just written, it is built with resilience and grit. Let's finish today strong!`
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }

  // 4. Live tech support
  if (lower === "live tech support" || (lower.includes("tech support") && lower.length < 25)) {
    return `📞 **Uratex Live IT Tech Support Contacts**:\n\n` +
           `• **Help Desk Local Ext:** \`4401\`\n` +
           `• **Support Manager:** Eric Borromeo (\`0917-822-4595\` / \`eric.borromeo@uratex.com.ph\`)\n` +
           `• **Tech Luzon Specialists:** Joel Genaloc, Daniel Fabon, Aaron Bernardo\n` +
           `• **Tech VisMin Specialists:** Glecer Jay Pejana (Cebu), Joselito Cobaria (CDO), Glenn Fernandez (Davao)\n\n` +
           `You can also search our full IT Staff Directory in the left panel.`;
  }

  // 5. Uratex Email Signature Generator
  if (lower.includes('signature') || lower.includes('email signature') || lower.includes('generator') || lower.includes('email-signature')) {
    return `✉️ **How to Use the Uratex Email Signature Generator (https://email-signature-4ti.pages.dev)**:\n\n` +
           `1. **Fill out User Information**: Enter your Full Name, Job Title, Department, Contact Number, and official Uratex email address in the form.\n` +
           `2. **Select Company Entity & Office Address**: Choose your affiliate (e.g., \`MULTIFLEX RNC PHILS., INC.\`) and official Plant / Office location from dropdowns.\n` +
           `3. **Check Live Preview**: Confirm that your name, Uratex branding logo, and Data Privacy Act (NPC) disclaimer render properly.\n` +
           `4. **Click "COPY SIGNATURE"**: Click the green **Copy Signature** button above the preview box.\n` +
           `5. **Paste in Your Email Client**:\n` +
           `   • **Gmail / Google Workspace**: Go to Settings (⚙️) > *See all settings* > *General* > scroll down to *Signature* > paste (\`Ctrl + V\`) > Save Changes.\n` +
           `   • **Outlook Desktop / M365**: File > Options > Mail > *Signatures* > paste and set as default.\n\n` +
           `_Note: Please do not manually remove the official Data Privacy Act disclaimer from your signature._`;
  }

  // 6. Order-to-Cash (O2C) Knowledge
  if (lower.includes('o2c') || lower.includes('order to cash') || lower.includes('va01') || lower.includes('vf01') || lower.includes('sales order')) {
    return `📦 **Uratex Order-to-Cash (O2C) Enterprise Knowledge**:\n\n` +
           `• **Order-to-Cash (O2C) Lifecycle**:\n` +
           `   1. **Sales Order Creation**: Transaction \`VA01\` / \`VA02\` (Verify customer PO, sales area, pricing conditions).\n` +
           `   2. **Credit Limit Check**: Credit block management via \`VKM1\` / \`VKM3\` and Business Partner (\`BP\` / \`FD32\`).\n` +
           `   3. **Availability & Scheduling (ATP)**: Check plant stock and foam production availability (\`CO09\`).\n` +
           `   4. **Outbound Delivery**: Transaction \`VL01N\` / \`VL02N\` with picking, packing, & Post Goods Issue (\`PGI\`).\n` +
           `   5. **Billing & Invoicing**: Billing document generation via \`VF01\` / \`VF02\` & accounting interface (\`F-28\`).\n\n` +
           `• **Key Plants**: Valenzuela HQ, Muntinlupa, Plaridel, Canlubang, Cebu, Davao.\n` +
           `• **Need Escalation?**: Contact our SAP Business System Analysts (BSA) or file a ticket below.`;
  }

  // 7. SAP inquiry
  if (lower.includes('sap') || lower.includes('s/4hana')) {
    return `📊 **SAP S/4HANA & App Support Team**:\n\n` +
           `• **Manager:** Eric Borromeo (\`eric.borromeo@uratex.com.ph\` / \`0917-822-4595\`)\n` +
           `• **Luzon SAP Support:** Myrna Reyes, Jezalin Mendoza, Meryl Narciso, Ghina Carla Alarcon, Carmina Creus-Munoz, Charissa Salinas, Lanie dela Cruz, Edmar Norona\n` +
           `• **VisMin SAP Support:** Lotchelle Briigoli (Cebu), Aiza Grace Ardon (CDO)\n\n` +
           `For urgent t-code locks or posting errors, please contact your plant SAP representative or submit a ticket to escalate immediately.`;
  }

  // 8. VPN
  if (lower.includes('vpn') || lower.includes('cisco') || lower.includes('forticlient')) {
    return `🔐 **Uratex VPN Quick Troubleshooting (Cisco AnyConnect / FortiClient)**:\n\n` +
           `1. Verify your local internet connection is active and stable.\n` +
           `2. Gateway: \`vpn.uratex.com.ph\`\n` +
           `3. Username: Use your standard Active Directory / @uratex.com.ph username.\n` +
           `4. If receiving 'Login Failed' or token timeout, verify password has not expired on DC01-VAL domain.\n` +
           `5. Restart the VPN client service from task manager if session hangs.\n\n` +
           `Reach out to Tech Luzon Ext. 4401 or file a support ticket below if a password/token reset is required.`;
  }

  // 9. Printer
  if (lower.includes('printer') || lower.includes('zebra') || lower.includes('barcode')) {
    return `🖨️ **Printer & Zebra Barcode Troubleshooting**:\n\n` +
           `1. Check power supply, network patch cable, and ribbon feed alignment.\n` +
           `2. **Zebra Calibration**: Perform sensor calibration by pressing and holding FEED + CANCEL (or hold FEED until status LED flashes once).\n` +
           `3. **Print Spooler**: Restart Windows Print Spooler service (\`Win + R\` -> \`services.msc\` -> Print Spooler -> Restart).\n` +
           `4. Check media sensor for dust or adhesive residue.\n\n` +
           `For physical hardware maintenance or ribbon replacement, file a ticket to alert your plant IT technician.`;
  }

  // 10. Tech Department Inquiry
  if (lower.includes('tech department') || lower.includes('it department') || lower.includes('tech team') || lower.includes('talk to in the tech') || lower.includes('talked to in the tech')) {
    const techStaff = DIRECTORY_DATA.filter(p => (p.department || '').includes('TECH') || (p.departmentName || '').includes('Infrastructure'));
    let reply = `💻 **Uratex Tech Infrastructure Department Contacts**:\n\n` +
                `You can reach out to our dedicated Tech Infrastructure Specialists:\n\n`;
    for (const item of techStaff.slice(0, 5)) {
      reply += `• **${item.name}** — ${item.applicationRole || 'Tech Specialist'} (${item.plantLocation})\n` +
               `  Email: \`${item.email}\`${item.mobile ? ` | Mobile: \`${item.mobile}\`` : ''}\n`;
    }
    reply += `\nFor immediate escalation or phone dispatch, contact the **Uratex IT Help Desk at Local Ext. 4401** or Support Manager **Eric Borromeo** (\`0917-822-4595\`).`;
    return reply.trim();
  }

  // 11. Directory Search
  const searchTerms = ['who is', 'contact for', 'email of', 'phone of', 'mobile of', 'dev', 'developer', 'bsa', 'manager', 'cebu', 'cdo', 'davao', 'plaridel', 'valenzuela', 'talk to', 'talked to', 'speak to', 'reach out', 'contact'];
  if (searchTerms.some(t => lower.includes(t))) {
    const q = lower
      .replace(/who is|contact for|email of|phone of|mobile of|please|tell me about|in the|who are the members of the|who can i talked to|who can i talk to|who can i speak to|who can i contact/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();

    const matched = DIRECTORY_DATA.filter(p => {
      const name = (p.name || '').toLowerCase();
      const role = (p.applicationRole || '').toLowerCase();
      const dept = (p.departmentName || p.department || '').toLowerCase();
      const plant = (p.plantLocation || '').toLowerCase();
      const email = (p.email || '').toLowerCase();

      const words = q.split(/\s+/).filter(w => w.length > 2);
      const matchesWords = words.length > 0 && words.some(w => name.includes(w) || role.includes(w) || dept.includes(w));

      return name.includes(q) || role.includes(q) || dept.includes(q) || plant.includes(q) || email.includes(q) || matchesWords;
    });

    if (matched.length > 0) {
      const count = Math.min(4, matched.length);
      let reply = `🔍 **Uratex IT Directory Search Results (${matched.length} found):**\n\n`;
      for (let i = 0; i < count; i++) {
        const item = matched[i];
        reply += `**${item.name}**\n` +
                 `• Role: ${item.applicationRole || 'IT Staff'}\n` +
                 `• Dept: ${item.departmentName || item.department}\n` +
                 `• Location: ${item.plantLocation}\n` +
                 `• Email: \`${item.email}\`\n` +
                 (item.mobile ? `• Mobile: \`${item.mobile}\`\n` : '') + `\n`;
      }
      if (matched.length > count) {
        reply += `_...and ${matched.length - count} more matching staff. Check the IT Staff Directory tab to view all personnel._`;
      }
      return reply.trim();
    }
  }

  return null;
}
