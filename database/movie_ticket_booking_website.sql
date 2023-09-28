-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2023 at 10:41 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_ticket_booking_website`
--

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image_path` varchar(100) DEFAULT NULL,
  `theatre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `title`, `description`, `image_path`, `theatre_id`) VALUES
(1, 'Unparalleled Cinematic Experience', 'Immerse yourself in stunning visuals and crystal-clear sound, as our state-of-the-art IMAX technology transports you directly into the heart of the action. With a screen that stretches beyond your peripheral vision every frame comes alive with unparalleled brilliance.', '/Images/features/imax.webp', 1),
(2, 'Delight in Dolby Atmos', 'Experience sound like never before with Dolby Atmos, the epitome audio technology that takes you on an immersive sonic journey.With sound objects moving seamlessly around the theatre, you\'ll be transported into the heart of every scene, making you an integral part of the story.', '/Images/features/sound.webp', 1),
(3, 'Tantalizing Treats', 'At our movie theatre, we take your movie-watching experience beyond the screen by offering a delectable array of food items at our concession stand. From freshly buttered popcorn, crispy nachos with zesty cheese dips, to gourmet hotdogs and a variety of refreshing beverages, our concession stand is a culinary paradise for movie enthusiasts.', '/Images/features/food.webp', 1),
(4, 'Luxurious Escape', 'Step into a world of opulence and relaxation, designed to cater to your every need before and after the main event. Our Premium Lounge welcomes you with plush leather seating, elegant décor, and a refined ambiance that sets the stage for an unforgettable cinematic journey.', '/Images/features/lounge.webp', 1),
(6, 'Unparalleled Cinematic Experience', 'Immerse yourself in stunning visuals and crystal-clear sound, as our state-of-the-art IMAX technology transports you directly into the heart of the action. With a screen that stretches beyond your peripheral vision every frame comes alive with unparalleled brilliance.', '/Images/features/imax.webp', 2),
(7, 'Delight in Dolby Atmos', 'Experience sound like never before with Dolby Atmos, the epitome audio technology that takes you on an immersive sonic journey.With sound objects moving seamlessly around the theatre, you\'ll be transported into the heart of every scene, making you an integral part of the story.', '/Images/features/sound.webp', 2),
(8, 'Tantalizing Treats', 'At our movie theatre, we take your movie-watching experience beyond the screen by offering a delectable array of food items at our concession stand. From freshly buttered popcorn, crispy nachos with zesty cheese dips, to gourmet hotdogs and a variety of refreshing beverages, our concession stand is a culinary paradise for movie enthusiasts.', '/Images/features/food.webp', 2),
(9, 'Luxurious Escape', 'Step into a world of opulence and relaxation, designed to cater to your every need before and after the main event. Our Premium Lounge welcomes you with plush leather seating, elegant décor, and a refined ambiance that sets the stage for an unforgettable cinematic journey.', '/Images/features/lounge.webp', 2);

-- --------------------------------------------------------

--
-- Table structure for table `hall`
--

CREATE TABLE `hall` (
  `id` int(11) NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `total_seats` int(11) DEFAULT NULL,
  `theatre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hall`
--

INSERT INTO `hall` (`id`, `name`, `total_seats`, `theatre_id`) VALUES
(1, 'Hall 1', 48, 1),
(2, 'Hall 2', 48, 1),
(3, 'Hall 3', 48, 1),
(4, 'Hall 4', 48, 1),
(5, 'Hall 1', 48, 2),
(6, 'Hall 2', 48, 2),
(7, 'Hall 3', 48, 2),
(8, 'Hall 4', 48, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hallwise_seat`
--

CREATE TABLE `hallwise_seat` (
  `hall_id` int(11) NOT NULL,
  `seat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hallwise_seat`
--

INSERT INTO `hallwise_seat` (`hall_id`, `seat_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 29),
(1, 30),
(1, 31),
(1, 32),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 39),
(1, 40),
(1, 41),
(1, 42),
(1, 43),
(1, 44),
(1, 45),
(1, 46),
(1, 47),
(1, 48),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(2, 12),
(2, 13),
(2, 14),
(2, 15),
(2, 16),
(2, 17),
(2, 18),
(2, 19),
(2, 20),
(2, 21),
(2, 22),
(2, 23),
(2, 24),
(2, 25),
(2, 26),
(2, 27),
(2, 28),
(2, 29),
(2, 30),
(2, 31),
(2, 32),
(2, 33),
(2, 34),
(2, 35),
(2, 36),
(2, 37),
(2, 38),
(2, 39),
(2, 40),
(2, 41),
(2, 42),
(2, 43),
(2, 44),
(2, 45),
(2, 46),
(2, 47),
(2, 48),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
(3, 11),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(3, 16),
(3, 17),
(3, 18),
(3, 19),
(3, 20),
(3, 21),
(3, 22),
(3, 23),
(3, 24),
(3, 25),
(3, 26),
(3, 27),
(3, 28),
(3, 29),
(3, 30),
(3, 31),
(3, 32),
(3, 33),
(3, 34),
(3, 35),
(3, 36),
(3, 37),
(3, 38),
(3, 39),
(3, 40),
(3, 41),
(3, 42),
(3, 43),
(3, 44),
(3, 45),
(3, 46),
(3, 47),
(3, 48),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(4, 5),
(4, 6),
(4, 7),
(4, 8),
(4, 9),
(4, 10),
(4, 11),
(4, 12),
(4, 13),
(4, 14),
(4, 15),
(4, 16),
(4, 17),
(4, 18),
(4, 19),
(4, 20),
(4, 21),
(4, 22),
(4, 23),
(4, 24),
(4, 25),
(4, 26),
(4, 27),
(4, 28),
(4, 29),
(4, 30),
(4, 31),
(4, 32),
(4, 33),
(4, 34),
(4, 35),
(4, 36),
(4, 37),
(4, 38),
(4, 39),
(4, 40),
(4, 41),
(4, 42),
(4, 43),
(4, 44),
(4, 45),
(4, 46),
(4, 47),
(4, 48),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(5, 5),
(5, 6),
(5, 7),
(5, 8),
(5, 9),
(5, 10),
(5, 11),
(5, 12),
(5, 13),
(5, 14),
(5, 15),
(5, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20),
(5, 21),
(5, 22),
(5, 23),
(5, 24),
(5, 25),
(5, 26),
(5, 27),
(5, 28),
(5, 29),
(5, 30),
(5, 31),
(5, 32),
(5, 33),
(5, 34),
(5, 35),
(5, 36),
(5, 37),
(5, 38),
(5, 39),
(5, 40),
(5, 41),
(5, 42),
(5, 43),
(5, 44),
(5, 45),
(5, 46),
(5, 47),
(5, 48),
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(6, 5),
(6, 6),
(6, 7),
(6, 8),
(6, 9),
(6, 10),
(6, 11),
(6, 12),
(6, 13),
(6, 14),
(6, 15),
(6, 16),
(6, 17),
(6, 18),
(6, 19),
(6, 20),
(6, 21),
(6, 22),
(6, 23),
(6, 24),
(6, 25),
(6, 26),
(6, 27),
(6, 28),
(6, 29),
(6, 30),
(6, 31),
(6, 32),
(6, 33),
(6, 34),
(6, 35),
(6, 36),
(6, 37),
(6, 38),
(6, 39),
(6, 40),
(6, 41),
(6, 42),
(6, 43),
(6, 44),
(6, 45),
(6, 46),
(6, 47),
(6, 48),
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(7, 5),
(7, 6),
(7, 7),
(7, 8),
(7, 9),
(7, 10),
(7, 11),
(7, 12),
(7, 13),
(7, 14),
(7, 15),
(7, 16),
(7, 17),
(7, 18),
(7, 19),
(7, 20),
(7, 21),
(7, 22),
(7, 23),
(7, 24),
(7, 25),
(7, 26),
(7, 27),
(7, 28),
(7, 29),
(7, 30),
(7, 31),
(7, 32),
(7, 33),
(7, 34),
(7, 35),
(7, 36),
(7, 37),
(7, 38),
(7, 39),
(7, 40),
(7, 41),
(7, 42),
(7, 43),
(7, 44),
(7, 45),
(7, 46),
(7, 47),
(7, 48),
(8, 1),
(8, 2),
(8, 3),
(8, 4),
(8, 5),
(8, 6),
(8, 7),
(8, 8),
(8, 9),
(8, 10),
(8, 11),
(8, 12),
(8, 13),
(8, 14),
(8, 15),
(8, 16),
(8, 17),
(8, 18),
(8, 19),
(8, 20),
(8, 21),
(8, 22),
(8, 23),
(8, 24),
(8, 25),
(8, 26),
(8, 27),
(8, 28),
(8, 29),
(8, 30),
(8, 31),
(8, 32),
(8, 33),
(8, 34),
(8, 35),
(8, 36),
(8, 37),
(8, 38),
(8, 39),
(8, 40),
(8, 41),
(8, 42),
(8, 43),
(8, 44),
(8, 45),
(8, 46),
(8, 47),
(8, 48);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `image_path` varchar(150) DEFAULT NULL,
  `language` varchar(15) DEFAULT NULL,
  `synopsis` varchar(500) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `duration` varchar(10) DEFAULT NULL,
  `top_cast` varchar(30) DEFAULT NULL,
  `release_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `name`, `image_path`, `language`, `synopsis`, `rating`, `duration`, `top_cast`, `release_date`) VALUES
(1, 'Spider-Man: Across the Spider-Verse', '/Images/movies/spiderman.webp', 'English', 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.', 8.8, '2h 16m', 'Oscar Isaac', '2023-06-23'),
(2, 'Extraction 2', '/Images/movies/extraction2.webp', 'English', 'After barely surviving his grievous wounds from his mission in Dhaka, Bangladesh, Tyler Rake is back, and his team is ready to take on their next mission.', 7.0, '2h 3m', 'Chris Hemsworth', '2023-06-13'),
(3, 'Murder Mystery 2', '/Images/movies/murderMystery.webp', 'English', 'Full-time detectives Nick and Audrey are struggling to get their private eye agency off the ground. They find themselves at the center of international abduction when their friend Maharaja, is kidnapped at his own lavish wedding.', 5.7, '1h 30m', 'Jennifer Aniston', '2023-03-31'),
(4, 'Mission: Impossible - Dead Reckoning Part One', '/Images/movies/missionImpossible.webp', 'English', 'Ethan Hunt and the IMF team must track down a terrifying new weapon that threatens all of humanity if it falls into the wrong hands. With control of the future and the fate of the world at stake, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan is forced to consider that nothing can matter more than the mission -- not even the lives of those he cares about most.', 8.0, '2h 43m', 'Tom Cruise', '2023-07-10'),
(5, 'Oppenheimer', '/Images/movies/oppenheimer.webp', 'English', 'During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world\'s first nuclear explosion, forever changing the course of history.', 9.4, '3h', 'Cillian Murphy', '2023-07-21'),
(6, 'Barbie', '/Images/movies/barbie.webp', 'English', 'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.', 7.6, '1h 54m', 'Margot Robbie', '2023-07-21');

-- --------------------------------------------------------

--
-- Table structure for table `movie_directors`
--

CREATE TABLE `movie_directors` (
  `movie_id` int(11) NOT NULL,
  `director` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movie_directors`
--

INSERT INTO `movie_directors` (`movie_id`, `director`) VALUES
(1, 'Joaquim Dos Santos'),
(1, 'Justin K. Thompson'),
(1, 'Kemp Powers'),
(2, 'Sam Hargrave'),
(3, 'Jeremy Garelick'),
(4, 'Christopher McQuarrie'),
(5, 'Christopher Nolan'),
(6, 'Greta Gerwig');

-- --------------------------------------------------------

--
-- Table structure for table `movie_genre`
--

CREATE TABLE `movie_genre` (
  `movie_id` int(11) NOT NULL,
  `genre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movie_genre`
--

INSERT INTO `movie_genre` (`movie_id`, `genre`) VALUES
(1, 'Action'),
(1, 'Adventure'),
(1, 'Animation'),
(2, 'Action'),
(2, 'Thriller'),
(3, 'Comedy'),
(3, 'Mystery'),
(4, 'Action'),
(4, 'Adventure'),
(4, 'Thriller'),
(5, 'Biography'),
(5, 'Drama'),
(5, 'History'),
(6, 'Adventure'),
(6, 'Comedy'),
(6, 'Fantasy');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `payment_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `amount` int(11) DEFAULT NULL,
  `method` varchar(30) DEFAULT NULL,
  `customer_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `payment_time`, `amount`, `method`, `customer_email`) VALUES
(1, '2023-08-16 19:41:37', 1400, 'Bkash', 'Belal123@gmail.com'),
(2, '2023-08-16 19:43:03', 1350, 'Nagad', 'rahim123@gmail.com'),
(3, '2023-08-20 10:32:06', 1350, 'Nagad', 'neloy.saha456@gmail.com'),
(4, '2023-08-20 10:44:19', 700, 'Bkash', 'neloy.saha456@gmail.com'),
(5, '2023-08-20 12:24:02', 700, 'Debit Card', 'neloy.saha456@gmail.com'),
(6, '2023-08-20 12:40:15', 1050, 'Nagad', 'adib@yahoo.com'),
(7, '2023-08-20 12:41:00', 900, 'Nagad', 'adib@yahoo.com'),
(8, '2023-08-20 14:36:08', 2700, 'Bkash', 'sazin@gmail.com'),
(9, '2023-08-20 16:13:23', 700, 'Bkash', 'neloy.saha456@gmail.com'),
(10, '2023-08-20 17:56:07', 900, 'Bkash', 'farhan@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `email` varchar(100) NOT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone_number` char(11) DEFAULT NULL,
  `account_balance` int(11) DEFAULT NULL,
  `person_type` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`email`, `first_name`, `last_name`, `password`, `phone_number`, `account_balance`, `person_type`) VALUES
('addin@gmail.com', 'Test2', 'test', '123', '17579120791', 100000, 'Customer'),
('adib@yahoo.com', 'Adib', 'Rahman', 'adib123', '01757912079', 100000, 'Customer'),
('Belal123@gmail.com', 'Belal', 'Hasan', '123', '01757912079', 1000000, 'Customer'),
('farhan@gmail.com', 'Farhan', 'Abedin', 'farhan123', '01757912079', 100000, 'Customer'),
('jon@alu.com', 'Test', 'Saha1', 'test1', '123321311', 100000, 'Customer'),
('jon@potato.com', 'Test', 'Saha', 'test1', '123321311', 100000, 'Customer'),
('Jon@snow.com', 'Jon', 'Snow', '456', '123123233', 10000, 'Customer'),
('neloy.saha456@gmail.com', 'Neloy', 'Saha', '1234', '01757912079', 100000, 'Customer'),
('niaz@nafi.com', 'Niaz', 'Rahman', '123', '01821379981', 100000, 'Customer'),
('rahim123@gmail.com', 'Rahim', 'Sheikh', '123', '01757912079', 100000, 'Customer'),
('sazin@gmail.com', 'Sazin', 'Haque', 'sazin1234', '01757912079', 100000, 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `id` int(11) NOT NULL,
  `name` char(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`id`, `name`) VALUES
(1, 'A1'),
(2, 'A2'),
(3, 'A3'),
(4, 'A4'),
(5, 'A5'),
(6, 'A6'),
(7, 'A7'),
(8, 'A8'),
(9, 'B1'),
(10, 'B2'),
(11, 'B3'),
(12, 'B4'),
(13, 'B5'),
(14, 'B6'),
(15, 'B7'),
(16, 'B8'),
(17, 'C1'),
(18, 'C2'),
(19, 'C3'),
(20, 'C4'),
(21, 'C5'),
(22, 'C6'),
(23, 'C7'),
(24, 'C8'),
(25, 'D1'),
(26, 'D2'),
(27, 'D3'),
(28, 'D4'),
(29, 'D5'),
(30, 'D6'),
(31, 'D7'),
(32, 'D8'),
(33, 'E1'),
(34, 'E2'),
(35, 'E3'),
(36, 'E4'),
(37, 'E5'),
(38, 'E6'),
(39, 'E7'),
(40, 'E8'),
(41, 'F1'),
(42, 'F2'),
(43, 'F3'),
(44, 'F4'),
(45, 'F5'),
(46, 'F6'),
(47, 'F7'),
(48, 'F8');

-- --------------------------------------------------------

--
-- Table structure for table `shown_in`
--

CREATE TABLE `shown_in` (
  `movie_id` int(11) NOT NULL,
  `showtime_id` int(11) NOT NULL,
  `hall_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shown_in`
--

INSERT INTO `shown_in` (`movie_id`, `showtime_id`, `hall_id`) VALUES
(1, 1, 1),
(1, 1, 5),
(1, 2, 3),
(1, 2, 7),
(1, 3, 3),
(1, 3, 7),
(1, 4, 1),
(1, 4, 5),
(1, 5, 3),
(1, 5, 7),
(1, 6, 3),
(1, 6, 7),
(1, 7, 1),
(1, 7, 5),
(1, 8, 3),
(1, 8, 7),
(1, 9, 3),
(1, 9, 7),
(1, 10, 1),
(1, 10, 5),
(1, 11, 3),
(1, 11, 7),
(1, 12, 3),
(1, 12, 7),
(2, 2, 4),
(2, 2, 8),
(2, 3, 4),
(2, 3, 8),
(2, 5, 4),
(2, 5, 8),
(2, 6, 4),
(2, 6, 8),
(2, 8, 4),
(2, 8, 8),
(2, 9, 4),
(2, 9, 8),
(2, 11, 4),
(2, 11, 8),
(2, 12, 4),
(2, 12, 8),
(3, 1, 3),
(3, 1, 7),
(3, 4, 3),
(3, 4, 7),
(3, 7, 3),
(3, 7, 7),
(3, 10, 3),
(3, 10, 7),
(4, 1, 4),
(4, 1, 8),
(4, 3, 5),
(4, 4, 4),
(4, 4, 8),
(4, 6, 5),
(4, 7, 4),
(4, 7, 8),
(4, 9, 5),
(4, 10, 4),
(4, 10, 8),
(4, 12, 5),
(5, 1, 2),
(5, 1, 6),
(5, 2, 1),
(5, 2, 5),
(5, 3, 1),
(5, 4, 2),
(5, 4, 6),
(5, 5, 1),
(5, 5, 5),
(5, 6, 1),
(5, 7, 2),
(5, 7, 6),
(5, 8, 1),
(5, 8, 5),
(5, 9, 1),
(5, 10, 2),
(5, 10, 6),
(5, 11, 1),
(5, 11, 5),
(5, 12, 1),
(6, 2, 2),
(6, 2, 6),
(6, 3, 2),
(6, 3, 6),
(6, 5, 2),
(6, 5, 6),
(6, 6, 2),
(6, 6, 6),
(6, 8, 2),
(6, 8, 6),
(6, 9, 2),
(6, 9, 6),
(6, 11, 2),
(6, 11, 6),
(6, 12, 2),
(6, 12, 6);

-- --------------------------------------------------------

--
-- Table structure for table `showtimes`
--

CREATE TABLE `showtimes` (
  `id` int(11) NOT NULL,
  `movie_start_time` varchar(20) DEFAULT NULL,
  `show_type` char(2) DEFAULT NULL,
  `showtime_date` date DEFAULT NULL,
  `price_per_seat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `showtimes`
--

INSERT INTO `showtimes` (`id`, `movie_start_time`, `show_type`, `showtime_date`, `price_per_seat`) VALUES
(1, '11:00 am', '2D', '2023-08-19', 350),
(2, '2:30 pm', '3D', '2023-08-19', 450),
(3, '6:00 pm', '3D', '2023-08-19', 450),
(4, '11:00 am', '2D', '2023-08-20', 350),
(5, '2:30 pm', '3D', '2023-08-20', 450),
(6, '6:00 pm', '3D', '2023-08-20', 450),
(7, '11:00 am', '2D', '2023-08-21', 350),
(8, '2:30 pm', '3D', '2023-08-21', 450),
(9, '6:00 pm', '3D', '2023-08-21', 450),
(10, '11:00 am', '2D', '2023-08-22', 350),
(11, '2:30 pm', '3D', '2023-08-22', 450),
(12, '6:00 pm', '3D', '2023-08-22', 450);

-- --------------------------------------------------------

--
-- Table structure for table `theatre`
--

CREATE TABLE `theatre` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `location` varchar(30) DEFAULT NULL,
  `location_details` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theatre`
--

INSERT INTO `theatre` (`id`, `name`, `location`, `location_details`) VALUES
(1, 'Bashundhara Shopping Mall', 'Panthapath', 'Show Motion Limited Level 8, Bashundhara City 13/3 Ka, Panthapath, Tejgaon, Dhaka-1205'),
(2, 'Shimanto Shambhar', 'Dhanmondi', 'Shimanto Shamvar Road no 2, Dhanmondi, Dhaka-1205');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `payment_id` int(11) NOT NULL,
  `seat_id` int(11) NOT NULL,
  `hall_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `showtimes_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id`, `price`, `purchase_date`, `payment_id`, `seat_id`, `hall_id`, `movie_id`, `showtimes_id`) VALUES
(1, 450, '2023-08-17', 2, 3, 1, 5, 3),
(2, 450, '2023-08-17', 2, 4, 1, 5, 3),
(3, 450, '2023-08-17', 2, 5, 1, 5, 3),
(4, 350, '2023-08-17', 1, 3, 2, 5, 1),
(5, 350, '2023-08-17', 1, 4, 2, 5, 1),
(6, 350, '2023-08-17', 1, 5, 2, 5, 1),
(7, 350, '2023-08-17', 1, 6, 2, 5, 1),
(8, 450, '2023-08-20', 3, 19, 2, 6, 2),
(9, 450, '2023-08-20', 3, 20, 2, 6, 2),
(10, 450, '2023-08-20', 3, 21, 2, 6, 2),
(11, 350, '2023-08-20', 4, 5, 3, 3, 7),
(12, 350, '2023-08-20', 4, 6, 3, 3, 7),
(13, 350, '2023-08-20', 5, 6, 5, 1, 1),
(14, 350, '2023-08-20', 5, 5, 5, 1, 1),
(15, 350, '2023-08-20', 6, 29, 2, 5, 7),
(16, 350, '2023-08-20', 6, 27, 2, 5, 7),
(17, 350, '2023-08-20', 6, 30, 2, 5, 7),
(18, 450, '2023-08-20', 7, 11, 6, 6, 11),
(19, 450, '2023-08-20', 7, 12, 6, 6, 11),
(20, 450, '2023-08-20', 8, 11, 5, 5, 5),
(21, 450, '2023-08-20', 8, 12, 5, 5, 5),
(22, 450, '2023-08-20', 8, 13, 5, 5, 5),
(23, 450, '2023-08-20', 8, 14, 5, 5, 5),
(24, 450, '2023-08-20', 8, 21, 5, 5, 5),
(25, 450, '2023-08-20', 8, 22, 5, 5, 5),
(26, 350, '2023-08-20', 9, 37, 8, 4, 7),
(27, 350, '2023-08-20', 9, 38, 8, 4, 7),
(28, 450, '2023-08-20', 10, 31, 6, 6, 11),
(29, 450, '2023-08-20', 10, 32, 6, 6, 11);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `theatre_id` (`theatre_id`);

--
-- Indexes for table `hall`
--
ALTER TABLE `hall`
  ADD PRIMARY KEY (`id`),
  ADD KEY `theatre_id` (`theatre_id`);

--
-- Indexes for table `hallwise_seat`
--
ALTER TABLE `hallwise_seat`
  ADD PRIMARY KEY (`hall_id`,`seat_id`),
  ADD KEY `seat_id` (`seat_id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie_directors`
--
ALTER TABLE `movie_directors`
  ADD PRIMARY KEY (`movie_id`,`director`);

--
-- Indexes for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD PRIMARY KEY (`movie_id`,`genre`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_email` (`customer_email`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shown_in`
--
ALTER TABLE `shown_in`
  ADD PRIMARY KEY (`movie_id`,`showtime_id`,`hall_id`),
  ADD KEY `showtime_id` (`showtime_id`),
  ADD KEY `hall_id` (`hall_id`);

--
-- Indexes for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `theatre`
--
ALTER TABLE `theatre`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `showtimes_id` (`showtimes_id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `seat_id` (`seat_id`),
  ADD KEY `hall_id` (`hall_id`),
  ADD KEY `movie_id` (`movie_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `hall`
--
ALTER TABLE `hall`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `seat`
--
ALTER TABLE `seat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `theatre`
--
ALTER TABLE `theatre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `features`
--
ALTER TABLE `features`
  ADD CONSTRAINT `features_ibfk_1` FOREIGN KEY (`theatre_id`) REFERENCES `theatre` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hall`
--
ALTER TABLE `hall`
  ADD CONSTRAINT `hall_ibfk_1` FOREIGN KEY (`theatre_id`) REFERENCES `theatre` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `hallwise_seat`
--
ALTER TABLE `hallwise_seat`
  ADD CONSTRAINT `hallwise_seat_ibfk_1` FOREIGN KEY (`hall_id`) REFERENCES `hall` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `hallwise_seat_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seat` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_directors`
--
ALTER TABLE `movie_directors`
  ADD CONSTRAINT `movie_directors_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `movie_genre`
--
ALTER TABLE `movie_genre`
  ADD CONSTRAINT `movie_genre_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`customer_email`) REFERENCES `person` (`email`);

--
-- Constraints for table `shown_in`
--
ALTER TABLE `shown_in`
  ADD CONSTRAINT `shown_in_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shown_in_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `shown_in_ibfk_3` FOREIGN KEY (`hall_id`) REFERENCES `hall` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`showtimes_id`) REFERENCES `showtimes` (`id`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`),
  ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`seat_id`) REFERENCES `seat` (`id`),
  ADD CONSTRAINT `ticket_ibfk_4` FOREIGN KEY (`hall_id`) REFERENCES `hall` (`id`),
  ADD CONSTRAINT `ticket_ibfk_5` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
