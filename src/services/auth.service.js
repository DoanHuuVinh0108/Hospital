import db from "../config/connectionDB";

exports.login = async (loginBody) => {
    const [row, fields] = await db.execute(`SELECT * FROM user, patient WHERE Email = '${loginBody.email}' AND Password = '${loginBody.password}' AND user.id = patient.id`);
    return row;
}