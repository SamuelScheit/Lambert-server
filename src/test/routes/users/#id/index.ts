import { Router } from "express";
import { check } from "../../../../check";

const app = Router();

app.get("/", (req, res) => {
	console.log(req.params);
	res.send("USER");
});

app.post("/", check({ test: String }), (req, res) => {});

export default app;
