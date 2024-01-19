import express, { Request, Response } from "express";
import * as Course from "../controllers/courses";

const router = express.Router();

router.route('/').post(Course.CreateCourse)
    .get(Course.ListCourses);

router.route('/getById/:id').get(Course.GetCourse);

router.route('/listAll').get(Course.ListAllCourses);

export default router;