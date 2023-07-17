const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { hash, compare } = require("bcryptjs");


class UsersController{
    async create(req, res){
        const { name, email, password } = req.body;

        const database = await sqliteConnection();

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(!email || !name || !password){
            throw new AppError("Erro: preencha todos os campos!");
        }
        if(checkUserExists){
            throw new AppError("Este email já está em uso!");
        }
        const hashedPassword = await hash(password, 8);

        await database.run("INSERT INTO users (name, email, password) VALUES(?, ?, ?)", [name, email, hashedPassword]);
       
        return res.status(201).json("USER CRIADO COM SUCESSO");
    }
    async update(req, res){
        const { name, email, oldPassword, newPassword} = req.body;
        const user_id = req.user.id;

        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

        if(!user){
            throw new AppError("Usuário não encontrado!");
        }
        const checkEmailExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if(checkEmailExists && checkEmailExists.id !== user.id){
            throw new AppError("Este email já está em uso!");
        }

        if(newPassword && !oldPassword){
            throw new AppError("Para atualizar a senha, insira a senha antiga!")
        }

        
        if(oldPassword){
            if(!newPassword){
                throw new AppError("Para aualizas sua senha, insira a nova senha!");
            }
            const checkPassword = await compare(oldPassword, user.password);
            if(!checkPassword){
                throw new AppError("A senha antiga não confere!");
            }
            const hashedPassword = await hash(newPassword, 8);
            user.password = hashedPassword;
        }


        user.name = name ?? user.name;
        user.email = email ?? user.email;

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?, 
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        )

        return res.status(200).json("Perfil atualizado com sucesso");
    }
}

module.exports = UsersController;