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
    price: {
        type: DECIMAL
    }
});

const syncOrSwim = async () => {
    await connection.sync({ force: true});
    const products = [
        {name: 'Dopamine pills', suggestedPrice: 1.99 },
        {name: 'Staples', suggestedPrice: 100.00 },
        {name: 'Rabbit"s feet', suggestedPrice: 45.00 },
    ];
    const [dP, staples, rF] = await mapPromise(products, Product);
    const company = [
        {name: 'Rite Aid'},
        {name: 'Staples'},
        {name: 'Bob"s Rabbit Store'}
    ];
    const []
}