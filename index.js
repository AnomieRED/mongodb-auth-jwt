require('dotenv').config();
const express = require('express');
const mongoose = require('./connection/mongodb');

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(express.json())

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`);
});
