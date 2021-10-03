const Users = require('../models/model.users');
const Role = require('../models/model.role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const KEY = process.env.SECRET_KEY;

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles,
	};
	return jwt.sign(payload, KEY, { expiresIn: '24h' });
};

class Controller {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ massage: 'Ошибка при регистрации', errors });
			}
			const { username, password } = req.body;
			const hasUser = await Users.findOne({ username });
			if (hasUser) {
				return res
					.status(400)
					.json({ massage: 'Пользователь с таким именем уже существует' });
			}
			const hashPassword = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: 'User' });
			const createUser = Users.create({
				username,
				password: hashPassword,
				roles: [userRole.value],
			});
			return res.json({ message: 'Пользователь успешно зарегистрирован' });
		} catch (error) {
			res.status(400).json({ message: 'Registaration error' });
		}
	}

	async login(req, res) {
		try {
			const { username, password } = req.body;
			const getUser = await Users.findOne({ username });
			if (!getUser) {
				return res.status(400).json({ message: `Пользователь ${username} не найдет` });
			}
			const validPassword = bcrypt.compareSync(password, getUser.password);
			if (!validPassword) {
				return res.status(400).json({ message: `Введен неверный пароль` });
			}
			const token = generateAccessToken(getUser._id, getUser.roles);
			return res.json({ token });
		} catch (error) {
			res.status(400).json({ message: 'Registaration error' });
		}
	}

	async getUsers(req, res) {
		try {

		} catch (error) {
			res.status(400).json({ message: 'Registaration error' });
		}
	}
}

module.exports = new Controller();
