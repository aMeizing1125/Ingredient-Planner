-- Drops the userReceipes if it exists currently --
DROP DATABASE IF EXISTS userReceipeDB;
-- Creates database to store user reciepes
CREATE DATABASE userReceipeDB;
-- Create Database user receipes
USE DATABASE userReceipeDB;
-- Creates the "userReceipes" database -
CREATE TABLE userReceipes
(
   id INT(11) NOT NULL AUTO_INCREMENT,
   ingredient VARCHAR(120)
);
 SELECT * FROM userReceipes;


