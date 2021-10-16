import { Router } from "express";
import { check } from "../../../../check";

const app = Router();

app.get("/", (req, res) => {
	// @ts-ignore
	if (!req.params.id) return res.send('No user specified');
	console.log(req.params);
	res.send("USER");
});

app.post("/", check({ test: String, $name: String }), (req, res) => {
	console.log(req.body);
	res.send("OK");
});

export default app;
