import db from "../config/connectionDB";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

exports.getId = async (id) => {
  const [row, fields] = await db.execute(`SELECT * FROM user WHERE Id = ${id}`);
  return row;
};

exports.getEmail = async (userBody) => {
  const [row, fields] = await db.execute(
    `SELECT * FROM user WHERE Email = '${userBody.email}'`
  );
  return row;
};

exports.add = async (userBody) => {
  const passwordHash = await hashPassword(userBody.password);
  const [row, fields] = await db.execute(
    `INSERT INTO user(Password, Email, PhoneNumber, Role) VALUES ('${passwordHash}', '${userBody.email}', '${userBody.phonenumber}', 0)`
  );
  return row;
};

exports.update = async (id, userBody) => {
  const passwordHash = await hashPassword(userBody.password);
  const [row, fields] = await db.execute(
    `UPDATE user SET Password = '${passwordHash}', Email = '${userBody.email}', PhoneNumber = '${userBody.phonenumber}' WHERE Id = ${id}`
  );
  return row;
};

exports.delete = async (id) => {
  const [row, fields] = await db.execute(`DELETE FROM user WHERE Id = ${id}`);
  return row;
};

let hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      // console.log('>>> hashPassword', hashPassword);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};