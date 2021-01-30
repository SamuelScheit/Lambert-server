import { Router } from "express";

const app = Router();

app.get("/", (req, res) => {
	console.log(req.params);
	res.send("USERNAME");
});

export default app;
