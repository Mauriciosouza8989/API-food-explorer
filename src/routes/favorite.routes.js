const { Router } = require('express');

const favoritesRoutes = Router();

const FavoritesController = require("../controllers/FavoritesController");
const favoritesController = new FavoritesController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


favoritesRoutes.get("/", ensureAuthenticated, favoritesController.index);
favoritesRoutes.post("/:product_id", ensureAuthenticated, favoritesController.create);

module.exports = favoritesRoutes;