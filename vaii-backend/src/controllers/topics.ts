import express, { Request, Response, NextFunction } from "express";
import Topic from "../models/topic";
import { Document } from "mongodb";
import { Ranks, HasUserPermissions } from "../utils/ranks";

export const CreateTopic = async (req: Request, res: Response, next: NextFunction) => {

    const title = req.body.title;
    const description = req.body.description;
    const image = req.body.image;

    if (!title || !description || !image) return res.status(400).json({ "error": "Nezadali ste všetky potrebné parametre !" });
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!HasUserPermissions(req.user, Ranks.ADMINISTRATOR)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });

    try {
        const user = req.user as Document;

        const newTopic = new Topic({ 
            "title": title,
            "description": description,
            "image": image
        });

        await newTopic.save();

        return res.json(newTopic);
    } catch (error) {
        console.log(error);
        return res.json({ "error": "Niekde nastala chyba." })
    }
};

export const ListTopics = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const courses = await Topic.find({});

        return res.json(courses);
    } catch (error) {
        console.log(error);
        return res.status(404).json({ "error": "Niekde nastala chyba !" });
    }
};

export const DeleteTopic = async (req: Request, res: Response, next: NextFunction) => {

    const topicId = req.body.id;

    if (!topicId) return res.status(400).json({ "error": "Nezadali ste id !" });
    if (!req.user) return res.status(401).json({ "error": "Nie ste prihlásený !" });
    if (!HasUserPermissions(req.user, Ranks.ADMINISTRATOR)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });


    try {
        const topic = await Topic.findByIdAndDelete(topicId);

        return res.json(topic);
    } catch (error) {
        console.log(error);
    }

    return res.status(404).json({ "error": "Nepodarilo sa nájsť kategóriu !" });
};