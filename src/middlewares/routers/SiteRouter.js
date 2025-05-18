const { Router } = require("express");
const SiteController = require("../../controllers/SiteController");

const SiteRouter = Router();
SiteRouter.get("/", SiteController.index);

module.exports = SiteRouter;
