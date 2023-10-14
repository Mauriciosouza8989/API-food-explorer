const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../config/auth");
const {sign} = require("jsonwebtoken");

class SessionsConttroller{
    async create(req, res){
        const { email, password} = req.body;

        const user = await knex("users").where({ email }).first();

        if(!user){
            throw new AppError(`E-mail e/ou senha incorretos!`, 401);
        }
        const checkPassword = await compare(password, user.password);
        if(!checkPassword){
            throw new AppError(`E-mail e/ou sennha incorretos!`, 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({role: user.role}, secret, {
            subject: String(user.id),
            expiresIn
        })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 120 * 60 *1000
        })

        delete user.password;

        return res.json({user});
    }
}

module.exports = SessionsConttroller;