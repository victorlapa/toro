/* eslint-disable no-plusplus */
const UsersRepository = require('../repositories/UsersRepository');

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const cpfRegex = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/g;
const numbersRegex = /\d/;

function verifyCPF(strCPF) {
  let sum;
  let rest;
  sum = 0;
  if (strCPF === '00000000000') return false;

  for (let i = 1; i <= 9; i++) sum += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(strCPF.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(strCPF.substring(10, 11), 10)) return false;
  return true;
}

class UserController {
  async index(request, response) {
    const { orderBy } = request.query;

    const users = await UsersRepository.findAll(orderBy);

    response.json(users);
  }

  async register(request, response) {
    const {
      name, email, password, cpf, salary, gender, politically_exposed,
    } = request.body;

    const cpfExists = await UsersRepository.findByCPF(cpf);
    const emailExists = await UsersRepository.findByEmail(email);

    if (!name && !email && !password && !cpf && !salary && !gender && !politically_exposed) {
      return response.status(400).json({ error: 'Please fill all required fields.' });
    }

    const nameCount = name.split(' ').length;

    if (cpfExists) {
      return response.status(400).json({ error: 'CPF is already being used.' });
    }

    if (emailExists) {
      return response.status(400).json({ error: 'Email is already being used.' });
    }

    if (!email.match(emailRegex)) {
      return response.status(400).json({ error: 'Invalid email format' });
    }

    if (!cpf.match(cpfRegex)) {
      return response.status(400).json({ error: 'Invalid CPF format' });
    }

    if (!password.match(passwordRegex)) {
      return response.status(400).json({ error: 'Invalid password format' });
    }

    if (name.match(numbersRegex)) {
      return response.status(400).json({ error: 'Name cannot contain numbers' });
    }

    if (gender !== 'M' && gender !== 'F' && gender !== 'O') {
      return response.status(400).json({ error: 'Please inform a gender male, female or other' });
    }

    if (nameCount <= 1) {
      return response.status(400).json({ error: 'Please inform your full name' });
    }

    if (typeof (politically_exposed) !== 'boolean') {
      return response.status(400).json({ error: 'Politically exposed must be true or false' });
    }

    if (typeof (salary) !== 'number') {
      return response.status(400).json({ error: 'Salary must be a number' });
    }

    if (!verifyCPF(cpf)) {
      return response.status(400).json({ error: 'Invalid cpf' });
    }

    const user = await UsersRepository.register({
      name, email, password, cpf, salary, gender, politically_exposed,
    });

    response.json(user);
  }

  async update(request, response) {
    const { id } = request.params;

    const {
      name, email, password, gender, salary, politically_exposed,
    } = request.body;

    const userExists = await UsersRepository.findById(id);
    const emailExists = await UsersRepository.findByEmail(email);
    const nameCount = await name.split(' ').length;

    if (!name && !email && !password && !gender && !salary && !politically_exposed) {
      return response.status(400).json({ error: 'Please fill all required fields' });
    }

    if (nameCount.length >= 1) {
      return response.status(400).json({ error: 'Please enter your full name' });
    }

    if (name.match(numbersRegex)) {
      return response.status(400).json({ error: 'Name cannot contain numbers' });
    }

    if (!userExists) {
      return response.json(400).status({ error: 'This user does not exist' });
    }

    if (emailExists && emailExists.id !== id) {
      return response.json(400).status({ error: 'This email is already taken' });
    }

    if (!email.match(emailRegex)) {
      return response.status(400).json({ error: 'Invalid email format' });
    }

    if (!password.match(passwordRegex)) {
      return response.status(400).json({ error: 'Invalid password format' });
    }

    if (gender !== 'M' && gender !== 'F' && gender !== 'O') {
      return response.status(400).json({ error: 'Please inform a gender male, female or other' });
    }

    if (typeof (politically_exposed) !== 'boolean') {
      return response.status(400).json({ error: 'Politically exposed must be true or false' });
    }

    if (typeof (salary) !== 'number') {
      return response.status(400).json({ error: 'Salary must be a number' });
    }

    const user = UsersRepository
      .update(id, {
        name, email, password, gender, salary, politically_exposed,
      });

    response.json(user);
  }
}

module.exports = new UserController();
