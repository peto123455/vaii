import express, { Request, Response, NextFunction } from "express";
import Course from "../models/course";
import Category from "../models/category";
import { Ranks, HasUserPermissions } from "../utils/ranks";

export const CreateCourse = async (req: Request, res: Response, next: NextFunction) => {

    const course = req.body.course;

    if (!course) return res.status(400).json({ "error": "Nezadali ste všetky potrebné parametre !" });
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });

    try {
        const category = await Category.findById(course);

        if (!category) return res.status(404).json(category);

        const user = req.user as Document;

        const newCourse = new Course({ 
            "user": user,
            "name": category.name, 
            "theoryHours": category.theoryHours, 
            "driveHours": category.driveHours, 
            "description": category.description, 
            "price": category.price 
        });

        await newCourse.save();

        return res.json(newCourse);
    } catch (error) {
        console.log(error);
        return res.json({ "error": "Niekde nastala chyba." })
    }
    
    return res.status(404).send();
};

export const ListCourses = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });

    try {
        const user = req.user as Document;

        const courses = await Course.find({ "user": user });

        return res.json(courses);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ "error": "Niekde nastala chyba !" });
    }

    return res.status(404).send();
};