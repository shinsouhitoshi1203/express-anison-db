const { Router } = require("express");
const AnisonController = require("../../controllers/AnisonController");

const AnisonRouter = Router();
AnisonRouter.get("/", AnisonController.index);
AnisonRouter.get("/add", AnisonController.addSong);
AnisonRouter.post("/add", AnisonController.submitSong);

AnisonRouter.get("/:id/edit", AnisonController.editSong);
AnisonRouter.put("/:id", AnisonController.modifySong);
module.exports = AnisonRouter;

/* 

admin/anison -- view list
admin/anison/pisusain/edit -- edit
admin/anison/pisusain -- put / delete


*/
