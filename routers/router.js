const Router = require('express');
const router = new Router();
const Controller = require('../controllers/controller');
const { check } = require('express-validator');
const authToken = require('../middleware/auth.middleware');
const roleToken = require('../middleware/role.middleware');

router.post(
	'/registration',
	[
		check('username', 'Имя полльзователя не может быть пустым').notEmpty(),
		check(
			'password',
			'Пароль должен быть больше 4 и меньше 16 символов'
		).isLength({ min: 4, max: 16 }),
	],
	Controller.registration
);
router.post('/login', Controller.login);
router.get('/users', roleToken(['Admin']), Controller.getUsers);

module.exports = router;
