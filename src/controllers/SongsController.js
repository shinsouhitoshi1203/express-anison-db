const { model } = require("mongoose");
const SongSchema = require("../models/SongSchema");

class SongsController {
	// GET /songs
	async index(req, res) {
		try {
			const Songs = model("songs", SongSchema);
			const list = await Songs.find();
			res.render("songs", {
				pageTitle: "Songs List",
				pageCSS: "songs/list",
				songs: list
			});
		} catch (error) {
			res.render("songs", {
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
					res.render("songInfo", {
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

	// GET /songs/add
	addSong(req, res) {
		res.render("addSong", { pageTitle: "Add new song" });
	}

	// POST /songs/add
	async submitSong(req, res) {
		function getErrorMessage(missing) {
			let ErrorMessage = "";
			let m = missing.join(", ");
			ErrorMessage = m + (M == 2 ? " are" : " is") + " missing!";
			ErrorMessage =
				ErrorMessage[0].toUpperCase() + ErrorMessage.slice(1);
			return ErrorMessage;
		}
		const missing = [];
		const { title, artist, year, thumb, album } = req.body ?? {};
		if (!title) missing.push("title");
		if (!thumb) missing.push("thumbnail");
		const M = missing.length;

		if (missing.length > 0) {
			res.status(403).render("addSong", {
				pageTitle: "Cannot add new song",
				message: getErrorMessage(missing)
			});
		} else {
			try {
				const Songs = model("songs", SongSchema);
				const fields = {
					title,
					year,
					thumb
				};
				if (album) Object.assign(fields, { album });
				if (artist) Object.assign(fields, { artist });

				const newSong = new Songs(fields);
				await newSong.save();
				res.status(200).redirect("/songs");
			} catch (error) {
				res.status(400).render("addSong", {
					pageTitle: "Cannot add new song",
					message: error
					//"Network connection to database has encountered an error."
				});
			}
		}
	}
}

module.exports = new SongsController();
