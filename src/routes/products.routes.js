const {Router} = require("express");
const productsRoutes = Router();
const multer = require("multer");


const uploadConfig = require("../config/uploadConfig");
const upload = multer(uploadConfig.MULTER);

const ProductsController = require("../controllers/ProductsController");
const productsController = new ProductsController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

productsRoutes.use(ensureAuthenticated);

productsRoutes.get('/', verifyUserAuthorization(["admin", "customer"]), productsController.index);
productsRoutes.get('/:id', verifyUserAuthorization(["admin", "customer"]), productsController.show);
productsRoutes.post('/', verifyUserAuthorization(["admin"]), upload.single("image"), productsController.create);
productsRoutes.put('/:id', verifyUserAuthorization(["admin"]), upload.single("image"), productsController.update);
productsRoutes.delete('/:id', verifyUserAuthorization(["admin"]), productsController.delete);



module.exports = productsRoutes;