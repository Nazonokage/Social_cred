-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2025 at 06:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `social_credit`
--

-- --------------------------------------------------------

--
-- Table structure for table `debts`
--

CREATE TABLE `debts` (
  `DID` char(36) NOT NULL,
  `UID` varbinary(64) DEFAULT NULL,
  `Data` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `debts`
--

INSERT INTO `debts` (`DID`, `UID`, `Data`, `created_at`) VALUES
('3c3e734a-57e8-4316-2e26-f928a18d88e7', 0x32626464396439622d346366662d343433372d623361642d353933373139653162343066, '{\r\n    \"date\": \"2025-03-20\",\r\n    \"value\": 2000.00,\r\n    \"description\": \"Updated utility payments\",\r\n    \"status\": \"paid\",\r\n    \"due_date\": \"2025-04-15\",\r\n    \"payment_history\": [{\"date\": \"2025-03-25\", \"amount\": 1500.00}, {\"date\": \"2025-03-27\", \"amount\": 500.00}],\r\n    \"social_credit_impact\": \"low\"\r\n  }', '2025-03-19 17:15:22'),
('5a2b8c9d-1f3e-4a5b-9c8d-7e6f5a4b3c2d', 0x32626464396439622d346366662d343433372d623361642d353933373139653162343066, '{\r\n    \"date\": \"2025-02-10\",\r\n    \"value\": 350.00,\r\n    \"description\": \"Library book fines\",\r\n    \"status\": \"paid\",\r\n    \"due_date\": \"2025-03-01\",\r\n    \"payment_history\": [\r\n      {\r\n        \"amount\": 350.00,\r\n        \"date\": \"2025-02-28\",\r\n        \"method\": \"bank transfer\"\r\n      }\r\n    ],\r\n    \"social_credit_impact\": \"low\"\r\n  }', '2025-02-09 22:30:45'),
('15958c53-0d1f-4a69-be36-d8ff8e0a73be', 0x37343737613061372d306665352d343634392d613039622d306336313365323132333335, 'U2FsdGVkX19vMoGAtF3f+tSEHvRWsEGtwq4WGq2lv+DIJjMY+dN1YmRE60O9vABzgRbBm/1vdCueAHgRRc3OF5sDGuAXdsZ63lxYuC99LySdoUM7eui4srMnchoOO1p2Lzu3JaB74+sEnhLV3PMhQyS02/7Zjisp57wKw8Zu2Zi+kvWVx4MtzR26ogzz7TmSBiroHYEVCz1TUQT935zDE2sl2tP1KlbplyxGPfLHTsseGs14usW06CbKGzKJSzqDVw7sVDqDKqOMGrBv+/Chwg==', '2025-03-27 17:12:56');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
