class AdminController {
	// GET /admin
	index(req, res, next) {
		res.render("pages/admin/");
	}
}
module.exports = new AdminController();
