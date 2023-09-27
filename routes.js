const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contactController = require('./src/controllers/contactController');
const { loginRequired } = require('./src/middlewares/middleware')

// Home router
route.get('/', homeController.index);

// Login router
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/signin', loginController.login)
route.get('/login/logout', loginController.logout)

// Contact router
route.get('/contact', loginRequired, contactController.index)
route.post('/contact/register', loginRequired, contactController.register)
route.get('/contact/:id', loginRequired, contactController.editIndex)
route.post('/contact/edit/:id', loginRequired, contactController.edit)
route.get('/contact/delete/:id', loginRequired, contactController.delete)


module.exports = route;
