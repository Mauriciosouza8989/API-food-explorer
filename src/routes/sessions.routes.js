const { Router } = require("express");

const SessionsConttroller = require("../controllers/SessionsConttroller");
const sessionsController = new SessionsConttroller();

const sessionsRoutes = Router();

sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;