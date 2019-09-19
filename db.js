const Sequelize = require('sequelize');
const { TEXT, STRING, DECIMAL, UUID, UUIDV4 } = Sequelize;
const connection = new Sequelize('postgres://localhost/acme_products_offering');

const Product = connection.define('product', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4
	},
	name: STRING,
	suggestedPrice: DECIMAL
});

const Company = connection.define('company', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4
	},
	name: STRING
});

const Offering = connection.define('offering', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4
	},
	price: DECIMAL
});

Offering.belongsTo(Product);
Product.hasMany(Offering);
Offering.belongsTo(Company);
Company.hasMany(Offering);

const mapPromise = (items, model) => {
	return Promise.all(items.map((item) => model.create(item)));
};

const syncOrSwim = async () => {
	await connection.sync({ force: true });
	const products = [
		{ name: 'Dopamine pills', suggestedPrice: 1.99 },
		{ name: 'Paper', suggestedPrice: 100.0 },
		{ name: "Rabbit's feet", suggestedPrice: 45.0 }
	];
	const [ dP, paper, rF ] = await mapPromise(products, Product);

	const companies = [ { name: 'Rite Aid' }, { name: 'Staples' }, { name: "Bob's Rabbit Store" } ];
	const [ rA, staples, bRS ] = await mapPromise(companies, Company);

	const offerings = [
		{ price: 2.5, productId: dP.id, companyId: rA.id },
		{ price: 110.0, productId: paper.id, companyId: staples.id },
		{ price: 48.33, productId: rF.id, companyId: bRS.id }
	];
	await mapPromise(offerings, Offering);
};

module.exports = {
	syncOrSwim,
	models: {
		Product,
		Company,
		Offering
	}
};
