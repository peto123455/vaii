import express, { Request, Response } from "express";
import * as Course from "../controllers/courses";

const router = express.Router();

router.route('/').post(Course.CreateCourse)
    .get(Course.ListCourses);

export default router;