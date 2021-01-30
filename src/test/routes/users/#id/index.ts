import { Router } from "express";
import { check } from "../../../../check";

const app = Router();

app.get("/", (req, res) => {
	console.log(req.params);
	res.send("USER");
});

app.post("/", check({ test: String, $name: String }), (req, res) => {
	console.log(req.body);
	res.send("OK");
});

export default app;
