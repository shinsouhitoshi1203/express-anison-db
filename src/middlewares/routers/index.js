const AdminRouter = require("./AdminRouter");
const SiteRouter = require("./SiteRouter");
const SongRouter = require("./SongRouter");

function router(app) {
	app.use("/songs", SongRouter);
	app.use("/admin", AdminRouter);
	app.use("/", SiteRouter);
}

module.exports = router;
