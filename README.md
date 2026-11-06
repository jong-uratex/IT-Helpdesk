# Uratex Philippines IT Service Desk - Pure PHP Deployment Guide

Designed specifically for your server configuration:
- **Operating System:** Ubuntu 22.04.5 LTS (Webmin / Virtualmin)
- **Web Servers:** Apache 2.4.52 (Ubuntu) + NGINX
- **PHP Version:** 8.6.0RC3 / PHP 8.x (fpm-fcgi)
- **Document Root:** `/var/www/html`
- **Resource Limits:** Memory 128M, Max Upload 2M, Post Max Size 8M, Max Execution Time 30s

---

## 🚀 Quick Deployment (3 Minutes)

### Step 1: Copy Files to Document Root
Copy the contents of this folder into `/var/www/html`:
```bash
# Example using rsync or scp
cp index.php config.php api.php .htaccess /var/www/html/
```

### Step 2: Set Directory Permissions
Ensure Apache/NGINX (`www-data`) has read and write permissions to the `data/` folder for the zero-config SQLite database:
```bash
cd /var/www/html
mkdir -p data
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 775 /var/www/html/data
```

### Step 3: Configure Gemini API Key & Domain
Edit `/var/www/html/config.php`:
```php
// Enter your Gemini API Key for ROBBIE AI Chatbot
define('GEMINI_API_KEY', 'AIzaSy...');

// Verify company domain
define('ALLOWED_DOMAIN', 'uratex.com.ph');
```

Alternatively, set it in Apache virtual host or `/etc/environment`:
```bash
export GEMINI_API_KEY="AIzaSy..."
```

### Step 4: Verify in Browser
Open your browser and navigate to:
`https://your-server-ip/` or `https://10.0.115.101/`

---

## 🛠️ File Structure (Kept to Absolute Minimum)
1. `index.php` - Complete AdminLTE 3 user & admin dashboards, ROBBIE AI interface, and ticket workflows.
2. `api.php` - REST backend for Gemini chat calls via PHP cURL, ticket creation, updating, and metrics.
3. `config.php` - Settings, credentials, and database connection.
4. `.htaccess` - Apache rewrite rules and security protection.
5. `nginx.conf` - NGINX configuration snippet for FastCGI PHP 8.x.
