const express = require("express");
const path = require("path");
const router = require("./src/middlewares/routers");
const db = require("./src/middlewares/db");

const app = express();
require("dotenv").config();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src/views"));

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router(app);
try {
	db.connect("user_db");
	app.listen(8000, () => {
		console.log("Server is loaded successfully");
	});
} catch (error) {
	console.error(error);
}
// https://img.youtube.com/vi/WSJQcgBAyys/0.jpg
