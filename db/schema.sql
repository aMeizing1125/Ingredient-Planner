CREATE DATABASE saved_receipesDB;

USE saved_receipesDB;

CREATE TABLE receipes(
  id INT NOT NULL AUTO_INCREMENT,
  uid VARCHAR(120) NOT NULL,
  receipe_id VARCHAR(120) NOT NULL,
  PRIMARY KEY(id)
);

SELECT * FROM receipes;