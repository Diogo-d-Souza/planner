const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Home router
route.get('/', homeController.index);

// Login router
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/signin', loginController.login)
route.get('/login/logout', loginController.logout)

module.exports = route;
