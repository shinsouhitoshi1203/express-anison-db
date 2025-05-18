const { model } = require("mongoose");
const SongSchema = require("../models/SongSchema");

class SongsController {
	// GET /songs
	async index(req, res) {
		try {
			const Songs = model("songs", SongSchema);
			const list = await Songs.find();
			res.render("pages/songs/list", {
				pageTitle: "Songs List",
				pageCSS: "songs/list",
				songs: list
			});
		} catch (error) {
			res.render("pages/songs/list", {
				pageTitle: "Songs List",
				pageCSS: "songs/list"
			});
		}
	}

	// GET /songs/kaidenshi
	async getSong(req, res) {
		const { slug } = req.params;
		if (slug) {
			try {
				const Songs = model("songs", SongSchema);
				const song = await Songs.findOne({ slug: slug });
				if (!song) {
					res.status(404).render("error", {
						pageTitle: "Error not found",
						message:
							"Theres an error when finding a song. Try again"
					});
				} else {
					res.render("pages/songs/info", {
						song,
						pageTitle: song.title,
						pageCSS: "songs/info"
					});
				}
			} catch (error) {
				res.status(404).render("error", {
					pageTitle: "Error not found",
					message: "Theres an error when finding a song. Try again"
				});
			}
		}
	}
}

module.exports = new SongsController();
