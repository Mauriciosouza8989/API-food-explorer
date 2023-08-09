const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FavoritesController{
    async create(req, res) {
        const user_id = req.user.id;
        const { product_id } = req.params;

        const product = await knex("products").where({id: product_id}).first();
        if(!product){
            throw new AppError("Este produto não existe!")
        }

        await knex("favorites").insert({
            user_id,
            product_id
        });
        return res.status(201).json()

    }
    async index(req, res){
        const user_id = req.user.id;
        const favorites = await knex("favorites").where({user_id})
        return res.json(favorites);
    }
}

module.exports = FavoritesController;