const {Router} = require("express");
const productsRoutes = Router();
const multer = require("multer");

const uploadConfig = require("../config/uploadConfig");
const upload = multer(uploadConfig.MULTER);

const ProductsController = require("../controllers/ProductsController");
const productsController = new ProductsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


productsRoutes.get('/', productsController.index);
productsRoutes.get('/:id', productsController.show);
productsRoutes.post('/', ensureAuthenticated, upload.single("image"), productsController.create);
productsRoutes.put('/:id', ensureAuthenticated, productsController.update);
productsRoutes.delete('/:id', ensureAuthenticated, productsController.delete);


module.exports = productsRoutes;