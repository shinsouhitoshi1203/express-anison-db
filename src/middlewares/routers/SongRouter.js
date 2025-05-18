const { Router } = require("express");
const SongsController = require("../../controllers/SongsController");

const SongRouter = Router();

SongRouter.get("/:slug", SongsController.getSong);
SongRouter.get("/", SongsController.index);

module.exports = SongRouter;
