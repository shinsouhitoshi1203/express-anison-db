const { default: mongoose } = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
async function connect(dbName) {
	const host = process.env.DB_HOST ?? "mongodb://localhost:27017/";
	const dbAddr = host + dbName;
	try {
		await mongoose.connect(dbAddr);
	} catch (error) {
		console.error(error.message);
		throw new Error(error);
	}
}

const db = {
	connect
};

module.exports = db;
