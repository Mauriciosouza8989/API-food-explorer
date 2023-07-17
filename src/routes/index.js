const { Router } = require('express');
const routes = Router();

const usersRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");
const ingredientsRoutes = require("./ingredients.routes");
const sessionsRoutes = require("./sessions.routes");
const imageRoutes = require("./image.routes");

routes.use('/users', usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use('/produtos', productsRoutes);
routes.use('/ingredients', ingredientsRoutes);
routes.use('/image', imageRoutes);

module.exports = routes;