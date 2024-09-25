import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row, fields] = await db.execute(
    `SELECT
    user.Email,
    user.PhoneNumber,
    doctor.Name,
    doctor.Birthday,
    doctor.gender,
    doctor.Avatar,
    doctor.ScoreEvaluate,
    doctor.AssociateProfessor,
    doctor.NumberEvaluate,
    medicalSpecialty.NameMedicalSpecialty
    FROM
    user JOIN doctor ON user.Id = doctor.Id
    JOIN medicalSpecialty ON doctor.IdMedicalSpecialty = medicalSpecialty.Id`
  );
  return row;
};

exports.getId = async (id) => {
  const [row, fields] = await db.execute(
    `SELECT
    user.Id,
    user.Email,
    user.PhoneNumber,
    doctor.Name,
    doctor.Birthday,
    doctor.gender,
    doctor.Avatar,
    doctor.ScoreEvaluate,
    doctor.AssociateProfessor,
    doctor.NumberEvaluate,
    medicalSpecialty.NameMedicalSpecialty
    FROM
    user JOIN doctor ON user.Id = doctor.Id
    JOIN medicalSpecialty ON doctor.IdMedicalSpecialty = medicalSpecialty.Id
    WHERE user.Id = ${id}`
  );
  return row;
};

exports.getDoctorSalient = async () => {
  const [row, fields] =
    await db.execute(`SELECT user.Id, user.Email, user.PhoneNumber, doctor.Name, doctor.Birthday, doctor.Gender, doctor.Avatar, doctor.ScoreEvaluate, doctor.AssociateProfessor,  medicalSpecialty.NameMedicalSpecialty, doctor.NumberEvaluate
                        FROM user
                        JOIN doctor ON user.Id = doctor.Id
                        JOIN medicalSpecialty ON doctor.IdMedicalSpecialty = medicalSpecialty.Id  
                        ORDER BY doctor.ScoreEvaluate DESC
                        LIMIT 2; `);
  return row;
};

exports.add = async (id, doctorBody, avatar) => {
  const [row, fields] = await db.execute(
    `INSERT INTO 
      doctor(Id, Name, Birthday, Gender, Avatar,ScoreEvaluate, AssociateProfessor, NumberEvaluate, IdMedicalSpecialty) 
      VALUES (${id}, '${doctorBody.name}', '${doctorBody.birthday}', '${doctorBody.gender}', '${avatar}' ,${doctorBody.scoreEvaluate}, '${doctorBody.associateProfessor}', ${doctorBody.numberEvaluate}, ${doctorBody.idMedicalSpecialty})`
  );
  return row;
};

exports.update = async (id, doctorBody, avatar) => {
  const [row, fields] = await db.execute(
    `UPDATE doctor
      SET
        Name = '${doctorBody.name}',
        Birthday = '${doctorBody.birthday}',
        Gender = '${doctorBody.gender}',
        Avatar = '${avatar}',
        ScoreEvaluate = ${doctorBody.scoreEvaluate},
        AssociateProfessor = '${doctorBody.associateProfessor}',
        NumberEvaluate = ${doctorBody.numberEvaluate},
        IdMedicalSpecialty = ${doctorBody.idMedicalSpecialty}
        WHERE Id = ${id}
    `
  );
  return row;
};

exports.updateNotImg = async (id, doctorBody) => {
  const [row, fields] = await db.execute(
    `UPDATE doctor
      SET
        Name = '${doctorBody.name}',
        Birthday = '${doctorBody.birthday}',
        Gender = '${doctorBody.gender}',
        ScoreEvaluate = ${doctorBody.scoreEvaluate},
        AssociateProfessor = '${doctorBody.associateProfessor}',
        NumberEvaluate = ${doctorBody.numberEvaluate},
        IdMedicalSpecialty = ${doctorBody.idMedicalSpecialty}
        WHERE Id = ${id}
    `
  );
  return row;
};

exports.delete = async (id) => {
  const [row, fields] = await db.execute(`DELETE FROM doctor WHERE Id = ${id}`);
  const [rowUser, fieldsUser] = await db.execute(`DELETE FROM user WHERE Id = ${id}`);
  return (row.affectedRows + rowUser.affectedRows);
};
