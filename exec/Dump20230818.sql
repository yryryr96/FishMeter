-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 54.206.147.12    Database: fish
-- ------------------------------------------------------
-- Server version	11.0.2-MariaDB-1:11.0.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `fish`
--

DROP TABLE IF EXISTS `fish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fish` (
  `fish_id` bigint(20) NOT NULL,
  `species` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fish`
--

LOCK TABLES `fish` WRITE;
/*!40000 ALTER TABLE `fish` DISABLE KEYS */;
INSERT INTO `fish` VALUES (0,'쥐노래미'),(1,'감성돔'),(2,'말쥐치'),(3,'돌돔'),(4,'쏘가리'),(5,'참돔'),(6,'옥돔'),(7,'송어');
/*!40000 ALTER TABLE `fish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `record`
--

DROP TABLE IF EXISTS `record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `latitude` double NOT NULL,
  `length` double NOT NULL,
  `longitude` double NOT NULL,
  `fish_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK61tfclrpm8g39snjqrpcv1rjg` (`fish_id`),
  KEY `FKeny3549xar8rnrcmdw3hl0la1` (`user_id`),
  CONSTRAINT `FK61tfclrpm8g39snjqrpcv1rjg` FOREIGN KEY (`fish_id`) REFERENCES `fish` (`fish_id`),
  CONSTRAINT `FKeny3549xar8rnrcmdw3hl0la1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=280 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `record`
--

LOCK TABLES `record` WRITE;
/*!40000 ALTER TABLE `record` DISABLE KEYS */;
INSERT INTO `record` VALUES (1,'부산광역시 강서구 녹산산단262로59번길','2023-01-20 14:55:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%A5%90%EB%85%B8%EB%9E%98%EB%AF%B8.jpg',35.082774,28.5,128.848982,0,2935728787),(2,'부산광역시 강서구 녹산산단262로59번길','2023-02-24 14:55:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EA%B0%90%EC%84%B1%EB%8F%94.jpg',35.083405,27.3,128.850105,1,2935728787),(3,'부산광역시 강서구 녹산산단262로59번길','2023-03-12 14:55:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EB%A7%90%EC%A5%90%EC%B9%98.jpg',35.083492,23.8,128.848982,2,2935728787),(4,'부산 강서구 신호동 315-1','2023-04-15 14:55:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EB%8F%8C%EB%8F%94.jpg',35.08164,32.1,128.848982,3,2935728787),(5,'부산광역시 강서구 가덕해안로2번길 627','2023-05-27 14:55:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%8F%98%EA%B0%80%EB%A6%AC.jpg',35.06898,37.1,128.848982,4,2935728787),(6,'부산광역시 강서구 녹산산단262로59번길','2023-06-07 14:55:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%B0%B8%EB%8F%94.jpg',35.083233,22.3,128.848982,5,2935728787),(7,'부산광역시 강서구 녹산산단262로59번길','2023-07-02 14:55:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%98%A5%EB%8F%94.jpg',35.081923,52.3,128.848982,6,2935728787),(8,'동해','2023-08-14 10:55:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%A5%90%EB%85%B8%EB%9E%98%EB%AF%B81.jpg',35.09559,28.5,128.930758,0,2935728787),(9,'동해','2023-08-14 12:45:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EB%8F%8C%EB%8F%941.jpg',35.09559,14.3,128.930758,3,2935728787),(10,'동해','2023-08-14 15:45:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EA%B0%90%EC%84%B1%EB%8F%941.jpg',35.08988,20.1,128.929963,1,2935728787),(11,'동해','2023-08-14 21:03:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%B0%B8%EB%8F%941.jpg',35.08388,14.9,128.928108,5,2935728787),(12,'동해','2023-08-15 07:11:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EB%8F%8C%EB%8F%942.jpg',35.101445,33.5,128.898247,3,2935728787),(13,'동해','2023-08-15 08:15:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EB%A7%90%EC%A5%90%EC%B9%981.jpg',35.095229,9.8,128.892328,2,2935728787),(14,'동해','2023-08-15 09:54:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%86%A1%EC%96%B41.jpg',35.086554,9.8,128.893476,7,2935728787),(15,'동해','2023-08-15 13:07:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%98%A5%EB%8F%941.jpg',35.083012,7.7,128.884377,6,2935728787),(16,'동해','2023-08-15 15:08:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%8F%98%EA%B0%80%EB%A6%AC1.jpg',35.074915,28.8,128.897098,4,2935728787),(17,'동해','2023-08-16 05:59:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EB%8F%8C%EB%8F%943.jpg',35.076577,36.1,128.917506,3,2935728787),(18,'동해','2023-08-16 07:24:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%A5%90%EB%85%B8%EB%9E%98%EB%AF%B82.jpg',35.085398,17.9,128.930581,0,2935728787),(19,'부산광역시 강서구 녹산산단262로59번길','2023-08-16 12:55:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%86%A1%EC%96%B4.jpg',35.079597,30.7,128.848982,7,2935728787),(20,'동해','2023-08-16 20:18:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EA%B0%90%EC%84%B1%EB%8F%942.jpg',35.081638,12.5,128.920863,1,2935728787),(21,'동해','2023-08-16 23:33:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EB%A7%90%EC%A5%90%EC%B9%982.jpg',35.073975,8.8,128.903636,2,2935728787),(22,'동해','2023-08-17 06:09:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EB%8F%8C%EB%8F%944.jpg',35.125655,40,128.903283,3,2935728787),(23,'동해','2023-08-17 08:37:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%8F%98%EA%B0%80%EB%A6%AC2.jpg',35.112792,16.3,128.901781,4,2935728787),(24,'동해','2023-08-17 22:01:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%B0%B8%EB%8F%942.jpg',35.122476,34.4,128.927578,5,2935728787),(25,'동해','2023-08-18 09:13:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EB%8F%8C%EB%8F%945.jpg',35.103252,19.1,128.929786,3,2935728787),(26,'동해','2023-08-18 11:02:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%98%A5%EB%8F%942.jpg',35.076577,12.6,128.917506,6,2935728787),(27,'동해','2023-08-18 21:09:44.103000','https://tunkcalb.s3.ap-northeast-2.amazonaws.com/images/%EC%86%A1%EC%96%B42.jpg',35.076577,14.2,128.917506,7,2935728787),(28,'동해','2023-08-14 09:09:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRti-IA-da78TYHf13-6PbeeeE3wuwPTQuXB7u38xU0FteDe274uxIJ3c6qXIRw4G2obTc&usqp=CAU',35.084277,5.3,128.922943,0,2935728787),(29,'동해','2023-08-14 09:09:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdgJJ-wbHjYLSu25JhBV64RxEt7rBRL3nEA&usqp=CAU',35.084277,27.3,128.922943,0,2935728787),(30,'동해','2023-08-14 09:09:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdgJJ-wbHjYLSu25JhBV64RxEt7rBRL3nEA&usqp=CAU',35.095229,27.3,128.892328,0,2935728787),(31,'동해','2023-08-14 09:09:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRti-IA-da78TYHf13-6PbeeeE3wuwPTQuXB7u38xU0FteDe274uxIJ3c6qXIRw4G2obTc&usqp=CAU',35.086554,21.9,128.893476,0,2935728787),(32,'동해','2023-08-14 09:09:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH3gPud6URpMXhWooTN-sPmQrj_kpn7Sle2w&usqp=CAU',35.095229,31.1,128.892328,0,2935728787),(33,'동해','2023-08-14 09:09:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgyh8azuLyineXRDENGTGPldTInE58WybjMA&usqp=CAU',35.101445,31.1,128.898247,0,2935728787),(34,'동해','2023-08-14 09:09:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSO27S7fPOtEvNUmOPJR-UXkbyVoo_ZkSmGg&usqp=CAU',35.086554,22.2,128.893476,0,2935728787),(35,'동해','2023-08-14 09:09:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXwUoXrWWLYH-m8v7Yx103S2Z1vvzxPSPYNw&usqp=CAU',35.101445,17.4,128.898247,0,2935728787),(36,'동해','2023-08-15 16:33:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkcLvfQ5y3iac56IOUI1Pni3q1FVkzEdiV0A&usqp=CAU',35.083012,20.6,128.884377,1,2935728787),(37,'동해','2023-08-15 16:33:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGLS86m0WbhDLJ6s_ioxj-_MqHx5m_a0-mg&usqp=CAU',35.09559,38.4,128.930758,1,2935728787),(38,'동해','2023-08-15 16:33:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy1ZTO_sM2ypqZczNRXma7h3UR2K6b3IURzkh8Hdr4z3QpNRym_1GXYhz8BcjiJTT-Gj4&usqp=CAU',35.08388,21.9,128.928108,1,2935728787),(39,'동해','2023-08-15 16:33:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9uJ8QNdiTELymGdnO90fJoNPBU3409XdPWw&usqp=CAU',35.095229,22.2,128.892328,1,2935728787),(40,'동해','2023-08-15 16:33:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlB4QTiOU2Wyk4ZFoxIy2Ufnk8R6r_XVxNNQ&usqp=CAU',35.09559,22.2,128.930758,1,2935728787),(41,'동해','2023-08-15 16:33:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I7lgqkGnL6WdKeK_L_sjHCf4o4JFOLv3ZgKr80Nnf8RvxAHVQZk4-03MxK3dtpOonaI&usqp=CAU',35.095229,17.4,128.892328,1,2935728787),(42,'동해','2023-08-15 16:33:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU21MqhB51C5JrxQZ8mcOhz1d_mxh8MrMxoQ&usqp=CAU',35.101445,11.1,128.898247,1,2935728787),(43,'동해','2023-08-16 09:30:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYmNImOlNhwzlwZzVtgQFhnhzk_aiytjKmLg&usqp=CAU',35.086554,17.4,128.893476,2,2935728787),(44,'동해','2023-08-16 09:30:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Myyr3S73UJ0w3KTg20kk1exFbhjN1RPDEA&usqp=CAU',35.08388,5.3,128.928108,2,2935728787),(45,'동해','2023-08-16 09:30:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu2nqIIsLh4DZpf91yQbghRrjt57yGyiyOJQatvut0yHcUgHEMYdhSqfhMowU4_Eyc1ME&usqp=CAU',35.08988,20.6,128.929963,2,2935728787),(46,'동해','2023-08-16 09:30:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjf2ISxD_g9apzm2J6Tjg2vxbgiMMZvNiHeA&usqp=CAU',35.09559,18.8,128.930758,2,2935728787),(47,'동해','2023-08-16 09:30:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROaMT9EHsYJmXkIrJYmJvvEWyDmxW-5_Y1Ng&usqp=CAU',35.08988,40,128.929963,2,2935728787),(48,'동해','2023-08-16 09:30:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkEblAWKNCtZejdQn78kaFfSe8w4LgSQARpR4CmMQ4Ym6auW4wOpmk21BxdzDTZ90CfqU&usqp=CAU',35.09559,22.2,128.930758,2,2935728787),(49,'동해','2023-08-16 09:30:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vG8kWcN9dooasVH8F3BH-OevJWxkWKuVdA&usqp=CAU',35.08988,7.7,128.929963,2,2935728787),(50,'동해','2023-08-17 23:31:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsn_9hdFtrnlH3U8gnVf7UoYmBmcLdgMPSCQ&usqp=CAU',35.08388,32.1,128.928108,3,2935728787),(51,'동해','2023-08-17 23:31:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx3nzs34UM58zfr8BPM-6jU-6m28eHYxXNaQ&usqp=CAU',35.095229,40,128.892328,3,2935728787),(52,'동해','2023-08-17 23:31:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQKAQ8_8V3ZkG3-UddzpbhOhMjApAATzN_9Q&usqp=CAU',35.095229,22.2,128.892328,3,2935728787),(53,'동해','2023-08-17 23:31:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ20PGwtmXGkJlvDGOaSTwJDvZxtRzBmQBwUg&usqp=CAU',35.083012,20.6,128.884377,3,2935728787),(54,'동해','2023-08-18 03:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfFzCHkwNOzNZS2ACnlqbxx85AIkNY0RpCVw&usqp=CAU',35.095229,17.4,128.892328,4,2935728787),(55,'동해','2023-08-18 03:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9zXia7mHntugU2tGWu3ZRFPLuFxzAvDikGg&usqp=CAU',35.083012,27.3,128.884377,4,2935728787),(56,'동해','2023-08-18 03:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRdwtNEP0IgWLCiqfytubFQa-75oOfqB3XyA&usqp=CAU',35.101445,11.1,128.898247,4,2935728787),(57,'동해','2023-08-18 03:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi24cfNBOPR9o37FCgmnAMGY9msMZM6FB8lQ&usqp=CAU',35.101445,22.2,128.898247,4,2935728787),(58,'동해','2023-08-18 03:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Uus5OQIT57Zfy9YdnmHUy9LQSPpR-Fkwew&usqp=CAU',35.08988,18.8,128.929963,4,2935728787),(59,'동해','2023-08-18 23:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZ2WU0INn0mF2mHyW54hQgE10bh3iw8TgEQ&usqp=CAU',35.08988,38.4,128.929963,5,2935728787),(60,'동해','2023-08-18 23:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbfks6LMgmDJm5frV-Qz9Pp_-N0hhyLF9G8w&usqp=CAU',35.08988,5.3,128.929963,5,2935728787),(61,'동해','2023-08-18 23:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1C8lZJ5ueJ-abW-KXKK9RlGbt3do1ugZFPA&usqp=CAU',35.095229,21.9,128.892328,5,2935728787),(62,'동해','2023-08-18 23:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQmkpjfARdIZeUFk7FAC_KPHeQM__lX5GIgg&usqp=CAU',35.101445,19.3,128.898247,5,2935728787),(63,'동해','2023-08-18 23:59:44.103000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVr3uHizdeoUullImY4cEsqkZKgF9K1mXfQ&usqp=CAU',35.101445,32.1,128.898247,5,2935728787);
/*!40000 ALTER TABLE `record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'김보경헌터',''),(2,'황세영앵글러',''),(3,'송정정경훈',''),(4,'공정민',''),(5,'곽은정',''),(6,'구배성',''),(7,'권은정',''),(8,'권인식',''),(9,'김경주',''),(10,'김광표',''),(11,'김나연',''),(12,'김대웅',''),(13,'김동현',''),(14,'김예진',''),(15,'김은비',''),(16,'김정희',''),(17,'김지홍',''),(18,'김창혁',''),(19,'김태환',''),(20,'김현빈',''),(21,'라동엽',''),(22,'박소윤',''),(23,'박하윤',''),(24,'방정우',''),(25,'서이현',''),(26,'성제현',''),(27,'손민영',''),(28,'신세영',''),(29,'심규럴',''),(30,'양불회',''),(31,'유혜민',''),(32,'이가영',''),(33,'이동규',''),(34,'이상훈',''),(35,'이세울',''),(36,'이종윤',''),(37,'정근모',''),(38,'정명진',''),(39,'정재범',''),(40,'정현우',''),(41,'정효인',''),(42,'차민준',''),(43,'최영은',''),(44,'하성호',''),(45,'홍정현',''),(46,'홍진환',''),(47,'황세진',''),(48,'황유성',''),(49,'황호선프로',''),(50,'박현정프로',''),(51,'최우영중사',''),(52,'먹신황재영',''),(53,'돼지황재영',''),(54,'김동우',''),(55,'녹산강태공',''),(56,'대방강태공',''),(57,'탈주닌자김현',''),(58,'두더지니',''),(59,'김남우',''),(2935728787,'정영록','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg'),(2959251560,'신현탁','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  4:48:56
