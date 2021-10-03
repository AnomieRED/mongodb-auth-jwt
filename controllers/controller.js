const Users = require('../models/model.users');
const Role = require('../models/model.role');
const bcrypt = require('bcryptjs');

class Controller {
	async registration(req, res) {
		try {
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
}

module.exports = new Controller();
