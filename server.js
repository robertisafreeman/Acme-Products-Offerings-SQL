const express = require('express');
const { syncOrSwim, models: { Product, Company, Offering } } = require('./db');
const app = express();
const path = require('path');

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

//app.use('/api', require('./api'));

syncOrSwim().then(() => {
	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`0 to ${port}, real quick`));
});
