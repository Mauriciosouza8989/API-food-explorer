const {Router} = require("express");
const usersRoutes = Router();

const UsersController = require("../controllers/UsersController");
const UsersValidatedController = require("../controllers/UsersValidatedController");
const usersController = new UsersController();
const usersValidatedController = new UsersValidatedController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");



usersRoutes.post('/', usersController.create);
// usersRoutes.get('/validated', ensureAuthenticated, usersValidatedController.index);
module.exports = usersRoutes;