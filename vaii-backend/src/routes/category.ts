import express, { Request, Response } from "express";
import * as Category from "../controllers/categories";

const router = express.Router();

router.route('/create').post(Category.CreateCategory);
router.route('/list').get(Category.ListCategories);
router.route('/delete').delete(Category.DeleteCategory);
router.route('/update').put(Category.UpdateCategory);

export default router;