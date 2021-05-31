const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const sauceRoute = require('./routes/sauce');
const path = require('path');



mongoose.connect(process.env.mongoDbLink, /*!!!! variable d'envirenement */
{useNewUrlParser: true, useUnifiedTopology: true} )
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json()); /*changement : remplace bodyparser */

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoute);
app.use('/api/sauces', sauceRoute);

module.exports = app;