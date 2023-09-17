const {Router} = require("express");
const ingredientsRoutes = Router();
const ensureAuthenticated  = require("../middlewares/ensureAuthenticated");

const IngredientsController = require("../controllers/IngredientsController");
const ingredientsController = new IngredientsController();



ingredientsRoutes.get('/:product_id', ensureAuthenticated,ingredientsController.index);


module.exports = ingredientsRoutes;