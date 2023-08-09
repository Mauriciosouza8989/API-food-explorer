const knex = require("../database/knex");

class IngredientsController{
    async index(req, res){
        const {product_id} = req.params;
        const ingredients = await knex("ingredients").where({product_id}).orderBy("name");


        return res.json(ingredients);
    }
}

module.exports = IngredientsController;