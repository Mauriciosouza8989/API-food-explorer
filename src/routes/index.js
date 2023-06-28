const { Router } = require('express');
const routes = Router();

const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");

routes.use('/users', usersRoutes);
routes.use('/produtos', productsRoutes);

module.exports = routes;