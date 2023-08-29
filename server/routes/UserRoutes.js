import { Express } from "express";

const router = Express.Router();

router.get('/', (req, res) => {
    res.send("output all workouts");
});

export default router;