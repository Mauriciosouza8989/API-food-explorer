const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage")

class ProductsController {
    async index(req, res){
        const { name } = req.query; 
        let products;
        if(name){
            products = await knex("products")
                        .whereLike("name", `%${name}%`)
                        .orderBy("name");
        }else{
            products = await knex("products")
                        .select("*")
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
        const role = req.user.role;
        
        const diskStorage = new DiskStorage();

        if(!user_id){
          throw new AppError("Você não tem permissão para executar essta ação.");
        }

        const filename = await diskStorage.saveFile(image);
        if (role!== "admin") {
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
        const role = req.user.role;

        if(!user_id){
            throw new AppError("Você não tem permissão para executar essta ação.");
          }
        const diskStorage = new DiskStorage();
        const product = await knex.select("*").from("products").where({id}).first();
        await diskStorage.deleteFile(product.image)


        const filename = await diskStorage.saveFile(image);
        if (role !== "admin") {
          await diskStorage.deleteFile(image);
          throw new AppError("Você não tem permissão para executar essta ação.");
        }

        if(product.user_id !== user_id){
            throw new AppError("Você não tem permissão para atualizar este produto!");
        }

        if(product && product.id != id){
            throw new AppError("Já existe um produto cadastrado comeste nome!");
        }
        
        

        try{
            product.name = name ?? product.name;
            product.category = category ?? product.category;
            product.image = filename,
            product.price = price ?? product.price;
            product.description = description ?? product.description;
            product.updated_at = knex.fn.now();
        
            await knex('products').where({ id }).update(product);

            const product_id = product.id;

            await knex('ingredients').where({ product_id: product.id}).del()
            
            const arrayIngredients = ingredients.split(',');
            const insertIngredients = arrayIngredients.map(ingredient => {
              return {
                name: ingredient,
                product_id,
                user_id
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
        if(!user_id){
          throw new AppError("unauthorized", 401)
        }
        const user = await knex("users").where({role:"admin"}).first();
        if(!user) {
            throw new AppError("Você não tem permissão para deletar um produto!",401);
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
