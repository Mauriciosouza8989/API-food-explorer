const knex = require("../database/knex");

class IngredientsController{
    async index(req, res){
        const {product_id} = req.params;
        console.log(product_id) 
        const ingredients = await knex("ingredients").where({ product_id });

        return res.json(ingredients);
    }
}

module.exports = IngredientsController;