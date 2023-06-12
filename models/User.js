const db = require('../db');

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

class User {
  static create(name, email, password) {
    const date = getDate();
    const sql = `
    INSERT INTO user(
      name,
      email,
      password,
      reg_date,
      last_visit_date,
      status
    )
    VALUES(
      '${name}',
      '${email}',
      '${password}',
      '${date}',
      '${date}',
      'active'
    )
    `;

    return db.execute(sql);
  }

  static login(id) {
    const date = getDate();
    const sql = `
    UPDATE user
    SET last_visit_date = '${date}'
    WHERE id = '${id}'
    `;

    return db.execute(sql);
  }

  static findOne(email) {
    const sql = `SELECT * FROM user WHERE email = '${email}'`;

    return db.execute(sql);
  }

  static findById(id) {
    const sql = `SELECT * FROM user WHERE id = '${id}'`;

    return db.execute(sql);
  }

  static getAll(limit, offset) {
    const sql = `SELECT * FROM user LIMIT ${limit} OFFSET ${offset}`;

    return db.execute(sql);
  }

  static countAll() {
    const sql = "SELECT count(*) AS 'count' FROM user";

    return db.execute(sql);
  }

  static changeStatus(ids, status) {
    let condition = '';
    if (ids.length > 1) {
      ids.slice(1).forEach((id) => {
        condition += ` OR id = '${id}'`;
      });
    }
    const sql = `
    UPDATE user
    SET status = '${status}'
    WHERE id = '${ids[0]}'${condition}
    `;

    return db.execute(sql);
  }

  static delete(ids) {
    let condition = '';
    if (ids.length > 1) {
      ids.slice(1).forEach((id) => {
        condition += ` OR id = '${id}'`;
      });
    }
    const sql = `
    DELETE FROM user
    WHERE id = '${ids[0]}'${condition}
    `;

    return db.execute(sql);
  }
}

module.exports = User;
