const Sequelize = require('sequelize');
const { TEXT, STRING, DECIMAL, UUID, UUIDV4 } = Sequelize;
const connection = new Sequelize('postgres://localhost/acme_products_offering')

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

const mapPromise = ( items, model ) => {
    return Promise.all(items.map(item => model.create(item)));
};

const syncOrSwim = async () => {
    await connection.sync({ force: true});
    const products = [
        {name: 'Dopamine pills', suggestedPrice: 1.99 },
        {name: 'Paper', suggestedPrice: 100.00 },
        {name: 'Rabbit"s feet', suggestedPrice: 45.00 }
    ];
    const [dP, paper, rF] = await mapPromise(products, Product);

    const companies = [
        {name: 'Rite Aid'},
        {name: 'Staples'},
        {name: 'Bob"s Rabbit Store'}
    ];
    const [rA, staples, bRS] = await mapPromise(companies, Company);

    const offerings = [
        {price: 2.50},
        {price: 110.00},
        {price: 48.33}
    ];
    await mapPromise(offerings, Offering)
}

module.exports = {
    syncOrSwim,
    models: {
        Product,
        Company,
        Offering
    }
}