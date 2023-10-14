const { Router } = require('express');

const favoritesRoutes = Router();

const FavoritesController = require("../controllers/FavoritesController");
const favoritesController = new FavoritesController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");


favoritesRoutes.get("/", verifyUserAuthorization(["customer"]),ensureAuthenticated, favoritesController.index);
favoritesRoutes.post("/:product_id", verifyUserAuthorization(["customer"]), ensureAuthenticated, favoritesController.create);

module.exports = favoritesRoutes;