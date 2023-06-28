const config = "../../../knexfile";

const knex = require("knex");

const connection = knex(config.development);

module.exports = connection;