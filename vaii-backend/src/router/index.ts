import express, { Request, Response } from "express";
import { Login } from "../controllers/authentification";

const router = express.Router();

router.route('/auth/login').post(Login);

router.route('/').get((req: Request, res: Response) => {
    res.send(':)');
});

export default router;