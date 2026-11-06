/**
 * Cloudflare Pages Functions - Shared Data & Execution Engine for E.L.L.I.E.
 * Works natively in Cloudflare Workers V8 environment with zero Node.js dependencies.
 */

export const DIRECTORY_DATA = [
  { "id": "DIR-001", "name": "Eric Borromeo", "plantLocation": "ACPO/B3", "applicationRole": "Manager", "email": "eric.borromeo@uratex.com.ph", "mobile": "09178224595", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon", "isManager": true },
  { "id": "DIR-002", "name": "Myrna Reyes", "plantLocation": "ACPO/B3", "applicationRole": "Sap Support", "email": "myrna.reyes@uratex.com.ph", "mobile": "09178002313", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-003", "name": "Jezalin Mendoza", "plantLocation": "ACPO/B3", "applicationRole": "Sap Support", "email": "jezalin.mendoza@uratex.com.ph", "mobile": "09178337738", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-004", "name": "Nairomie Hurtado-Mina", "plantLocation": "ACPO/B3", "applicationRole": "App Support POS", "email": "nairomie.hurtado-mina@uratex.com.ph", "mobile": "09178372951", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-005", "name": "Lorie Jane Gunio", "plantLocation": "ACPO/B3", "applicationRole": "App Support POS", "email": "loriejanegunio@uratex.com.ph", "mobile": "09178449967", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-006", "name": "Dhay Ann Pama", "plantLocation": "ACPO/B3", "applicationRole": "App Support BI/Reports", "email": "dhayann.pama@uratex.com.ph", "mobile": "09178314721", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-007", "name": "Beth Consigo-Gilbuena", "plantLocation": "ACPO/B3", "applicationRole": "App Support ACUMATICA", "email": "beth.consigo-gilbuena@uratex.com.ph", "mobile": "09178230556", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-008", "name": "Sheina Victorio", "plantLocation": "ACPO/B3", "applicationRole": "App Support POS", "email": "sheina.victorio@uratex.com.ph", "mobile": "09178435430", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-009", "name": "Lovely Rayel", "plantLocation": "ACPO/B3", "applicationRole": "App Support BI/Reports", "email": "lovely.rayel@uratex.com.ph", "mobile": "09178465844", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-010", "name": "Meryl Narciso", "plantLocation": "Admin office/B2", "applicationRole": "Sap Support", "email": "meryl.narciso@uratex.com.ph", "mobile": "09178219537", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-011", "name": "Ghina Carla Alarcon", "plantLocation": "Admin office/B2", "applicationRole": "Sap Support", "email": "ghinacarla.alarcon@uratex.com.ph", "mobile": "09178363100", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-012", "name": "Carmina Creus-Munoz", "plantLocation": "Admin office/B2", "applicationRole": "Sap Support", "email": "carmina.creus@uratex.com.ph", "mobile": "09178231029", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-013", "name": "Charissa Salinas", "plantLocation": "Corporate Office-MHW", "applicationRole": "Sap Support", "email": "charis.salinas@uratex.com.ph", "mobile": "09459832705", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-014", "name": "Lanie dela Cruz", "plantLocation": "Corporate Office-MHW", "applicationRole": "Sap Support", "email": "lanie.delacruz@uratex.com.ph", "mobile": "09178285816", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-015", "name": "Edmar Norona", "plantLocation": "Production Office-MHW", "applicationRole": "Sap Support", "email": "edmar.norona@uratex.com.ph", "mobile": "09178305787", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-016", "name": "Gladymer Asis", "plantLocation": "ACPO/B3", "applicationRole": "App Support BI/Reports", "email": "gladymer.asis@uratex.com.ph", "mobile": "09392263102", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-017", "name": "Maria Luiza Padua", "plantLocation": "ACPO/B3", "applicationRole": "App Support", "email": "marialuiza.padua@uratex.com.ph", "mobile": "09458462345", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-018", "name": "Claude Mar Miguel B. Capulso", "plantLocation": "ACPO/B3", "applicationRole": "App Support", "email": "claudemarmiguel.capulso@uratex.com.ph", "mobile": "09150081524", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-019", "name": "Dianne Barquilla", "plantLocation": "ACPO/B3", "applicationRole": "App Support Finance", "email": "dianne.lector@uratex.com.ph", "mobile": "09296289449", "department": "SUPPORT LUZON", "departmentName": "Application Support Luzon" },
  { "id": "DIR-020", "name": "Neil Ian Corinth Caraan", "plantLocation": "ACPO/B3", "applicationRole": "BSA (Business System Analyst)", "email": "neiliancorinth.caraan@uratex.com.ph", "mobile": "09178224500", "department": "BSA", "departmentName": "Business System Analyst" },
  { "id": "DIR-021", "name": "Vienne Therese Deodores", "plantLocation": "ACPO/B3", "applicationRole": "BSA (Business System Analyst)", "email": "viennetherese.deodores@uratex.com.ph", "department": "BSA", "departmentName": "Business System Analyst" },
  { "id": "DIR-022", "name": "Gelo Daet", "plantLocation": "ACPO/B3", "applicationRole": "BSA (Business System Analyst)", "email": "gelo.daet@uratex.com.ph", "department": "BSA", "departmentName": "Business System Analyst" },
  { "id": "DIR-023", "name": "Llew Clarence Garcia", "plantLocation": "B2/PS Office", "applicationRole": "BSA (Business System Analyst)", "email": "llewclarence.garcia@uratex.com.ph", "department": "BSA", "departmentName": "Business System Analyst" },
  { "id": "DIR-024", "name": "Joel Genaloc", "plantLocation": "B3/ACPO", "applicationRole": "Tech Luzon Specialist", "email": "joel.genaloc@uratex.com.ph", "department": "TECH LUZON", "departmentName": "Infrastructure Luzon" },
  { "id": "DIR-025", "name": "Daniel Fabon", "plantLocation": "B3/ACPO", "applicationRole": "Tech Luzon Specialist", "email": "daniel.fabon@uratex.com.ph", "department": "TECH LUZON", "departmentName": "Infrastructure Luzon" },
  { "id": "DIR-026", "name": "Aaron Bernardo", "plantLocation": "Plaridel", "applicationRole": "Tech Luzon Specialist", "email": "aaron.bernardo@uratex.com.ph", "department": "TECH LUZON", "departmentName": "Infrastructure Luzon" },
  { "id": "DIR-027", "name": "Jameson Daryl Chua", "plantLocation": "B2/Admin office", "applicationRole": "Tech Luzon Specialist", "email": "jamesondaryl.chua@uratex.com.ph", "department": "TECH LUZON", "departmentName": "Infrastructure Luzon" },
  { "id": "DIR-028", "name": "Arvin Hermoso", "plantLocation": "B2/Admin office", "applicationRole": "Tech Luzon Specialist", "email": "arvin.hermoso@uratex.com.ph", "department": "TECH LUZON", "departmentName": "Infrastructure Luzon" },
  { "id": "DIR-029", "name": "Paul Brian Ramos", "plantLocation": "B2/Admin office", "applicationRole": "Tech Luzon Specialist", "email": "paulbrian.ramos@uratex.com.ph", "department": "TECH LUZON", "departmentName": "Infrastructure Luzon" },
  { "id": "DIR-030", "name": "Joel Aquino", "plantLocation": "B3/ACPO", "applicationRole": "Tech Luzon Specialist", "email": "joel.aquino@uratex.com.ph", "department": "TECH LUZON", "departmentName": "Infrastructure Luzon" },
  { "id": "DIR-031", "name": "Ryan Christian Banag", "plantLocation": "Plaridel", "applicationRole": "Tech Luzon Specialist", "email": "ryanchristian.banag@uratex.com.ph", "department": "TECH LUZON", "departmentName": "Infrastructure Luzon" },
  { "id": "DIR-032", "name": "John Robert Plandez", "plantLocation": "Plaridel", "applicationRole": "Tech Luzon Specialist", "email": "johnrobert.plandez@uratex.com.ph", "department": "TECH LUZON", "departmentName": "Infrastructure Luzon" },
  { "id": "DIR-033", "name": "Glecer Jay Pejana", "plantLocation": "Cebu Plant", "applicationRole": "Tech VisMin Specialist", "email": "glecerjay.pejana@uratex.com.ph", "department": "TECH VISMIN", "departmentName": "Infrastructure VisMin" },
  { "id": "DIR-034", "name": "Joselito Cobaria", "plantLocation": "CDO (Cagayan de Oro)", "applicationRole": "Tech VisMin Specialist", "email": "joselito.cobaria@uratex.com.ph", "department": "TECH VISMIN", "departmentName": "Infrastructure VisMin" },
  { "id": "DIR-035", "name": "Lemuel Villareal", "plantLocation": "Cebu Plant", "applicationRole": "Tech VisMin Specialist", "email": "lemuel.villareal@uratex.com.ph", "department": "TECH VISMIN", "departmentName": "Infrastructure VisMin" },
  { "id": "DIR-036", "name": "Glenn Fernandez", "plantLocation": "Davao Plant", "applicationRole": "Tech VisMin Specialist", "email": "glenn.fernandez@uratex.com.ph", "department": "TECH VISMIN", "departmentName": "Infrastructure VisMin" },
  { "id": "DIR-037", "name": "Lotchelle Briigoli", "plantLocation": "Cebu Plant", "applicationRole": "Sap Support (VisMin)", "email": "lotchelle.briigoli@uratex.com.ph", "department": "SUPPORT VISMIN", "departmentName": "Application Support VisMin" },
  { "id": "DIR-038", "name": "Aiza Grace Ardon", "plantLocation": "CDO (Cagayan de Oro)", "applicationRole": "Sap Support (VisMin)", "email": "aizagrace.ardon@uratex.com.ph", "department": "SUPPORT VISMIN", "departmentName": "Application Support VisMin" },
  { "id": "DIR-DEV-01", "name": "Cristopher Evangelista", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "cristopher.evangelista@uratex.com.ph", "mobile": "09178175621", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-02", "name": "Glenn Sicioco", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "glenn.sicioco@uratex.com.ph", "mobile": "09178538648", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-03", "name": "Jerome Dayao", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "jerome.dayao@uratex.com.ph", "mobile": "09178423114", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-04", "name": "Brando Mairina", "plantLocation": "ACPO/B3, Pangasinan", "applicationRole": "Software Developer (DEV)", "email": "brando.mairina@uratex.com.ph", "mobile": "09178436044", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-05", "name": "Jhun Espinosa", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "jun.espinosa@uratex.com.ph", "mobile": "09178065038", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-06", "name": "Jenor Recafort", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "jenor.ricafort@uratex.com.ph", "mobile": "09178538679", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-07", "name": "Angelo Baclaan", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "angelo.baclaan@uratex.com.ph", "mobile": "09777515155", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-08", "name": "Richard del Altre", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "richarddel.altre@uratex.com.ph", "mobile": "0917 846 7897", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-09", "name": "Regard Diego Jr.", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "regardjr.diego@uratex.com.ph", "mobile": "09178012850", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-10", "name": "Erwin Patuga", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "erwin.patuga@uratex.com.ph", "mobile": "09300243057", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-11", "name": "Melvin Tumimbang", "plantLocation": "Valenzuela", "applicationRole": "Software Developer (DEV)", "email": "melvin.tumimbang@uratex.com.ph", "mobile": "09171442487", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-12", "name": "John Christian Garon", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "johnchristian.garon@uratex.com.ph", "mobile": "09171559986", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-13", "name": "Carl Nathaniel Trinidad", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "carlnathaniel.trinidad@uratex.com.ph", "mobile": "09182401231", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-14", "name": "Raven David", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "raven.david@uratex.com.ph", "mobile": "09485272118", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-15", "name": "Yhaj-Nary P. Velasco", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "yhajnary.velasco@uratex.com.ph", "mobile": "09612776836", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-16", "name": "Lucky H. Razo", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "lucky.razo@uratex.com.ph", "mobile": "09309563118", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-17", "name": "Sheilla Zafra", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "sheilla.zafra@uratex.com.ph", "mobile": "09564526788", "department": "DEV", "departmentName": "Developer" },
  { "id": "DIR-DEV-18", "name": "Raymond Bastasa", "plantLocation": "ACPO/B3", "applicationRole": "Software Developer (DEV)", "email": "raymond.bastasa@uratex.com.ph", "department": "DEV", "departmentName": "Developer" }
];

export const AVAILABLE_MODELS = [
  {
    id: 'qwen2.5-coder:1.5b',
    name: 'qwen2.5-coder:1.5b',
    label: 'Qwen 2.5 Coder (1.5B)',
    badge: 'Order-to-Cash',
    category: 'SAP / Enterprise ERP',
    description: 'Specialized lightweight model for SAP Order-to-Cash (O2C), SD billing, sales orders & IT automation.',
    recommended: true
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

export const SYSTEM_PROMPT = `You are E.L.L.I.E. (Employee Link for Learning, Information & IT Essentials), the official IT Helpdesk Assistant of Uratex (RGC Group of Companies).
Your tone is friendly, respectful, empathetic, and professional, blending clear English with natural conversational Tagalog (Taglish).
You assist employees with computer workstations, keyboards, mice, printers, SAP S/4HANA (including Order-to-Cash / O2C), Microsoft 365, Cisco AnyConnect VPN, and the Uratex Email Signature Generator.
Always maintain data privacy and direct critical escalations to Uratex IT Help Desk Ext. 4401 or Eric Borromeo (0917-822-4595).`;

export function handleItKnowledge(message, ip) {
  const lower = (message || '').toLowerCase().trim();

  // 1. IP check
  if (lower.includes("what's my ip") || lower.includes("what is my ip") || lower === "my ip" || lower.includes("my ip address")) {
    return `🌐 **Your Detected IP Address Information**:\n\n` +
           `• Client IP: \`${ip || '127.0.0.1'}\`\n` +
           `• Network: Uratex Corporate Intranet / Cloudflare Edge\n` +
           `• Domain Controller: DC01-VAL (Active Directory)\n` +
           `• Gateway: Uratex Corporate Core Gateway\n\n` +
           `For static IP assignments or VLAN routing, please contact Tech Luzon Ext. 4401.`;
  }

  // 1.1 Qwen / Ollama status check
  if (lower.includes("is qwen live") || lower.includes("is ollama live") || lower.includes("model status") || lower === "check ai") {
    return `⚡ **E.L.L.I.E. Model Connectivity Status**:\n\n` +
           `• **Target Model**: \`qwen2.5-coder:1.5b\` (Uratex SAP O2C)\n` +
           `• **Configured Server**: \`http://10.0.120.202:11434\`\n` +
           `• **Network Notice**: \`10.0.120.202\` is an internal LAN IP address.\n` +
           `• **Cloudflare Status**: Because this chatbot is hosted on Cloudflare Pages (\`ellie-chatbot.pages.dev\`), Cloudflare's public cloud servers cannot route directly into the private internal \`10.x.x.x\` intranet without a **Cloudflare Tunnel** (\`cloudflared\`) or public reverse proxy.\n\n` +
           `💡 _To enable live Qwen inference from Cloudflare, route your Ollama port via a Cloudflare Tunnel or provide a public URL._`;
  }

  // 2. Keyboard & Mouse (Rule 7: Hardware)
  if (lower.includes("keyboard") || lower.includes("keys") || lower.includes("mouse") || lower.includes("typing") || lower.includes("numlock") || lower.includes("capslock")) {
    return `⌨️ **Keyboard & Peripheral Troubleshooting (Rule 7: Safe Hardware Check)**:\n\n` +
           `1. **Re-plug USB Connection**: Unplug your keyboard cable (or 2.4GHz wireless USB dongle) and firmly reconnect it into a different USB port directly on your workstation.\n` +
           `2. **Battery & Power Check**: If you use a wireless keyboard/mouse, ensure the bottom power switch is ON and replace the AA/AAA batteries.\n` +
           `3. **Key Lock Indicator**: Press \`Num Lock\` and \`Caps Lock\` to verify if the status indicator LEDs light up. If pressing letters types numbers, press \`Fn + Num Lock\`.\n` +
           `4. **Reboot Test**: Save your open files and restart your workstation (\`Win\` > Power > Restart).\n` +
           `5. **Device Manager Driver Refresh**: Right-click Start > **Device Manager** > expand *Keyboards* > right-click your keyboard > select *Uninstall device*, then click *Action > Scan for hardware changes*.\n\n` +
           `If physical liquid was spilled or keys are physically damaged, call **Ext. 4401** or contact your plant IT support for a replacement.`;
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
           `Would you like me to look up contact info for someone specific?`;
  }

  // 5. Uratex Email Signature Generator (Rule 12)
  if (lower.includes('signature') || lower.includes('email signature') || lower.includes('generator') || lower.includes('email-signature')) {
    return `✉️ **How to Use the Uratex Email Signature Generator (https://email-signature-4ti.pages.dev)**:\n\n` +
           `1. **Fill out User Information**: Enter your Full Name, Job Title, Department, Contact Number, and official Uratex email address in the form.\n` +
           `2. **Select Company Entity & Office Address**: Choose your affiliate (e.g., \`MULTIFLEX RNC PHILS., INC.\`) and official Plant / Office location from the dropdowns.\n` +
           `3. **Check Live Preview**: Confirm that your name, Uratex branding logo, and Data Privacy Act (NPC) disclaimer render properly in the live preview.\n` +
           `4. **Click "COPY SIGNATURE"**: Click the green **Copy Signature** button above the preview box.\n` +
           `5. **Paste in Your Email Client**:\n` +
           `   • **Gmail / Google Workspace**: Go to Settings (⚙️) > *See all settings* > *General* > scroll down to *Signature* > paste (\`Ctrl + V\`) > Save Changes.\n` +
           `   • **Outlook Desktop / M365**: File > Options > Mail > *Signatures* > paste and set as default for new messages.\n\n` +
           `_Note: Please do not manually remove the official Data Privacy Act disclaimer from your signature._`;
  }

  // 6. Order-to-Cash (O2C) Knowledge
  if (lower.includes('ellie') && (lower.includes('o2c') || lower.includes('order to cash') || lower.includes('va01') || lower.includes('vf01') || lower.includes('sales order'))) {
    return `📦 **E.L.L.I.E. • Uratex Order-to-Cash (O2C) Enterprise Assistant**:\n\n` +
           `• **Order-to-Cash (O2C) Lifecycle**:\n` +
           `   1. **Sales Order Creation**: Transaction \`VA01\` / \`VA02\` (Verify customer PO, sales area, pricing conditions).\n` +
           `   2. **Credit Limit Check**: Credit block management via \`VKM1\` / \`VKM3\` and Business Partner (\`BP\` / \`FD32\`).\n` +
           `   3. **Availability & Scheduling (ATP)**: Check plant stock and foam production availability (\`CO09\`).\n` +
           `   4. **Outbound Delivery**: Transaction \`VL01N\` / \`VL02N\` with picking, packing, & Post Goods Issue (\`PGI\`).\n` +
           `   5. **Billing & Invoicing**: Billing document generation via \`VF01\` / \`VF02\` & accounting interface (\`F-28\`).\n\n` +
           `• **Plant Locations**: Valenzuela HQ, Muntinlupa, Plaridel, Canlubang, Cebu, Davao.\n` +
           `• **Need Escalation?**: Contact our SAP Business System Analysts (BSA) or Help Desk Ext. 4401.`;
  }

  // 7. SAP inquiry
  if (lower.includes('sap') || lower.includes('s/4hana')) {
    return `📊 **SAP S/4HANA & App Support Team**:\n\n` +
           `• **Manager:** Eric Borromeo (\`eric.borromeo@uratex.com.ph\`)\n` +
           `• **Luzon SAP Support:** Myrna Reyes, Jezalin Mendoza, Meryl Narciso, Ghina Carla Alarcon, Carmina Creus-Munoz, Charissa Salinas, Lanie dela Cruz, Edmar Norona\n` +
           `• **VisMin SAP Support:** Lotchelle Briigoli (Cebu), Aiza Grace Ardon (CDO)\n\n` +
           `For urgent t-code locks or posting errors, please contact your plant SAP representative or Help Desk Ext. 4401.`;
  }

  // 8. VPN
  if (lower.includes('vpn') || lower.includes('cisco')) {
    return `🔐 **Cisco AnyConnect VPN Quick Troubleshooting**:\n\n` +
           `1. Verify internet connectivity is stable.\n` +
           `2. Server Gateway: \`vpn.uratex.com.ph\`\n` +
           `3. Username: Use your standard Active Directory username.\n` +
           `4. If receiving 'Login Failed', verify password has not expired on DC01-VAL domain.\n` +
           `Reach out to Tech Luzon Ext. 4401 if token reset is required.`;
  }

  // 9. Printer
  if (lower.includes('printer') || lower.includes('zebra') || lower.includes('barcode')) {
    return `🖨️ **Printer & Zebra Barcode Troubleshooting**:\n\n` +
           `1. Check power supply, network patch cable, and ribbon feed alignment.\n` +
           `2. For Zebra printers: Perform sensor calibration by pressing and holding Feed until the status LED flashes once.\n` +
           `3. Restart Windows Print Spooler service (\`Win + R\` -> \`services.msc\` -> Print Spooler -> Restart).\n` +
           `For physical hardware replacement, call your plant IT technician.`;
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
        reply += `_...and ${matched.length - count} more matching staff. You can filter by name, plant, or specialization._`;
      }
      return reply.trim();
    }
  }

  return null;
}

// In-edge memory session store
const edgeSessions = new Map();

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Session-Id',
  'Access-Control-Max-Age': '86400',
};

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders
    }
  });
}

export function optionsResponse() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
}

/**
 * Universal Handler for all Cloudflare Pages Functions requests
 */
export async function handleCloudflareRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return optionsResponse();
  }

  const url = new URL(request.url);
  const actionParam = url.searchParams.get('action');
  const pathClean = url.pathname.replace(/^\/api\/?/, '').replace(/\.php$/, '');
  const action = (actionParam || pathClean || 'ping').toLowerCase();

  const clientIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1';

  // 1. PING
  if (action === 'ping' || url.pathname.endsWith('/ping')) {
    return jsonResponse({
      status: 'online',
      service: 'E.L.L.I.E. Cloudflare Pages Edge Engine',
      environment: 'Cloudflare Pages Functions (V8 Edge)',
      version: '3.2.0-cloudflare',
      host: url.hostname,
      timestamp: Date.now(),
      capabilities: ['edge_functions', 'directory_search', 'rule_engine', 'gemini_edge_ai', 'ollama_proxy', 'session_persistence']
    });
  }

  // 2. DIAGNOSTICS & TEST AI
  if (action === 'test_ai' || action === 'test-ai' || url.pathname.endsWith('/test-ai') || action === 'check_config' || action === 'diagnostics' || url.pathname.endsWith('/check-config')) {
    let body = {};
    if (request.method === 'POST') {
      try {
        const text = await request.text();
        if (text) body = JSON.parse(text);
      } catch (e) {}
    }

    const testUrl = (body.url || url.searchParams.get('url') || env.OLLAMA_API_URL || 'http://10.0.120.202:11434/v1/chat/completions').trim();
    const testKey = (body.key || url.searchParams.get('key') || env.OLLAMA_API_KEY || 'uratex_corp_it_jwt_token_auth_2026').trim();
    const testModel = (body.model || url.searchParams.get('model') || env.OLLAMA_MODEL || 'qwen2.5-coder:1.5b').trim();
    const hasGemini = !!env.GEMINI_API_KEY;

    let parsedHost = '';
    let parsedPort = 11434;
    try {
      const u = new URL(testUrl);
      parsedHost = u.hostname;
      parsedPort = u.port || (u.protocol === 'https:' ? 443 : 80);
    } catch (e) {
      parsedHost = testUrl;
    }

    const isPrivateIp = parsedHost.startsWith('10.') || 
                        parsedHost.startsWith('192.168.') || 
                        parsedHost.startsWith('172.16.') || 
                        parsedHost.startsWith('172.17.') || 
                        parsedHost.startsWith('172.18.') || 
                        parsedHost.startsWith('172.19.') || 
                        parsedHost.startsWith('172.2') || 
                        parsedHost.startsWith('172.3') || 
                        parsedHost === 'localhost' || 
                        parsedHost === '127.0.0.1';

    const isCloudflarePages = url.hostname.includes('pages.dev') || url.hostname.includes('workers.dev');

    const startTime = Date.now();
    let reachable = false;
    let httpStatus = 0;
    let probeError = null;
    let latencyMs = 0;
    let responseSample = null;
    let errorCategory = 'unknown';

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const testRes = await fetch(testUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${testKey}`
        },
        body: JSON.stringify({
          model: testModel,
          messages: [{ role: 'user', content: 'ping' }],
          stream: false
        }),
        signal: controller.signal
      });
      clearTimeout(timer);
      latencyMs = Date.now() - startTime;
      httpStatus = testRes.status;

      if (testRes.ok) {
        reachable = true;
        errorCategory = 'success';
        try {
          const data = await testRes.json();
          responseSample = data.choices?.[0]?.message?.content || data.message?.content || 'Model responded successfully';
        } catch (e) {
          responseSample = 'HTTP 200 OK received';
        }
      } else {
        const errorText = await testRes.text().catch(() => '');
        probeError = `HTTP ${testRes.status}: ${errorText.substring(0, 150) || testRes.statusText}`;
        if (httpStatus === 401 || httpStatus === 403) {
          errorCategory = 'auth_error';
        } else if (httpStatus === 404) {
          errorCategory = 'model_not_found';
        } else {
          errorCategory = 'http_error';
        }
      }
    } catch (e) {
      latencyMs = Date.now() - startTime;
      probeError = e.message || 'Connection failed / timed out';
      if (isPrivateIp && isCloudflarePages) {
        errorCategory = 'private_ip_cloud_mismatch';
      } else if (e.name === 'AbortError' || probeError.includes('abort') || probeError.includes('timeout')) {
        errorCategory = 'timeout';
      } else {
        errorCategory = 'connection_refused';
      }
    }

    let explanation = '';
    let solutionSteps = [];

    if (errorCategory === 'private_ip_cloud_mismatch') {
      explanation = `Your app is hosted on Cloudflare Pages (${url.hostname}), but the target URL (${testUrl}) points to an internal LAN IP (${parsedHost}). Public cloud servers cannot reach internal IP addresses behind your corporate firewall without a tunnel.`;
      solutionSteps = [
        'Run Cloudflare Tunnel on the Ollama host (10.0.120.202): "cloudflared tunnel --url http://localhost:11434"',
        'Assign a public hostname (e.g. https://ollama.uratex.com.ph or a trycloudflare tunnel domain)',
        'Update OLLAMA_API_URL in Cloudflare Pages environment variables to that public tunnel URL',
        'Alternatively, set GEMINI_API_KEY in Cloudflare Pages for instant Cloud AI fallback'
      ];
    } else if (errorCategory === 'timeout') {
      explanation = `The request to ${testUrl} timed out after ${latencyMs}ms. The server did not respond.`;
      solutionSteps = [
        'Verify that the Ollama host (10.0.120.202) is powered on and reachable on the network',
        'Check that port 11434 is allowed in your local/host firewall',
        'If testing from outside the office, connect to Cisco AnyConnect VPN (vpn.uratex.com.ph)'
      ];
    } else if (errorCategory === 'model_not_found') {
      explanation = `The Ollama server is reachable, but model "${testModel}" was not found (HTTP 404).`;
      solutionSteps = [
        `Run "ollama pull ${testModel}" on the host server (10.0.120.202)`,
        'Run "ollama list" to verify all downloaded models on that machine',
        'Select a model from the list that is already pulled'
      ];
    } else if (errorCategory === 'auth_error') {
      explanation = `The server returned HTTP ${httpStatus} Unauthorized. The API key was rejected.`;
      solutionSteps = [
        'Check if an API gateway or reverse proxy in front of Ollama requires a specific JWT or Bearer token',
        'Verify OLLAMA_API_KEY matches the reverse proxy configuration'
      ];
    } else if (errorCategory === 'success') {
      explanation = `Successfully connected to Ollama! Model "${testModel}" responded in ${latencyMs}ms.`;
      solutionSteps = ['All systems operational! Real-time AI inference is active.'];
    } else {
      explanation = `Could not connect to Ollama: ${probeError}`;
      solutionSteps = [
        'Verify Ollama is running with "OLLAMA_HOST=0.0.0.0:11434 ollama serve"',
        'Verify network connectivity between this client and the host'
      ];
    }

    return jsonResponse({
      success: true,
      platform: 'Cloudflare Pages Functions',
      timestamp: Date.now(),
      config: {
        OLLAMA_API_URL: testUrl,
        OLLAMA_API_KEY: testKey ? `${testKey.substring(0, 10)}...${testKey.substring(testKey.length - 4)}` : 'not_set',
        OLLAMA_MODEL: testModel,
        targetHost: parsedHost,
        targetPort: parsedPort,
        isPrivateIp,
        isCloudflarePages,
        hasGeminiKey: hasGemini
      },
      diagnostics: {
        reachable,
        httpStatus,
        latencyMs,
        error: probeError,
        errorCategory,
        explanation,
        solutionSteps,
        responseSample,
        cloudFallback: hasGemini ? 'Gemini Cloud AI (Edge Active)' : 'Intelligent Rule Engine (Active)',
        networkSummary: isPrivateIp && isCloudflarePages
          ? 'Cloudflare Edge to Private LAN: Cannot route directly without Cloudflare Tunnel.'
          : (reachable ? 'Connected and operational.' : 'Unreachable.')
      }
    });
  }

  // 3. MODELS
  if (action === 'models' || action === 'get_models' || url.pathname.endsWith('/models')) {
    return jsonResponse({
      success: true,
      currentModel: env.OLLAMA_MODEL || 'qwen2.5-coder:1.5b',
      models: AVAILABLE_MODELS
    });
  }

  // 4. SESSION
  if (action === 'session' || action === 'get_session' || action === 'clear_session' || url.pathname.endsWith('/session')) {
    const sid = url.searchParams.get('sessionId') || request.headers.get('x-session-id') || 'default';
    if (request.method === 'DELETE' || action === 'clear_session') {
      edgeSessions.delete(sid);
      return jsonResponse({ success: true, message: 'Session cleared successfully', sessionId: sid });
    }
    const sess = edgeSessions.get(sid) || { sessionId: sid, history: [], createdAt: Date.now() };
    return jsonResponse({
      success: true,
      sessionId: sid,
      history: sess.history || [],
      restored: (sess.history || []).length > 0,
      createdAt: sess.createdAt,
      updatedAt: sess.updatedAt || Date.now()
    });
  }

  // 5. DIRECTORY
  if (action === 'directory' || url.pathname.endsWith('/directory')) {
    const q = (url.searchParams.get('q') || url.searchParams.get('query') || '').toLowerCase().trim();
    const filtered = q ? DIRECTORY_DATA.filter(p => {
      return (p.name || '').toLowerCase().includes(q) ||
             (p.applicationRole || '').toLowerCase().includes(q) ||
             (p.departmentName || p.department || '').toLowerCase().includes(q) ||
             (p.plantLocation || '').toLowerCase().includes(q);
    }) : DIRECTORY_DATA;
    return jsonResponse({ success: true, count: filtered.length, results: filtered });
  }

  // 6. QUICK ACTIONS
  if (action === 'quick_actions' || action === 'quick-actions' || url.pathname.endsWith('/quick-actions')) {
    return jsonResponse({
      success: true,
      actions: [
        { id: 'support', label: 'Live Tech Support', icon: 'fa-headset', prompt: 'Live Tech Support' },
        { id: 'signature', label: 'Email Signature Generator', icon: 'fa-signature', prompt: 'How can I use this Email signature generator?' },
        { id: 'ip', label: "What's my IP Address", icon: 'fa-network-wired', prompt: "What's my IP Address" },
        { id: 'kb', label: 'Keyboard / Hardware Help', icon: 'fa-keyboard', prompt: 'Hi Ellie. I need help with my keyboard' },
        { id: 'sap', label: 'SAP S/4HANA Support', icon: 'fa-database', prompt: 'Who is the contact person for SAP Support?' },
        { id: 'o2c', label: 'Order-to-Cash (O2C)', icon: 'fa-box', prompt: 'What is the SAP Order-to-Cash process?' }
      ]
    });
  }

  // 7. PROMPTS CSV
  if (action === 'prompts' || url.pathname.endsWith('/prompts')) {
    const csvData = `id,category,name,role,content,is_active,description,updated_at
SYSTEM_MAIN,system,E.L.L.I.E. Core Persona,system,"You are E.L.L.I.E. (Employee Link for Learning, Information & IT Essentials), the friendly and dependable AI IT Helpdesk Assistant for Uratex Philippines.",true,Master system identity,2026-10-27
RULE_1_IT_SCOPE,rule,Rule 1: IT Support Scope,system,"Only provide assistance related to workplace IT, computers, software, networks, email, printers, accounts, and approved Uratex business systems.",true,Scope of support,2026-10-27
RULE_2_WORKFLOW,rule,Rule 2: Troubleshooting Workflow,system,"When an employee reports a technical problem, provide safe, reversible troubleshooting steps starting with simplest checks.",true,Safe troubleshooting steps,2026-10-27
RULE_3_ACCOUNTS,rule,Rule 3: Account and Password Assistance,system,"Help employees with general account sign-in and password-reset using approved procedures.",true,Security protocol,2026-10-27
RULE_4_CYBERSECURITY,rule,Rule 4: Cybersecurity and Phishing Protection,system,"Help employees recognize suspicious emails, links, and phishing attempts.",true,Phishing protection,2026-10-27
RULE_5_NETWORK_VPN,rule,Rule 5: Network and VPN Troubleshooting,system,"Assist with Wi-Fi, Ethernet, internet access, and Cisco AnyConnect VPN (vpn.uratex.com.ph).",true,Network & VPN,2026-10-27
RULE_6_EMAIL_APPS,rule,Rule 6: Email and Productivity Applications,system,"Provide guidance for Microsoft 365, Outlook, and Teams.",true,M365 guidance,2026-10-27
RULE_7_HARDWARE_PRINTER,rule,Rule 7: Hardware and Printer Support,system,"Help employees troubleshoot workplace computers, peripherals, and Zebra printers.",true,Hardware & printer,2026-10-27
RULE_8_SAP_APPS,rule,Rule 8: SAP and Business Application Support,system,"Assist with SAP S/4HANA and business applications.",true,SAP support,2026-10-27
RULE_9_ESCALATION,rule,Rule 9: IT Escalation and Service Requests,system,"Recommend escalation to Uratex IT Helpdesk Local Ext. 4401 when required.",true,Escalation workflow,2026-10-27
RULE_10_SECURITY,rule,Rule 10: Response Quality and Information Security,system,"Keep responses friendly, professional, and secure.",true,Confidentiality,2026-10-27
RULE_11_URIE_O2C,rule,Rule 11: URIE Order-to-Cash (O2C) Capability,system,"Provide expert guidance on SAP SD sales orders (VA01/VA02), ATP stock checks (CO09), and billing (VF01/VF02).",true,Order-to-Cash,2026-10-27
RULE_12_EMAIL_SIGNATURE,rule,Rule 12: Uratex Email Signature Generator,system,"Guide employees through the Uratex Email Signature Generator (https://email-signature-4ti.pages.dev).",true,Official email signature generator setup instructions,2026-10-28`;
    return jsonResponse({ success: true, csv: csvData });
  }

  // 8. CODE FILES VIEWER
  if (action === 'files' || url.pathname.endsWith('/files')) {
    const file = (url.searchParams.get('file') || '').replace(/\.\.\//g, '');
    let content = `// Cloudflare Pages compatibility source for ${file}\n// File is maintained in your GitHub repository and built to Cloudflare Pages edge.`;
    if (file === 'wrangler.toml') {
      content = `name = "ellie-chatbot"\ncompatibility_date = "2024-11-01"\ncompatibility_flags = ["nodejs_compat"]\npages_build_output_dir = "dist"`;
    } else if (file === 'public/_redirects') {
      content = `/index.php   /            301\n/public/*    /:splat      200\n/api/*       /api/:splat  200\n/*           /index.html  200`;
    }
    return new Response(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        ...corsHeaders
      }
    });
  }

  // 7. CHAT MESSAGE (POST)
  if (action === 'chat' || action === 'send_message' || url.pathname.endsWith('/chat') || url.pathname.endsWith('/api.php') || url.pathname.endsWith('/api')) {
    let body = {};
    if (request.method === 'POST') {
      try {
        const text = await request.text();
        if (text) body = JSON.parse(text);
      } catch (e) {
        body = {};
      }
    }

    const message = (body.message || url.searchParams.get('message') || '').trim();
    const sid = body.sessionId || request.headers.get('x-session-id') || ('cf_' + Date.now().toString(36));
    const model = body.model || env.OLLAMA_MODEL || 'qwen2.5-coder:1.5b';

    if (!message) {
      return jsonResponse({ error: 'Message cannot be empty' }, 400);
    }

    let session = edgeSessions.get(sid);
    if (!session) {
      session = { sessionId: sid, history: [], createdAt: Date.now() };
      edgeSessions.set(sid, session);
    }

    const userMsg = {
      id: 'msg_' + Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: message,
      timestamp: Math.floor(Date.now() / 1000)
    };
    session.history.push(userMsg);

    let replyText = '';

    // Step A: Fast path internal IT rules & directory
    const fastReply = handleItKnowledge(message, clientIp);
    if (fastReply) {
      replyText = fastReply;
    } else {
      // Step B: Attempt Ollama if configured
      const ollamaUrl = env.OLLAMA_API_URL || 'http://10.0.120.202:11434/v1/chat/completions';
      const ollamaKey = env.OLLAMA_API_KEY || 'uratex_corp_it_jwt_token_auth_2026';

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 1500);

        const ollamaRes = await fetch(ollamaUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ollamaKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...session.history.slice(-6).map(h => ({ role: h.role, content: h.content }))
            ],
            stream: false,
            temperature: 0.7
          }),
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (ollamaRes.ok) {
          const data = await ollamaRes.json();
          if (data.choices && data.choices[0]?.message?.content) {
            replyText = data.choices[0].message.content.trim();
          } else if (data.message?.content) {
            replyText = data.message.content.trim();
          }
        }
      } catch (ollamaErr) {
        // Ollama offline / intranet
      }

      // Step C: Cloudflare Edge Gemini API Call
      const geminiApiKey = env.GEMINI_API_KEY || '';
      if (!replyText && geminiApiKey) {
        for (const geminiModel of ['gemini-2.5-flash', 'gemini-2.5-flash-lite']) {
          try {
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`;
            const geminiRes = await fetch(geminiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                systemInstruction: {
                  parts: [{ text: SYSTEM_PROMPT }]
                },
                contents: [
                  {
                    role: 'user',
                    parts: [{ text: message }]
                  }
                ],
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 800
                }
              })
            });

            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              const candidate = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
              if (candidate) {
                replyText = candidate.trim();
                break;
              }
            }
          } catch (geminiErr) {
            // Try next candidate
          }
        }
      }

      // Step D: Rule-based fallback
      if (!replyText) {
        const nonItWords = ['nba', 'basketball', 'movie', 'cooking', 'recipe', 'girlfriend', 'boyfriend', 'politics', 'sports', 'gossip'];
        if (nonItWords.some(w => message.toLowerCase().includes(w))) {
          replyText = `Hello po! I am E.L.L.I.E. (Employee Link for Learning, Information & IT Essentials), your Uratex IT Helpdesk Assistant. As company policy, I specialize in workplace IT support such as computers, passwords, accounts, M365, networks, VPN, printers, and SAP. How can I assist you with your tech issue today?`;
        } else {
          replyText = `Hello po! I am E.L.L.I.E., your Uratex IT Helpdesk Assistant. I received your inquiry: "${message}".\n\n` +
                      `For immediate technical support, you can reach out to our **Uratex IT Help Desk at Local Ext. 4401** or ask me to check our IT Directory for SAP Support, DEV Software Engineers, or Tech Luzon / VisMin specialists.\n\n` +
                      `How else may I help you with your workstation or system today?`;
        }
      }
    }

    const botMsg = {
      id: 'msg_' + Math.random().toString(36).substring(2, 9),
      role: 'assistant',
      content: replyText,
      timestamp: Math.floor(Date.now() / 1000)
    };
    session.history.push(botMsg);
    session.updatedAt = Date.now();

    return jsonResponse({
      success: true,
      sessionId: sid,
      model: model,
      reply: replyText,
      message: botMsg,
      timestamp: botMsg.timestamp,
      quickReplies: []
    });
  }

  return jsonResponse({ error: 'Endpoint or action not found', path: url.pathname, action }, 404);
}
