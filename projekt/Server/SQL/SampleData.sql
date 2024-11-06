CREATE DATABASE IF NOT EXISTS `mydb`;
USE `mydb`;  -- Add this line
SET FOREIGN_KEY_CHECKS = 0;

INSERT INTO `canvasStudent` (`studID`, `studUser`, `firstName`, `lastName`, `email`) VALUES

(3080, 'melwil-8', 'Melinda', 'Wilson', 'melwil-8@student.ltu.se'),
(9916, 'wiljor-1', 'William', 'Jordan', 'wiljor-1@student.ltu.se'),
(7473, 'matgon-7', 'Matthew', 'Gonzalez', 'matgon-7@student.ltu.se'),
(3129, 'greall-1', 'Gregory', 'Allen', 'greall-1@student.ltu.se'),
(9673, 'caiwat-7', 'Caitlyn', 'Watson', 'caiwat-7@student.ltu.se'),
(5978, 'stejon-8', 'Stephanie', 'Jones', 'stejon-8@student.ltu.se'),
(2345, 'damcar-6', 'Damian', 'Carter', 'damcar-6@student.ltu.se'),
(4802, 'julmor-9', 'Julia', 'Morgan', 'julmor-9@student.ltu.se'),
(8321, 'jacbro-5', 'Jacob', 'Brown', 'jacbro-5@student.ltu.se'),
(9837, 'sarwil-2', 'Sarah', 'Williams', 'sarwil-2@student.ltu.se'),
(4231, 'marada-3', 'Marcus', 'Adams', 'marada-3@student.ltu.se'),
(6745, 'jamtho-4', 'James', 'Thompson', 'jamtho-4@student.ltu.se'),
(1649, 'lisjon-2', 'Lisa', 'Johnson', 'lisjon-2@student.ltu.se'),
(3541, 'patmil-6', 'Patrick', 'Miller', 'patmil-6@student.ltu.se'),
(2390, 'annand-8', 'Anna', 'Anderson', 'annand-8@student.ltu.se'),
(1932, 'matdav-1', 'Matthew', 'Davis', 'matdav-1@student.ltu.se'),
(4820, 'emijac-5', 'Emily', 'Jackson', 'emijac-5@student.ltu.se'),
(6573, 'kevcla-3', 'Kevin', 'Clark', 'kevcla-3@student.ltu.se'),
(9825, 'racle-7', 'Rachel', 'Lee', 'racle-7@student.ltu.se'),
(4628, 'micgil-4', 'Michael', 'Gilbert', 'micgil-4@student.ltu.se'),
(8391, 'robmit-2', 'Robert', 'Mitchell', 'robmit-2@student.ltu.se'),
(5132, 'sampar-5', 'Samantha', 'Parker', 'sampar-5@student.ltu.se'),
(3108, 'johbro-1', 'John', 'Brooks', 'johbro-1@student.ltu.se'),
(9203, 'kattho-6', 'Katherine', 'Thomas', 'kattho-6@student.ltu.se'),
(4327, 'geosmi-4', 'George', 'Smith', 'geosmi-4@student.ltu.se'),




(7290, 'davmor-2', 'David', 'Moore', 'davmor-2@student.ltu.se'),
(5642, 'rebwil-8', 'Rebecca', 'Williams', 'rebwil-8@student.ltu.se'),
(4319, 'andric-3', 'Andrew', 'Richards', 'andric-3@student.ltu.se'),
(2736, 'jenlaw-9', 'Jennifer', 'Lawson', 'jenlaw-9@student.ltu.se'),
(8934, 'fraste-2', 'Frank', 'Stewart', 'fraste-2@student.ltu.se'),
(6172, 'carwal-3', 'Carol', 'Walker', 'carwal-3@student.ltu.se'),
(4710, 'debwil-6', 'Deborah', 'Wilson', 'debwil-6@student.ltu.se'),
(2917, 'paugre-7', 'Paul', 'Green', 'paugre-7@student.ltu.se'),

(5832, 'robbro-5', 'Roberta', 'Brown', 'robbro-5@student.ltu.se'),
(3419, 'micgar-8', 'Michelle', 'Garcia', 'micgar-8@student.ltu.se'),
(1940, 'tomyou-9', 'Tom', 'Young', 'tomyou-9@student.ltu.se'),
(2598, 'liswil-1', 'Lisa', 'Williams', 'liswil-1@student.ltu.se'),
(6521, 'johjac-2', 'John', 'Jacobs', 'johjac-2@student.ltu.se'),
(9735, 'sartho-5', 'Sara', 'Thompson', 'sartho-5@student.ltu.se'),
(4817, 'katdav-6', 'Katherine', 'Davis', 'katdav-6@student.ltu.se'),
(8324, 'mikbro-3', 'Mike', 'Brown', 'mikbro-3@student.ltu.se'),

(2836, 'annwil-7', 'Anna', 'Wilson', 'annwil-7@student.ltu.se'),
(9204, 'nicmit-2', 'Nicole', 'Mitchell', 'nicmit-2@student.ltu.se'),
(5912, 'laujon-9', 'Lauren', 'Jones', 'laujon-9@student.ltu.se'),
(4238, 'emifat-4', 'Emily', 'Fate', 'emifat-4@student.ltu.se'),
(3610, 'tammil-1', 'Tamara', 'Mills', 'tammil-1@student.ltu.se'),
(5731, 'davhow-5', 'David', 'Howard', 'davhow-5@student.ltu.se'),
(6129, 'janada-7', 'Janet', 'Adams', 'janada-7@student.ltu.se'),
(8092, 'microd-8', 'Michael', 'Rodgers', 'microd-8@student.ltu.se'),
(4812, 'katbro-3', 'Kathy', 'Brown', 'katbro-3@student.ltu.se');




INSERT INTO canvasCourse (courseID, courseKod, courseNamn, courseTerm) VALUES
(1,'D0031N', 'SOA', 'HT2024'),
(2,'D0024E', 'Webbutveckling', 'VT2025');


INSERT INTO canvasCourse_has_canvasStudent (canvasCourse_courseID, canvasStudent_studID) VALUES
(1, 3080),
(1, 9916),
(1, 7473),
(1, 3129),
(1, 9673),
(1, 5978),
(1, 2345),
(1, 4802),
(1, 8321),
(1, 9837),
(1, 4231),
(1, 6745),
(1, 1649),
(1, 3541),
(1, 2390),
(1, 1932),
(1, 4820),
(1, 6573),
(1, 9825),
(1, 4628),
(1, 8391),
(1, 5132),
(1, 3108),
(1, 9203),
(1, 4327),
(2, 7290),
(2, 5642),
(2, 4319),
(2, 2736),
(2, 8934),
(2, 6172),
(2, 4710),
(2, 2917),
(2, 5832),
(2, 3419),
(2, 1940),
(2, 2598),
(2, 6521),
(2, 9735),
(2, 4817),
(2, 8324),
(2, 2836),
(2, 9204),
(2, 5912),
(2, 4238),
(2, 3610),
(2, 5731),
(2, 6129),
(2, 8092),
(2, 4812);






INSERT INTO courseAssignments (courseAssignmentID, assignmentName, canvasCourse_courseID) VALUES

-- Assignments for SOA
(1, 'Assignment_1_SOA', 1),
(2, 'Assignment_2_SOA', 1),
(3, 'Assignment_3_SOA', 1),
(4, 'Assignment_4_SOA', 1),
(5, 'Assignment_5_SOA', 1),

-- Assignments for Webbutveckling
(6, 'Assignment_1_Web', 2),
(7, 'Assignment_2_Web', 2),
(8, 'Assignment_3_Web', 2),
(9, 'Assignment_4_Web', 2),
(10, 'Assignment_5_Web', 2);



INSERT INTO assignmentGrades (assignmentGradeID, gradesToAssignmentFK, canvasStudent_studID, date, assignmentGrade) VALUES
(1, 1, 3080, '2024-01-10', 'G'),
(2, 1, 9916, '2024-01-10', 'VG'),
(3, 1, 7473, '2024-01-10', 'F'),
(4, 1, 3129, '2024-01-10', 'G'),
(5, 1, 9673, '2024-01-10', 'VG'),
(6, 1, 5978, '2024-01-10', 'F'),
(7, 1, 2345, '2024-01-10', 'G'),
(8, 1, 4802, '2024-01-10', 'VG'),
(9, 1, 8321, '2024-01-10', 'G'),
(10, 1, 9837, '2024-01-10', 'G'),
(11, 1, 4231, '2024-01-10', 'F'),
(12, 1, 6745, '2024-01-10', 'F'),
(13, 1, 1649, '2024-01-10', 'G'),
(14, 1, 3541, '2024-01-10', 'VG'),
(15, 1, 2390, '2024-01-10', 'F'),
(16, 1, 1932, '2024-01-10', 'G'),
(17, 1, 4820, '2024-01-10', 'VG'),
(18, 1, 6573, '2024-01-10', 'G'),
(19, 1, 9825, '2024-01-10', 'G'),
(20, 1, 4628, '2024-01-10', 'VG'),
(21, 1, 8391, '2024-01-10', 'G'),
(22, 1, 5132, '2024-01-10', 'G'),
(23, 1, 3108, '2024-01-10', 'VG'),
(24, 1, 9203, '2024-01-10', 'G'),
(25, 1, 4327, '2024-01-10', 'G'),
(26, 6, 7290, '2024-01-10', 'G'),
(27, 6, 5642, '2024-01-10', 'VG'),
(28, 6, 4319, '2024-01-10', 'F'),
(29, 6, 2736, '2024-01-10', 'G'),
(30, 6, 8934, '2024-01-10', 'VG'),
(31, 6, 6172, '2024-01-10', 'F'),
(32, 6, 4710, '2024-01-10', 'G'),
(33, 6, 2917, '2024-01-10', 'VG'),
(34, 6, 5832, '2024-01-10', 'G'),
(35, 6, 3419, '2024-01-10', 'VG'),
(36, 6, 1940, '2024-01-10', 'F'),
(37, 6, 2598, '2024-01-10', 'G'),
(38, 6, 6521, '2024-01-10', 'VG'),
(39, 6, 9735, '2024-01-10', 'F'),
(40, 6, 4817, '2024-01-10', 'G'),
(41, 6, 8324, '2024-01-10', 'VG'),
(42, 6, 2836, '2024-01-10', 'G'),
(43, 6, 9204, '2024-01-10', 'VG'),
(44, 6, 5912, '2024-01-10', 'F'),
(45, 6, 4238, '2024-01-10', 'G'),
(46, 6, 3610, '2024-01-10', 'VG'),
(47, 6, 5731, '2024-01-10', 'F'),
(48, 6, 6129, '2024-01-10', 'G'),
(49, 6, 8092, '2024-01-10', 'VG'),
(50, 6, 4812, '2024-01-10', 'G');



INSERT INTO itsAdminDB (personNR, studID, förNamn, efterNamn, studUser) VALUES
(198310246824, 3080, 'Melinda', 'Wilson', 'melwil-8'),
(199705156524, 9916, 'William', 'Jordan', 'wiljor-1'),
(200007222548, 7473, 'Matthew', 'Gonzalez', 'matgon-7'),
(198112031509, 3129, 'Gregory', 'Allen', 'greall-1'),
(198603135270, 9673, 'Caitlyn', 'Watson', 'caiwat-7'),
(198401165096, 5978, 'Stephanie', 'Jones', 'stejon-8'),
(199205048101, 2345, 'Damian', 'Carter', 'damcar-6'),
(200311011860, 4802, 'Julia', 'Morgan', 'julmor-9'),
(199112251530, 8321, 'Jacob', 'Brown', 'jacbro-5'),
(199507073007, 9837, 'Sarah', 'Williams', 'sarwil-2'),
(200105039179, 4231, 'Marcus', 'Adams', 'marada-3'),
(199101158107, 6745, 'James', 'Thompson', 'jamtho-4'),
(199112101045, 1649, 'Lisa', 'Johnson', 'lisjon-2'),
(198807178785, 3541, 'Patrick', 'Miller', 'patmil-6'),
(199909241418, 2390, 'Anna', 'Anderson', 'annand-8'),
(198903207907, 1932, 'Matthew', 'Davis', 'matdav-1'),
(200108226200, 4820, 'Emily', 'Jackson', 'emijac-5'),
(199508228569, 6573, 'Kevin', 'Clark', 'kevcla-3'),
(198511111284, 9825, 'Rachel', 'Lee', 'racle-7'),
(199405056548, 4628, 'Michael', 'Gilbert', 'micgil-4'),
(200007146376, 8391, 'Robert', 'Mitchell', 'robmit-2'),
(199111065082, 5132, 'Samantha', 'Parker', 'sampar-5'),
(199404249932, 3108, 'John', 'Brooks', 'johbro-1'),
(200405102819, 9203, 'Katherine', 'Thomas', 'kattho-6'),
(200307125178, 4327, 'George', 'Smith', 'geosmi-4'),
(198607279914, 7290, 'David', 'Moore', 'davmor-2'),
(198605036618, 5642, 'Rebecca', 'Williams', 'rebwil-8'),
(200105264913, 4319, 'Andrew', 'Richards', 'andric-3'),
(198808181843, 2736, 'Jennifer', 'Lawson', 'jenlaw-9'),
(200109254197, 8934, 'Frank', 'Stewart', 'fraste-2'),
(198606024879, 6172, 'Carol', 'Walker', 'carwal-3'),
(198410174807, 4710, 'Deborah', 'Wilson', 'debwil-6'),
(199604014996, 2917, 'Paul', 'Green', 'paugre-7'),
(198401075471, 5832, 'Roberta', 'Brown', 'robbro-5'),
(199710273402, 3419, 'Michelle', 'Garcia', 'micgar-8'),
(198503284718, 1940, 'Tom', 'Young', 'tomyou-9'),
(200202244683, 2598, 'Lisa', 'Williams', 'liswil-1'),
(199612204593, 6521, 'John', 'Jacobs', 'johjac-2'),
(198808227453, 9735, 'Sara', 'Thompson', 'sartho-5'),
(199309183038, 4817, 'Katherine', 'Davis', 'katdav-6'),
(200104285938, 8324, 'Mike', 'Brown', 'mikbro-3'),
(199201175258, 2836, 'Anna', 'Wilson', 'annwil-7'),
(200001274071, 9204, 'Nicole', 'Mitchell', 'nicmit-2'),
(198909129676, 5912, 'Lauren', 'Jones', 'laujon-9'),
(198102243631, 4238, 'Emily', 'Fate', 'emifat-4'),
(198803156034, 3610, 'Tamara', 'Mills', 'tammil-1'),
(198211127581, 5731, 'David', 'Howard', 'davhow-5'),
(200006273890, 6129, 'Janet', 'Adams', 'janada-7'),
(198002134180, 8092, 'Michael', 'Rodgers', 'microd-8'),
(198509271055, 4812, 'Kathy', 'Brown', 'katbro-3');

-- Insert courses into EpokKursDB
INSERT INTO EpokKursDB (kursID, kursKod) VALUES
(1, 'D0031N'),
(2, 'D0024E');

-- Insert modules for each course into EpokModuler
-- Modules for D0031N
-- Modules for D0031N (SOA)
INSERT INTO EpokModuler (modulID, EpokKursDB_kursID, modulNamn) VALUES
(1, 1, 'Modul 1 Introduction to SOA'),
(2, 1, 'Modul 2 SOA Architecture'),
(3, 1, 'Modul 3 SOA Implementation'),
(4, 1, 'Modul 4 SOA Case Studies'),
(5, 1, 'Modul 5 SOA Tentamen');

-- Modules for D0024E (Web Development)
INSERT INTO EpokModuler (modulID, EpokKursDB_kursID, modulNamn) VALUES
(6, 2, 'Modul 1 Introduction to Web Development'),
(7, 2, 'Modul 2 Frontend Development'),
(8, 2, 'Modul 3 Backend Development'),
(9, 2, 'Modul 4 Full-Stack Integration'),
(10, 2, 'Modul 5 Web Development Project');





SET FOREIGN_KEY_CHECKS = 1;


