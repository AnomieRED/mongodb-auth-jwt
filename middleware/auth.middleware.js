const jwt = require('jsonwebtoken');
const KEY = process.env.SECRET_KEY;

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		console.log('Токен из заголовка ', token);
		if (!token) {
			return res.status(403).json({ message: 'Пользователь не авторизован' });
		}
		const decodedToken = jwt.verify(token, KEY);
		console.log('Декодированный токен ', decodedToken);
		req.user = decodedToken;
		next();
	} catch (error) {
		console.log(error);
		return res.status(403).json({ message: 'Пользователь не авторизован' });
	}
};
