const { model } = require("mongoose");
const SongSchema = require("../models/SongSchema");

const relPath = "pages/admin/anison/";
class AnisonController {
	// GET /admin
	async index(req, res, next) {
		// res.render(relPath);
		try {
			const Anisons = model("songs", SongSchema);
			const data = await Anisons.find().select("title artist thumb slug");
			res.render(relPath, {
				data,
				pageTitle: "List of anisons",
				pageCSS: "admin/anison/list"
			});
		} catch (error) {
			console.log(error);
			next();
		}
	}

	// GET admin/anison/add
	addSong(req, res) {
		res.render(relPath + "add", { pageTitle: "Add new song" });
	}

	// POST admin/anison/add
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
			res.status(403).render(relPath + "add", {
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
				res.status(400).render(relPath + "add", {
					pageTitle: "Cannot add new song",
					message: error
					//"Network connection to database has encountered an error."
				});
			}
		}
	}

	// GET admin/anison/fsdfsdfsdfsdfdsfsdfds/edit
	async editSong(req, res, next) {
		try {
			const { id } = req.params ?? {};
			if (!id) {
				res.status(404).redirect("/admin/anison");
			} else {
				const Songs = model("songs", SongSchema);
				const Anison = await Songs.findById(id);
				if (!Anison) {
					res.status(404).redirect("/admin/anison");
				} else {
					res.render(relPath + "edit", {
						data: Anison,
						pageTitle: "Edit " + Anison.title
					});
				}
			}
		} catch (error) {
			next(error);
		}
	}

	// PUT admin/anison/dfsdfsdfsdfsdfdsfsd
	async modifySong(req, res, next) {
		const { id } = req.params ?? {};
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

		if (!id) {
			res.status(400).redirect("/admin/anison");
		} else if (missing.length > 0) {
			res.status(403).render(relPath + "edit", {
				data: { title, artist, year, thumb, album },
				pageTitle: "Cannot edit new song",
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

				await Songs.updateOne({ _id: id }, { ...fields });
				res.status(200).redirect("/admin/anison");
			} catch (error) {
				res.status(400).render(relPath + "edit", {
					data: { title, artist, year, thumb, album },
					pageTitle: "Cannot edit new song",
					message: error
					//"Network connection to database has encountered an error."
				});
			}
		}
	}
}
module.exports = new AnisonController();
