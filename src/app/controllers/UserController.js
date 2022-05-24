const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    const { orderBy } = request.query;

    const users = await UsersRepository.findAll(orderBy);

    response.json(users);
  }

  show() {

  }
}

module.exports = new UserController();
