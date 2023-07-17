const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage")

class ProductsController {
    async index(req, res){
        const { name } = req.query; 
        let products;
        if(name){
            products = await knex("products")
                        .where({user_id: 1})
                        .whereLike("name", `%${name}%`)
                        .orderBy("name");
        }else{
            products = await knex("products")
                        .where({user_id: 1})
                        .orderBy("name");
        }
        
        return res.json(products);
        
    }

    async show(req, res){
        const {id} = req.params;
        
        const products = await knex("products").where({id:id}).first();
        const ingredients = await knex("ingredients").where({product_id: id}).orderBy("name");
        
        return res.json({
            products,
            ingredients
        });
        
    }

    async create(req, res) {
        const { name, category, price, description, ingredients } = req.body;
        const arrayIngredients = ingredients.split(',');
        const image = req.file.filename;
        const user_id = req.user.id;

          const diskStorage = new DiskStorage();

          const filename = await diskStorage.saveFile(image);
      
        if (user_id !== 1) {
          throw new AppError("Você não tem permissão para executar essta ação.");
        }
      
      
        try {
          const checkIfProductExists = await knex("products").where({ name: name }).first();
          if (checkIfProductExists) {
            throw new AppError("Já existe um produto cadastrado com este nome!");
            return;
          }

          const [product] = await knex("products").insert({
            name,
            description,
            image: filename,
            category,
            price,
            user_id
          }).returning("*");
          const product_id = product.id;
      
          const insertIngredients = arrayIngredients.map(ingredient => {
            return {
              name: ingredient,
              product_id,
              user_id
            };
          });
      
          await knex("ingredients").insert(insertIngredients);

          
      
      
          return res.json({
            name,
            category,
            price,
            ingredients,
            description
          });
        } catch (error) {
          return res.status(400).json({ error: error.message });
        }
      }


    async update(req, res){
        const { image, name, category, price, ingredients, description} = req.body; 
        const { id } = req.params;
        const user_id = req.user.id;

        const product = await knex.select("*").from("products").where({id: id}).first();
        if(product.user_id !== user_id){
            throw new AppError("Você não tem permissão para atualizar este produto!");
        }

        if(product && product.id != id){
            throw new AppError("Já existe um produto cadastrado comeste nome!");
        }
        


        await knex("products").where({id: id}).update(
            {
                name,
                description,
                image,
                category,
                price,
                updated_at: knex.fn.now()
            }
        );
        return res.status(201).send("Produto atualizado!");

    }

    async delete(req, res){
        const {id} = req.params;
        const user_id = req.user.id;
        const user = await knex("users").where({email:"admin@admin.com"}).first();
        if(user_id !== user.id) {
            throw new AppError("Você não tem permissão para deletar um produto!");
        }
        const product = await knex('products').where({ id: id }).first();
        if(!product){
            throw new AppError("O produto não existe!");
        }

        await knex('products').where({ id: id }).del();
        
        return res.json({
            message: "Produto deletado com sucesso!"
        });
        
    } 
    
}

module.exports = ProductsController;