-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 27, 2025 at 11:49 PM
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
('cf5366a0-ab59-4617-bbdf-2271a8d3a641', 0x64376432333339362d343639302d343937352d623630372d616533383036393239643264, '{\"data\":{\"description\":\"afafsfa\",\"value\":34,\"date\":\"2025-03-14\",\"due_date\":\"2025-04-04\",\"status\":\"paid\",\"social_credit_impact\":\"medium\",\"payment_history\":[]}}', '2025-03-27 22:37:40');

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
(0x39396130353763322d393236622d346530632d623335622d353037396430636665306635, 'okok', 'okok', 'okok@okok.com', 0x243262243130244a5a77704b6676704b5642503459496d35467353564f4b637042506848583141484f383072707443736c45574b6658536136544261, 1000, '2025-03-27 22:38:56'),
(0x61616335336132612d313361662d343731372d396437302d323166643437386132303636, 'yuts', 'yuts', 'yuts@yuts.com', 0x243262243130243262346d616654594c366464565432706b75367155756c6379756c3674472e495a6e4d6f5a763438766458416d69496d3373576261, 1000, '2025-03-27 22:48:38'),
(0x64376432333339362d343639302d343937352d623630372d616533383036393239643264, 'bruh', 'yuts', 'bruh@hitman.com', 0x24326224313024443239786678396d2f486d74334e7039797730692e75612e64754d78575a59474c54584b6764382f476e69366d7044396d52473157, 1000, '2025-03-27 22:36:03');

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
  ADD CONSTRAINT `debts_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
