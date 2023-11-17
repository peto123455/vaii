import express, { Request, Response } from "express";
import { UserInfo, Login, Logout, Register } from "../controllers/authentification";

const router = express.Router();

router.route('/user').get(UserInfo);
router.route('/login').post(Login);
router.route('/logout').post(Logout);
router.route('/register').post(Register);

export default router;