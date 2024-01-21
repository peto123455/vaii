import express, { Request, Response } from "express";
import * as Auth from "../controllers/authentification";

const router = express.Router();

router.route('/user').get(Auth.UserInfo);
router.route('/ranks').get(Auth.RankList);
router.route('/login').post(Auth.Login);
router.route('/logout').post(Auth.Logout);
router.route('/register').post(Auth.Register);
router.route('/set-permissions').post(Auth.ChangePermissions);
router.route('/change-password').put(Auth.ChangePassword);

export default router;