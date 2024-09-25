CREATE TABLE user (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Password TEXT NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(255) UNIQUE NOT NULL,
    Role INT NOT NULL
);

CREATE TABLE medicalSpecialty(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    NameMedicalSpecialty VARCHAR(255) UNIQUE
);

CREATE TABLE doctor(
    Id INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Birthday DATE,
    Gender VARCHAR(255),
    Avatar LONGTEXT, 
    ScoreEvaluate float,
    AssociateProfessor VARCHAR(255),
    NumberEvaluate int,
    IdMedicalSpecialty INT,
    PRIMARY KEY(Id),
    FOREIGN KEY(Id) REFERENCES user(Id),
    FOREIGN KEY(IdMedicalSpecialty) REFERENCES medicalSpecialty(Id)
);

CREATE TABLE patient(
    Id INT,
    Name VARCHAR(255),
    Birthday DATE,
    Address VARCHAR(255),
    Profession VARCHAR(255),
    Gender VARCHAR(255),
    Avatar LONGTEXT,
    PRIMARY KEY(Id),
    FOREIGN KEY(Id) REFERENCES user(Id)
);

CREATE TABLE announcement(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Content text,
    DateTime DATETIME,
    Header VARCHAR(255),
    Status int,
    UserId int,
    FOREIGN KEY(UserId) REFERENCES user(id)
);

CREATE TABLE schedule(
    DateSchedule DATE,
    TimeStart Time,
    TimeEnd Time,
    DoctorId int,
    PRIMARY KEY(DateSchedule, TimeStart, TimeEnd, DoctorId),
    FOREIGN KEY(DoctorId) REFERENCES doctor(Id)
);

CREATE TABLE booking(
    DateBooking DATE,
    TimeStart TIME,
    TimeEnd TIME,
    PatientId INT,
    DoctorId INT,
    TimeBooking VARCHAR(255),
    Status INT,
    PRIMARY KEY(DateBooking, TimeStart, TimeEnd, PatientId, DoctorId),
    FOREIGN KEY(PatientId) REFERENCES patient(Id),
    FOREIGN KEY(DateBooking, TimeStart, TimeEnd, DoctorId) REFERENCES schedule(DateSchedule, TimeStart, TimeEnd, DoctorId)
);
