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

  async findById(id) {
    const [row] = await db.query(`
      SELECT * from users WHERE id = $1
    `, [id]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT * from users WHERE email = $1
    `, [email]);

    return row;
  }

  async findByCPF(cpf) {
    const [row] = await db.query(`
      SELECT * from users WHERE cpf = $1 
    `, [cpf]);

    return row;
  }

  async register({
    name, email, password, cpf, salary, gender, politically_exposed,
  }) {
    const [row] = await db.query(`
      INSERT INTO users(name, email, password, cpf, salary, gender, politically_exposed)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [name, email, password, cpf, salary, gender, politically_exposed]);

    return row;
  }

  async update(id, {
    name, email, password, salary, gender, politically_exposed,
  }) {
    const [row] = await db.query(`
      UPDATE users
      SET name = $1, email = $2, password = $3, salary = $4, gender = $5, politically_exposed = $6
      WHERE id = $7
      RETURNING name
    `, [name, email, password, salary, gender, politically_exposed, id]);

    return row;
  }
}

module.exports = new UsersRepository();
