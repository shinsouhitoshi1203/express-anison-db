const { Router } = require("express");
const AdminController = require("../../controllers/AdminController");
const AnisonRouter = require("./AnisonRouter");

const AdminRouter = Router();
AdminRouter.get("/", AdminController.index);
AdminRouter.use("/anison", AnisonRouter);
module.exports = AdminRouter;

/* 
admin/edit  / for users
admin/view ???

admin/anison -- view list



*/
