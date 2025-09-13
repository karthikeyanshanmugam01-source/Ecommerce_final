-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.41 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@mathi_ecom_db@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mathi_ecom_db
DROP DATABASE IF EXISTS `mathi_ecom_db`;
CREATE DATABASE IF NOT EXISTS `mathi_ecom_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bg_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mathi_ecom_db`;

-- Dumping structure for table mathi_ecom_db.business_units
DROP TABLE IF EXISTS `business_units`;
CREATE TABLE IF NOT EXISTS `business_units` (
  `bu_id` int NOT NULL AUTO_INCREMENT,
  `bu_name` varchar(255) NOT NULL,
  `client_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bu_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `business_units_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mathi_ecom_db.business_units: ~1 rows (approximately)
DELETE FROM `business_units`;
INSERT INTO `business_units` (`bu_id`, `bu_name`, `client_id`, `created_at`) VALUES
	(1, 'Retail Division', 1, '2025-09-09 05:20:37');

-- Dumping structure for table mathi_ecom_db.clients
DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `uq_client_name` (`client_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mathi_ecom_db.clients: ~1 rows (approximately)
DELETE FROM `clients`;
INSERT INTO `clients` (`client_id`, `client_name`, `created_at`) VALUES
	(1, 'lemellows', '2025-09-09 05:19:48');

-- Dumping structure for table mathi_ecom_db.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `client_id` int DEFAULT NULL,
  `bu_id` int DEFAULT NULL,
  `user_type` enum('admin','standard','guest') DEFAULT 'standard',
  `is_active` tinyint(1) DEFAULT '1',
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_username` (`username`),
  UNIQUE KEY `uq_email` (`email`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `username_3` (`username`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `username_4` (`username`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `username_5` (`username`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `username_6` (`username`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `username_7` (`username`),
  UNIQUE KEY `email_7` (`email`),
  KEY `client_id` (`client_id`),
  KEY `bu_id` (`bu_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`bu_id`) REFERENCES `business_units` (`bu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table mathi_ecom_db.users: ~1 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`user_id`, `username`, `email`, `password_hash`, `client_id`, `bu_id`, `user_type`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
	(1, 'karthikeyan', 'kkeyanece21@gmail.com', '$2b$10$Hf/uV5fhoxLJOKWYdhQT0OMGyit5xLQeATD/lCtihWbawlzQvN7fy', 1, 1, 'admin', 1, NULL, '2025-09-09 05:22:57', '2025-09-09 05:22:57');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
