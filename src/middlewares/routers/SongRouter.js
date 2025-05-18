const { Router } = require("express");
const SongsController = require("../../controllers/SongsController");

const SongRouter = Router();
SongRouter.get("/add", SongsController.addSong);
SongRouter.post("/add", SongsController.submitSong);
SongRouter.get("/:slug", SongsController.getSong);
SongRouter.get("/", SongsController.index);

module.exports = SongRouter;
