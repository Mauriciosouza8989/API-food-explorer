const {Router} = require("express");
const imagesRoutes = Router();
const multer = require("multer");

const ImageController = require("../controllers/ImageController");
const imageController = new ImageController();

const uploadConfig = require("../config/uploadConfig");
const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");


imagesRoutes.patch('/:product_id', ensureAuthenticated, upload.single("image"), imageController.create);


module.exports = imagesRoutes;