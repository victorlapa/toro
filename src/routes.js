const { Router } = require('express');

const UserController = require('./app/controllers/UserController');

const router = Router();

router.get('/users', UserController.index);
router.post('/users', UserController.register);
router.put('/users/:id', UserController.update);

module.exports = router;
