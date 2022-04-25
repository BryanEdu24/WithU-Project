

--
-- Table structure for table `etiqueta`
--

DROP TABLE IF EXISTS `etiqueta`;

CREATE TABLE `etiqueta` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ;

--
-- Dumping data for table `etiqueta`
--

LOCK TABLES `etiqueta` WRITE;
UNLOCK TABLES;

--
-- Table structure for table `publicacion`
--

DROP TABLE IF EXISTS `publicacion`;

CREATE TABLE `publicacion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDSec` int(11) NOT NULL,
  `Titulo` varchar(50) NOT NULL,
  `Cuerpo` text NOT NULL,
  PRIMARY KEY (`ID`)
) ;

--
-- Dumping data for table `publicacion`
--

LOCK TABLES `publicacion` WRITE;

UNLOCK TABLES;

--
-- Table structure for table `publicacionetiqueta`
--

DROP TABLE IF EXISTS `publicacionetiqueta`;

CREATE TABLE `publicacionetiqueta` (
  `IDPub` int(11) NOT NULL,
  `IDEti` int(11) NOT NULL
);

--
-- Dumping data for table `publicacionetiqueta`
--

LOCK TABLES `publicacionetiqueta` WRITE;

UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;

CREATE TABLE `respuesta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cuerpo` longtext NOT NULL,
  `idPub` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pub_idx` (`idPub`),
  CONSTRAINT `pub` FOREIGN KEY (`idPub`) REFERENCES `publicacion` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;

UNLOCK TABLES;

--
-- Table structure for table `seccion`
--

DROP TABLE IF EXISTS `seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seccion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ;

--
-- Dumping data for table `seccion`
--

LOCK TABLES `seccion` WRITE;

INSERT INTO `seccion` VALUES (1,'Estudios'),(2,'Trabajo'),(3,'Familia'),(4,'Relaciones'),(5,'Autoestima'),(6,'Otros');

UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(50) NOT NULL,
  `Username` varchar(15) NOT NULL,
  `Password` varchar(30) NOT NULL,
  PRIMARY KEY (`ID`)
);

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;

UNLOCK TABLES;


DROP TABLE IF EXISTS `sessions`;

CREATE TABLE `sessions` (
  `session_id` varchar(128) NOT NULL,
  `expires` int(11) NOT NULL,
  `data` mediumtext,
  `user` varchar(15),
  PRIMARY KEY (`session_id`)
);

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;

UNLOCK TABLES;