import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	res.send("HI");
});

export default router;
