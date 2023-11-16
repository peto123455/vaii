import express, { Request, Response } from "express";
import { Login, Register } from "../controllers/authentification";

const router = express.Router();

router.route('/login').post(Login);
router.route('/register').post(Register);

export default router;