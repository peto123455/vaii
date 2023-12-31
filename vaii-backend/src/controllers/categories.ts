import express, { Request, Response, NextFunction } from "express";
import Category from "../models/category";
import { Ranks, HasUserPermissions } from "../utils/ranks";

export const CreateCategory = async (req: Request, res: Response, next: NextFunction) => {

    const name = req.body.name;
    const theoryHours = req.body.theoryHours;
    const driveHours = req.body.driveHours;
    const description = req.body.description;
    const price = req.body.price;

    if (!name || !theoryHours || !driveHours || !description || !price) return res.status(400).json({ "error": "Nezadali ste všetky potrebné parametre !" });
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!HasUserPermissions(req.user, Ranks.ADMINISTRATOR)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });

    if (isNaN(theoryHours) || isNaN(driveHours) || isNaN(price)) return res.status(400).json({ "error": "Hodiny a cena musí byť číslo !" });

    try {
        const newCategory = new Category({ "name": name, "theoryHours": theoryHours, "driveHours": driveHours, "description": description, "price": price });
        await newCategory.save().then().catch(() => {});

        return res.json(newCategory);
    } catch (error) {
        console.log(error);
        return res.json({ "error": "Niekde nastala chyba." })
    }
    
    return res.status(404).send();
};

export const ListCategories = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const categories = await Category.find({});

        return res.json(categories);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ "error": "Niekde nastala chyba !" });
    }

};

export const DeleteCategory = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.body.id;

    if (!id) return res.status(400).json({ "error": "Nezadali ste id !" });
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!HasUserPermissions(req.user, Ranks.ADMINISTRATOR)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });


    try {
        const categories = await Category.findByIdAndDelete(id);

        return res.json(categories);
    } catch (error) {
        console.log(error);
    }

    return res.status(404).json({ "error": "Nepodarilo sa nájsť kategóriu !" });
};

export const UpdateCategory = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.body.id;
    const name = req.body.name;
    const theoryHours = req.body.theoryHours;
    const driveHours = req.body.driveHours;
    const description = req.body.description;
    const price = req.body.price;

    if (!id || !name || !theoryHours || !driveHours || !description || !price) return res.status(400).json({ "error": "Nezadali ste potrebné parametre !" });
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!HasUserPermissions(req.user, Ranks.ADMINISTRATOR)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });


    try {
        const category = await Category.findByIdAndUpdate(id, {
            "name": name,
            "theoryHours": theoryHours,
            "driveHours": driveHours,
            "description": description,
            "price": price
        });

        return res.json(category);
    } catch (error) {
        console.log(error);
    }
    
    return res.status(404).json({ "error": "Nepodarilo sa nájsť kategóriu !" });
};