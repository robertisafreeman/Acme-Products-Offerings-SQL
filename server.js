const express = require('express');
const {syncOrSwim, models: {Product, Company, Offering}} = require('./db');
const app = express();
const path = require('path');


syncOrSwim()
    .then(()=> {
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`0 to ${port}, real quick`))
        
    })
