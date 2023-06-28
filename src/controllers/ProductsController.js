const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");


class ProductsController {
    async create(req, res){
        const { image, name, category, price, tags, description} = req.body; 
        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [3]);

        const checkProductExists = await database.run("SELECT * FROM products WHERE name = (?)", [name]);

        if (checkProductExists){
            throw new AppError("já existe um produto cadastrado com este nome!");
        }
        
        await database.run("INSERT INTO products (image, name, category, price, description) VALUES(?, ?, ?, ?)", [image, name, category, price, description]);


        return res.json({
            img,
            name,
            category,
            price, 
            tags,
            description
        })

    }
}

module.exports = ProductsController;