import { Router } from "express";
import { check } from "../../check";

const app = Router();

app.get("/", (req, res) => {
	res.send("HI");
});

app.post("/", check({ name: String }), (req, res) => {
	res.send(`Hi ${req.body.name}`);
});

export default app;
