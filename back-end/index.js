import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { mongoose } from "mongoose";
import routes from "./src/routes/index.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ license: "50mb" }));
app.use(cors());
const port = process.env.PORT || 30002;
const password = process.env.MONGO_DB;

app.get("/", (req, res) => {
	res.status(200).json({
		name: "Minh",
	});
});

routes(app);

mongoose
	.connect(`${password}`)
	.then(() => console.log("success"))
	.catch((err) => console.log("fail"));

app.listen(port, (req, res, next) => {
	console.log("server successfully");
});
