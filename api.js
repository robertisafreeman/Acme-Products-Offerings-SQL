const router = require('express').Router();
const { models: { Product, Company, Offering } } = require('./db');

const _routes = [
	{ path: '/products', model: Product },
	{ path: '/companies', model: Company },
	{ path: '/offerings', model: Offering }
];

_routes.forEach((route) => {
	router.get(route.path, async (req, res, next) => {
		try {
			res.send(await route.model.findAll());
		} catch (ex) {
			next(ex);
		}
	});
});

module.exports = router;
