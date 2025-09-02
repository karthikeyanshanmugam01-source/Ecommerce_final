-- Client 

CREATE TABLE `clients` (
  `client_id` INT NOT NULL AUTO_INCREMENT,
  `client_name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `uq_client_name` (`client_name`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

-- Business units
CREATE TABLE `business_units` (
  `bu_id` INT NOT NULL AUTO_INCREMENT,
  `bu_name` VARCHAR(255) NOT NULL,
  `client_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bu_id`),
  FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

-- Users
CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) DEFAULT NULL,
  `client_id` INT DEFAULT NULL,
  `bu_id` INT DEFAULT NULL,
  `user_type` ENUM('admin', 'standard', 'guest') DEFAULT 'standard',
  `is_active` BOOLEAN DEFAULT TRUE,
  `last_login` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_username` (`username`),
  UNIQUE KEY `uq_email` (`email`),
  FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  FOREIGN KEY (`bu_id`) REFERENCES `business_units` (`bu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

-- Google Authenticaiton
CREATE TABLE `user_google_auth` (
  `google_auth_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `google_id` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`google_auth_id`),
  UNIQUE KEY `uq_google_id` (`google_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
