-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2025 at 09:40 AM
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
('3c3e734a-57e8-4316-2e26-f928a18d88e7', 0x32626464396439622d346366662d343433372d623361642d353933373139653162343066, '{\n    \"date\": \"2025-03-20\",\n    \"value\": 1500.00,\n    \"description\": \"Late utility payments\",\n    \"status\": \"unpaid\",\n    \"due_date\": \"2025-04-15\",\n    \"payment_history\": [],\n    \"social_credit_impact\": \"medium\"\n  }', '2025-03-20 01:15:22'),
('5a2b8c9d-1f3e-4a5b-9c8d-7e6f5a4b3c2d', 0x32626464396439622d346366662d343433372d623361642d353933373139653162343066, '{\r\n    \"date\": \"2025-02-10\",\r\n    \"value\": 350.00,\r\n    \"description\": \"Library book fines\",\r\n    \"status\": \"paid\",\r\n    \"due_date\": \"2025-03-01\",\r\n    \"payment_history\": [\r\n      {\r\n        \"amount\": 350.00,\r\n        \"date\": \"2025-02-28\",\r\n        \"method\": \"bank transfer\"\r\n      }\r\n    ],\r\n    \"social_credit_impact\": \"low\"\r\n  }', '2025-02-10 06:30:45'),
('8f7e6d5c-4b3a-2d1c-9e8f-7a6b5c4d3e2f', 0x32626464396439622d346366662d343433372d623361642d353933373139653162343066, '{\r\n    \"date\": \"2025-01-05\",\r\n    \"value\": 7500.00,\r\n    \"description\": \"Tax evasion penalty\",\r\n    \"status\": \"partial\",\r\n    \"due_date\": \"2025-06-30\",\r\n    \"payment_history\": [\r\n      {\r\n        \"amount\": 3000.00,\r\n        \"date\": \"2025-03-15\",\r\n        \"method\": \"credit card\"\r\n      }\r\n    ],\r\n    \"social_credit_impact\": \"high\"\r\n  }', '2025-01-05 03:20:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UID` varbinary(64) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varbinary(255) DEFAULT NULL,
  `credit_score` int(11) DEFAULT 1000,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UID`, `name`, `address`, `email`, `password`, `credit_score`, `date_created`) VALUES
(0x32363333653961342d383962612d346233302d613766352d396630396238616334326331, '<script>alert(\"PAKING\")</script>', 'somewhere', 'ernestdelrosario29@gmail.com', 0x243262243130246971524378596d6c77326437776862506568622f452e544456376a5a48336f6a516d62314347376e386a5a6e343443494a63485679, 1000, '2025-03-27 08:33:27'),
(0x32626464396439622d346366662d343433372d623361642d353933373139653162343066, 'suka blyat', 'Moscow', 'bruh@hitman.com', 0x243262243130246a77495a424d4b58693047503849666e544e5a324b65355051564e2e424c6f30677079524a343962765a74783873742e786e31626d, 1000, '2025-03-25 23:10:25'),
(0x39376537316338322d646665332d346264362d626361622d386137343135633131613565, 'okok', 'okok', 'okok@gmail.com', 0x2432622431302448304c5873774e3047372f572f2f6366654e514f677530464c36666b633761685877427056704144485848453246582f3368383365, 1000, '2025-03-25 23:20:48'),
(0x39623930343437312d366665312d346161662d396335632d383533303462653935616535, 'dejan', 'okok', 'dummyacc5273@gmail.com', 0x24326224313024334e7036766a76316852646866325878597246334a6530714b706a674c6261624a6244423143585a322f4e50596c556b2e3146612e, 1000, '2025-03-25 23:35:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `debts`
--
ALTER TABLE `debts`
  ADD PRIMARY KEY (`DID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `debts`
--
ALTER TABLE `debts`
  ADD CONSTRAINT `debts_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
