const mongoose = require('mongoose');

const DB_CONNECT = process.env.DB_URL || 'mongodb://localhost:27017';

async function startMongo() {
	try {
		await mongoose.connect(DB_CONNECT, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`Successfylly connected to database`);
	} catch (error) {
		console.log('Server error', error.message);
	}
}

startMongo();

module.exports = mongoose;
