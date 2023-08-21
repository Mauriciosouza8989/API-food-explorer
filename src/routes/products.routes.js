const {Router} = require("express");
const productsRoutes = Router();
const multer = require("multer");

const uploadConfig = require("../config/uploadConfig");
const upload = multer(uploadConfig.MULTER);

const ProductsController = require("../controllers/ProductsController");
const productsController = new ProductsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

productsRoutes.use(ensureAuthenticated);

productsRoutes.get('/', productsController.index);
productsRoutes.get('/:id', productsController.show);
productsRoutes.post('/', upload.single("image"), productsController.create);
productsRoutes.put('/:id', upload.single("image"), productsController.update);
productsRoutes.delete('/:id', productsController.delete);



module.exports = productsRoutes;