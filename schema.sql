-- MySQL / MariaDB Schema for Uratex IT Service Desk
-- (Optional: only needed if using MySQL instead of default SQLite)

CREATE DATABASE IF NOT EXISTS `uratex_it_desk` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `uratex_it_desk`;

CREATE TABLE IF NOT EXISTS `tickets` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `ticket_number` VARCHAR(32) NOT NULL UNIQUE,
  `subject` VARCHAR(255) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `priority` ENUM('Urgent', 'High', 'Medium', 'Low') NOT NULL DEFAULT 'Medium',
  `status` ENUM('Open', 'In Progress', 'Waiting for User', 'Resolved', 'Closed') NOT NULL DEFAULT 'Open',
  `creator_name` VARCHAR(128) NOT NULL,
  `creator_email` VARCHAR(128) NOT NULL,
  `department` VARCHAR(128) NOT NULL,
  `plant_location` VARCHAR(128) NOT NULL,
  `contact_number` VARCHAR(64) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `robbie_notes` TEXT DEFAULT NULL,
  `assigned_to` VARCHAR(128) DEFAULT NULL,
  `resolution_notes` TEXT DEFAULT NULL,
  `sla_target_hours` INT DEFAULT 8,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (`status`),
  INDEX idx_priority (`priority`),
  INDEX idx_email (`creator_email`),
  INDEX idx_plant (`plant_location`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `chat_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `session_id` VARCHAR(64) DEFAULT NULL,
  `user_email` VARCHAR(128) NOT NULL,
  `user_message` TEXT NOT NULL,
  `bot_reply` TEXT NOT NULL,
  `escalated` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
