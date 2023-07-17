const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage")

class ImageController {
    async create(req, res){
        const {product_id} = req.params;
        
        const image = req.file.filename;
        const diskStorage = new DiskStorage();

        const filename = await diskStorage.saveFile(image);
        product.image = filename;
        await knex("products").update(product).where({ id: product_id });
    }
}
module.exports = ImageController;