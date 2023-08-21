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
        return res.json(products);
        
    }

    async create(req, res) {
        const { name, category, price, description, ingredients} = req.body;
        const image = req.file.filename;
        // return console.log(name, category, price, description, ingredients, image);
        const user_id = req.user.id;
        
        const diskStorage = new DiskStorage();

        if(!user_id){
          throw new AppError("Você não tem permissão para executar essta ação.");
        }

        const filename = await diskStorage.saveFile(image);
        if (user_id !== 1) {
          await diskStorage.deleteFile(image);
          throw new AppError("Você não tem permissão para executar essta ação.");
        }
        
      
      
        const checkIfProductExists = await knex("products").where({ name: name }).first();
        if (checkIfProductExists) {
          await diskStorage.deleteFile(image);
          throw new AppError("Já existe um produto cadastrado com este nome!");
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


        const arrayIngredients = ingredients.split(',');
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
    }


    async update(req, res){
        const { image, name, category, price, ingredients, description} = req.body; 
        const { id } = req.params;
        const user_id = req.user.id;

        if(!user_id){
            throw new AppError("Você não tem permissão para executar essta ação.");
          }

        const diskStorage = new DiskStorage();


        const filename = await diskStorage.saveFile(image);
        if (user_id !== 1) {
          await diskStorage.deleteFile(image);
          throw new AppError("Você não tem permissão para executar essta ação.");
        }

        const product = await knex.select("*").from("products").where({id}).first();
        if(product.user_id !== user_id){
            throw new AppError("Você não tem permissão para atualizar este produto!");
        }

        if(product && product.id != id){
            throw new AppError("Já existe um produto cadastrado comeste nome!");
        }
        
        

        try{
            await knex("products").where({id}).update(
                {
                    name,
                    description,
                    image: filename,
                    category,
                    price,
                    updated_at: knex.fn.now()
                }
            );
            const product_id = product.id;

            await knex('products').where({product_id }).del();
            const arrayIngredients = ingredients.split(',');
            const insertIngredients = arrayIngredients.map(ingredient => {
              return {
                name: ingredient,
              };
            });
        
            await knex("ingredients").insert(insertIngredients);

            return res.status(201).json({message: "Produto atualizado com sucesso!"});
        }catch(err){
            await diskStorage.deleteFile(image);
            throw new AppError("Opa, ocorreu algum erro!");
        }

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

        await knex('products').where({ id }).del();
        
        return res.json({
            message: "Produto deletado com sucesso!"
        });
        
    } 
    
}

module.exports = ProductsController;