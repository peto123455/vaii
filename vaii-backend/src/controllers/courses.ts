import express, { Request, Response, NextFunction } from "express";
import Course from "../models/course";
import { Document } from "mongodb";
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

export const ListAllCourses = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!HasUserPermissions(req.user, Ranks.INSTRUCTOR)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });

    try {
        const courses = await Course.find({}).populate("user", "email");

        return res.json(courses);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ "error": "Niekde nastala chyba !" });
    }

    return res.status(404).send();
};

export const GetCourse = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!req.params.id) return res.status(401).json({ "error": "Nezadané ID !" });

    try {
        const user = req.user as Document;

        const course = await Course.findById(req.params.id).populate("user", "email");

        if ((course?.user as Document)._id != user.id && !HasUserPermissions(user, Ranks.INSTRUCTOR)) return res.status(401).json({ "error": "Neoprávnený prístup !" });

        return res.json(course);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ "error": "Niekde nastala chyba !" });
    }

    return res.status(404).send();
};

export const UpdateCourse = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.body.id;
    const theoryHoursCompleted = req.body.theoryHoursCompleted;
    const driveHoursCompleted = req.body.driveHoursCompleted;
    const notes = req.body.notes;
    const paid = req.body.paid;
    const completed = req.body.completed;

    if (!id || !theoryHoursCompleted || !driveHoursCompleted || !paid) return res.status(400).json({ "error": "Nezadali ste potrebné parametre !" });
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!HasUserPermissions(req.user, Ranks.INSTRUCTOR)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });

    try {
        const course = await Course.findByIdAndUpdate(id, {
            "theoryHoursCompleted": theoryHoursCompleted,
            "driveHoursCompleted": driveHoursCompleted,
            "notes": notes,
            "paid": paid,
            "completed": completed
        });

        return res.json(course);
    } catch (error) {
        console.log(error);
    }
    
    return res.status(404).json({ "error": "Nepodarilo sa nájsť kurz !" });
};

export const DeleteCourse = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.body.id;

    if (!id) return res.status(400).json({ "error": "Nezadali ste id !" });
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!HasUserPermissions(req.user, Ranks.ADMINISTRATOR)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });


    try {
        const course = await Course.findByIdAndDelete(id);

        return res.json(course);
    } catch (error) {
        console.log(error);
    }

    return res.status(404).json({ "error": "Nepodarilo sa nájsť kurz !" });
};

export const CompleteCourse = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.body.id;

    if (!id) return res.status(400).json({ "error": "Nezadali ste potrebné parametre !" });
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!HasUserPermissions(req.user, Ranks.INSTRUCTOR)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });

    try {
        const course = await Course.findByIdAndUpdate(id, {
            "complete": true
        });

        return res.json(course);
    } catch (error) {
        console.log(error);
    }
    
    return res.status(404).json({ "error": "Nepodarilo sa nájsť kurz !" });
};