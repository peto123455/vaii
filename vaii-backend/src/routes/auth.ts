import express, { Request, Response } from "express";
import { UserInfo, Login, Logout, Register, ChangePassword } from "../controllers/authentification";

const router = express.Router();

router.route('/user').get(UserInfo);
router.route('/login').post(Login);
router.route('/logout').post(Logout);
router.route('/register').post(Register);
router.route('/change-password').post(ChangePassword);

export default router;