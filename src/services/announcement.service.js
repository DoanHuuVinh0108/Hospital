import db from '../config/connectionDB';
import moment from 'moment';
exports.getAll = async () => {
    const [row, field] = await db.execute(`SELECT * FROM announcement`);
    const formattedRows = row.map(item => {
        return {
            ...item,
            DateTime: moment(item.DateTime).format('YYYY-MM-DD HH:mm:ss')
        };
    });
    
    return formattedRows;
}

exports.getById = async (id) => {
    const [row, field] = await db.execute(`SELECT * FROM announcement WHERE Id = ?`, [id]);
    row.DateTime = moment(row.DateTime).format('YYYY-MM-DD HH:mm:ss');
    return row; 
}

exports.create = async (announcement) => {
    const [row, field] = await db.execute(`
        INSERT INTO announcement (Content, DateTime, Header, Status, UserId)
        VALUES (?, ?, ?, ?, ?)`, 
        [announcement.content, announcement.dateTime, announcement.header, announcement.status, announcement.userId]
    );
    return row;
}

exports.update = async (id, announcement) => {
    const [row, field] = await db.execute(`
        UPDATE announcement
        SET Content = ?, DateTime = ?, Header = ?, Status = ?, UserId = ?
        WHERE Id = ?`, 
        [announcement.content, announcement.dateTime, announcement.header, announcement.status, announcement.userId, id]
    );
    return row;
}

exports.delete = async (id) => {
    const [row, field] = await db.execute(`DELETE FROM announcement WHERE Id = ?`, [id]);
    return row;
}
