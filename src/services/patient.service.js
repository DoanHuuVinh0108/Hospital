import db from "../config/connectionDB";

exports.getAll = async () => {
  const [row, fields] = await db.execute(`SELECT 
        user.Email,
        user.PhoneNumber,
        patient.Name,
        patient.Birthday,
        patient.Address,
        patient.Profession,
        patient.gender,
        patient.Avatar,
        FROM user, patient WHERE user.Id = patient.Id`);
  return row;
};

exports.getId = async (id) => {
  const [row, fields] = await db.execute(`SELECT 
        user.Email,
        user.PhoneNumber,
        patient.Name,
        patient.Birthday,
        patient.Address,
        patient.Profession,
        patient.Gender,
        patient.Avatar,
        FROM user, patient WHERE user.Id = patient.Id AND user.Id = ${id}`);
  return row;
};

exports.add = async (id, patientBody, avatar) => {
  const [row, fields] = await db.execute(`INSERT INTO 
      patient(Id, Name, Birthday, Address, Profession, Gender, Avatar) 
      VALUES (${id}, '${patientBody.name}', '${patientBody.birthday}', '${patientBody.address}', '${patientBody.profession}', '${patientBody.gender}', '${avatar}')`);
  return row;
};

exports.update = async (id, patientBody, avatar) => {
  const [row, fields] = await db.execute(`UPDATE patient
      SET
        Name = '${patientBody.name}',
        Birthday = '${patientBody.birthday}',
        Address = '${patientBody.address}',
        Profession = '${patientBody.profession}',
        Gender = '${patientBody.gender}',
        Avatar = '${avatar}'
        WHERE Id = ${id}
    `);
  return row;
};

exports.updateNotImg = async (id, patientBody) => {
  const [row, fields] = await db.execute(`UPDATE patient
      SET
        Name = '${patientBody.name}',
        Birthday = '${patientBody.birthday}',
        Address = '${patientBody.address}',
        Profession = '${patientBody.profession}',
        Gender = '${patientBody.gender}',
        WHERE Id = ${id}
    `);
  return row;
};

exports.delete = async (id) => {
  const [row, fields] = await db.execute(
    `DELETE FROM patient WHERE Id = ${id}`
  );
  const [rowUser, fieldsUser] = await db.execute(
    `DELETE FROM user WHERE Id = ${id}`
  );
  return row.affectedRows + rowUser.affectedRows;
};
