const { Schema } = require("mongoose");
const unidecode = require("unidecode");
const SongSchema = new Schema({
	title: { type: String, required: true },
	year: String,
	album: { type: String, default: "<untitled album>" },
	thumb: { type: String, required: true },
	artist: { type: String, required: true, default: "V.A." },
	slug: {
		type: String,
		slug: "title",
		unique: true,
		transform: (x) => unidecode(x)
	},
	lyric: String
});
SongSchema.virtual("yt").get(function () {
	return "https://youtube.com/watch?v=" + this.thumb;
});
SongSchema.virtual("img").get(function () {
	return `https://i3.ytimg.com/vi/${this.thumb}/maxresdefault.jpg`; //https://img.youtube.com/vi/smth/0.jpg
});
SongSchema.virtual("lyrics").get(function () {
	if (this.lyric) {
		return this.lyric.split("\n");
	} else {
		return [];
	}
});
module.exports = SongSchema;
