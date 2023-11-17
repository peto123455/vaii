import express, { Request, Response } from "express";
import { CreateCategory, ListCategories, DeleteCategory } from "../controllers/categories";

const router = express.Router();

router.route('/create').post(CreateCategory);
router.route('/list').get(ListCategories);
router.route('/delete').post(DeleteCategory);

export default router;