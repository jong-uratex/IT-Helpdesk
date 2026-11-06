<?php
/**
 * Uratex Philippines IT Service Desk
 * Configuration File
 *
 * Compatible with Ubuntu 22.04 LTS, Apache 2.4.52, NGINX, and PHP 8.x
 * Document Root: /var/www/html
 */

// Prevent direct script execution if accessed outside of app
if (!defined('URATEX_APP')) {
    define('URATEX_APP', true);
}

// Session configuration
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        ini_set('session.cookie_secure', 1);
    }
    session_start();
}

// Application Settings
define('APP_NAME', 'Uratex Philippines IT Service Desk');
define('APP_COMPANY', 'Uratex Philippines - RGC Group of Companies');
define('ALLOWED_DOMAIN', 'uratex.com.ph'); // Mandatory company domain restriction
define('IT_SUPPORT_EMAIL', 'itsupport@uratex.com.ph');

// Eden AI Configuration for ROBBIE (google/gemma-4-26b-a4b-it)
define('EDENAI_API_KEY', getenv('EDENAI_API_KEY') ?: 'sk-eden-live-CVZ09ShNkXn4290VA67QwVbBLX4T-VLAslQ4a07s4rkf57d742f');
define('EDENAI_MODEL', getenv('EDENAI_MODEL') ?: 'google/gemma-4-26b-a4b-it');

// Gemini AI API Configuration for ROBBIE (Alternative)
define('GEMINI_API_KEY', getenv('GEMINI_API_KEY') ?: 'YOUR_GEMINI_API_KEY_HERE');
define('GEMINI_MODEL', 'gemini-3.8-flash');

// Google OAuth Client ID for Uratex Google Workspace Sign-In
// Create via Google Cloud Console: https://console.cloud.google.com/apis/credentials
define('GOOGLE_CLIENT_ID', getenv('GOOGLE_CLIENT_ID') ?: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com');

// Database Configuration
// 'sqlite' is default for instant zero-configuration deployment on Ubuntu Apache
define('DB_DRIVER', 'sqlite'); 
define('SQLITE_FILE', __DIR__ . '/data/uratex_service_desk.sqlite');

// If switching to MySQL/MariaDB:
define('MYSQL_HOST', '127.0.0.1');
define('MYSQL_PORT', 3306);
define('MYSQL_DB', 'uratex_it_desk');
define('MYSQL_USER', 'uratex_user');
define('MYSQL_PASS', 'your_secure_password');

// Database Connection Helper
function get_db_connection() {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    try {
        if (DB_DRIVER === 'sqlite') {
            $dataDir = dirname(SQLITE_FILE);
            if (!is_dir($dataDir)) {
                mkdir($dataDir, 0775, true);
            }
            $pdo = new PDO('sqlite:' . SQLITE_FILE);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            initialize_sqlite_schema($pdo);
        } else {
            $dsn = "mysql:host=" . MYSQL_HOST . ";port=" . MYSQL_PORT . ";dbname=" . MYSQL_DB . ";charset=utf8mb4";
            $pdo = new PDO($dsn, MYSQL_USER, MYSQL_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        }
    } catch (PDOException $e) {
        die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
    }

    return $pdo;
}

// Auto-initialize SQLite tables and initial seed data
function initialize_sqlite_schema($pdo) {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS tickets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticket_number TEXT UNIQUE NOT NULL,
            subject TEXT NOT NULL,
            category TEXT NOT NULL,
            priority TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'Open',
            creator_name TEXT NOT NULL,
            creator_email TEXT NOT NULL,
            department TEXT NOT NULL,
            plant_location TEXT NOT NULL,
            contact_number TEXT,
            description TEXT NOT NULL,
            robbie_notes TEXT,
            assigned_to TEXT,
            resolution_notes TEXT,
            sla_target_hours INTEGER DEFAULT 8,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS chat_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT,
            user_email TEXT,
            user_message TEXT,
            bot_reply TEXT,
            escalated INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    ");

    // Check if table is empty, seed initial realistic records
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM tickets");
    $row = $stmt->fetch();
    if ($row['count'] == 0) {
        $sampleTickets = [
            [
                'URX-2026-0839',
                'SAP S/4HANA Logon Failure - Error 10060 (WSAETIMEDOUT)',
                'SAP / ERP',
                'Urgent',
                'In Progress',
                'Maria Santos',
                'msantos@uratex.com.ph',
                'Supply Chain & Logistics',
                'Muntinlupa Head Office',
                'Local 2041',
                'Cannot connect to SAP PRD instance since 8:30 AM. Need to release shipment manifests for distributor delivery trucks.',
                'ROBBIE verified user network status. SAP application server port 3200 unreachable from subnet. Escalated to Network & SAP BASIS team.',
                'Mark Reyes (Senior SAP Analyst)',
                2
            ],
            [
                'URX-2026-0838',
                'Zebra ZT411 Barcode Label Printer - Head Jams in Foam Cutting Line',
                'Hardware & Printers',
                'High',
                'Open',
                'Arnel Mendoza',
                'amendoza@uratex.com.ph',
                'Foam Production Plant 2',
                'Valenzuela Plant',
                'Local 1108',
                'The production line barcode printer is displaying "Ribbon Out / Paper Jam" even after reloading thermal roll. Packaging queue is halting.',
                'ROBBIE provided standard thermal sensor cleaning guide. Physical sensor calibration failed. Escalated to on-site plant IT support.',
                'Paolo Cruz (Plant IT Support)',
                4
            ],
            [
                'URX-2026-0835',
                'FortiClient VPN IPsec Tunnel drops during remote plant access',
                'Network & VPN',
                'Medium',
                'Waiting for User',
                'Danielle Tan',
                'dtan@uratex.com.ph',
                'Finance & Accounting',
                'Canlubang Plant',
                'Local 3012',
                'VPN disconnects every 15 minutes when accessing the centralized billing server in Muntinlupa.',
                'ROBBIE suggested MTU packet adjustment and FortiClient version 7.2 reinstall.',
                'Danica Santos (Network Admin)',
                8
            ]
        ];

        $insert = $pdo->prepare("
            INSERT INTO tickets (
                ticket_number, subject, category, priority, status,
                creator_name, creator_email, department, plant_location,
                contact_number, description, robbie_notes, assigned_to, sla_target_hours
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        foreach ($sampleTickets as $t) {
            $insert->execute($t);
        }
    }
}
