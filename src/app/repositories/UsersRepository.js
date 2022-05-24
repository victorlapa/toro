const db = require('../../database');

class UsersRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT * FROM users
      ORDER BY users.name ${direction}
    `);

    return rows;
  }

  async create({
    name, password, cpf, salary, gender, politicallyExposed
  })
}

module.exports = new UsersRepository();
