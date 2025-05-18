class SiteController {
	// GET /
	index(req, res) {
		res.render("main", { pageTitle: "Multimedia" });
	}
}
module.exports = new SiteController();
