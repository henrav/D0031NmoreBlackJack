-- MySQL Script generated by MySQL Workbench
-- Wed Nov  6 12:21:41 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`canvasStudent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`canvasStudent` ;

CREATE TABLE IF NOT EXISTS `mydb`.`canvasStudent` (
  `studID` INT NOT NULL,
  `studUser` VARCHAR(45) NULL,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`studID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`canvasCourse`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`canvasCourse` ;

CREATE TABLE IF NOT EXISTS `mydb`.`canvasCourse` (
  `courseID` INT NOT NULL,
  `courseKod` VARCHAR(45) NULL,
  `courseNamn` VARCHAR(45) NULL,
  `courseTerm` VARCHAR(45) NULL,
  PRIMARY KEY (`courseID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`courseAssignments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`courseAssignments` ;

CREATE TABLE IF NOT EXISTS `mydb`.`courseAssignments` (
  `courseAssignmentID` INT NOT NULL,
  `assignmentName` VARCHAR(45) NULL,
  `canvasCourse_courseID` INT NOT NULL,
  PRIMARY KEY (`courseAssignmentID`, `canvasCourse_courseID`),
  INDEX `fk_courseAssignments_canvasCourse1_idx` (`canvasCourse_courseID` ASC) VISIBLE,
  CONSTRAINT `fk_courseAssignments_canvasCourse1`
    FOREIGN KEY (`canvasCourse_courseID`)
    REFERENCES `mydb`.`canvasCourse` (`courseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`assignmentGrades`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`assignmentGrades` ;

CREATE TABLE IF NOT EXISTS `mydb`.`assignmentGrades` (
  `assignmentGradeID` INT NOT NULL,
  `gradesToAssignmentFK` INT NOT NULL,
  `canvasStudent_studID` INT NOT NULL,
  `date` DATETIME NULL,
  `assignmentGrade` VARCHAR(45) NULL,
  PRIMARY KEY (`assignmentGradeID`, `gradesToAssignmentFK`, `canvasStudent_studID`),
  INDEX `fk_assignmentGrades_courseAssignments1_idx` (`gradesToAssignmentFK` ASC) VISIBLE,
  INDEX `fk_assignmentGrades_canvasStudent1_idx` (`canvasStudent_studID` ASC) VISIBLE,
  CONSTRAINT `fk_assignmentGrades_courseAssignments1`
    FOREIGN KEY (`gradesToAssignmentFK`)
    REFERENCES `mydb`.`courseAssignments` (`courseAssignmentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_assignmentGrades_canvasStudent1`
    FOREIGN KEY (`canvasStudent_studID`)
    REFERENCES `mydb`.`canvasStudent` (`studID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`canvasCourse_has_canvasStudent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`canvasCourse_has_canvasStudent` ;

CREATE TABLE IF NOT EXISTS `mydb`.`canvasCourse_has_canvasStudent` (
  `canvasCourse_courseID` INT NOT NULL,
  `canvasStudent_studID` INT NOT NULL,
  PRIMARY KEY (`canvasCourse_courseID`, `canvasStudent_studID`),
  INDEX `fk_canvasCourse_has_canvasStudent_canvasStudent1_idx` (`canvasStudent_studID` ASC) VISIBLE,
  INDEX `fk_canvasCourse_has_canvasStudent_canvasCourse1_idx` (`canvasCourse_courseID` ASC) VISIBLE,
  CONSTRAINT `fk_canvasCourse_has_canvasStudent_canvasCourse1`
    FOREIGN KEY (`canvasCourse_courseID`)
    REFERENCES `mydb`.`canvasCourse` (`courseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_canvasCourse_has_canvasStudent_canvasStudent1`
    FOREIGN KEY (`canvasStudent_studID`)
    REFERENCES `mydb`.`canvasStudent` (`studID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`EpokKursDB`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`EpokKursDB` ;

CREATE TABLE IF NOT EXISTS `mydb`.`EpokKursDB` (
  `kursID` INT NOT NULL,
  `kursKod` VARCHAR(45) NULL,
  PRIMARY KEY (`kursID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`EpokModuler`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`EpokModuler` ;

CREATE TABLE IF NOT EXISTS `mydb`.`EpokModuler` (
  `modulID` INT NOT NULL,
  `EpokKursDB_kursID` INT NOT NULL,
  `modulNamn` VARCHAR(45) NULL,
  PRIMARY KEY (`modulID`, `EpokKursDB_kursID`),
  INDEX `fk_EpokModuler_EpokKursDB1_idx` (`EpokKursDB_kursID` ASC) VISIBLE,
  CONSTRAINT `fk_EpokModuler_EpokKursDB1`
    FOREIGN KEY (`EpokKursDB_kursID`)
    REFERENCES `mydb`.`EpokKursDB` (`kursID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`itsAdminDB`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`itsAdminDB` ;

CREATE TABLE IF NOT EXISTS `mydb`.`itsAdminDB` (
  `personNR` BIGINT NOT NULL,
  `studID` VARCHAR(45) NULL,
  `förNamn` VARCHAR(45) NULL,
  `efterNamn` VARCHAR(45) NULL,
  `studUser` VARCHAR(45) NULL,
  PRIMARY KEY (`personNR`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`LadokDB`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`LadokDB` ;

CREATE TABLE IF NOT EXISTS `mydb`.`LadokDB` (
  `personNR` BIGINT NOT NULL,
  `förNamn` VARCHAR(45) NULL,
  `efterNamn` VARCHAR(45) NULL,
  `betyg` VARCHAR(45) NULL,
  `ExDatum` VARCHAR(45) NULL,
  `modul` VARCHAR(45) NULL,
  `kursKod` VARCHAR(45) NULL,
  `kursNamn` VARCHAR(45) NULL,
  PRIMARY KEY (`personNR`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


