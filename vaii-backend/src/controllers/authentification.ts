import express, { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt"
import passport from "passport";
import { Document } from "mongodb";
import { GetRankByLevel, HasUserPermissions, Ranks, ranks } from "../utils/ranks";

export const UserInfo = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user == undefined) return res.status(200).json({ error: "Nie ste prihlásený !" });
    
    const user = req.user as Document;

    res.json({
        id: user._id,
        email: user.email,
        permLevel: user.permLevel,
        rank: GetRankByLevel(user.permLevel)
    });
};

export const RankList = async (req: Request, res: Response, next: NextFunction) => {
    res.json(ranks);
};

export const Login = async (req: Request, res: Response, next: NextFunction) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ error: "Nesprávny formát !" });
    }

    passport.authenticate("local", (error: any, user: Document) => {
        //if (error) return res.status(500).send(error);
        if (error) return next(error);
        else if (!user) return res.status(401).json({ error: "Nesprávne meno alebo heslo !" });

        req.logIn(user, (error: any) => {
            //if (error) return res.status(500).send(error);
            if (error) return next(error);

            return res.json({
                id: user._id,
                email: user.email,
                permLevel: user.permLevel,
                rank: GetRankByLevel(user.permLevel)
            });
        });
    })(req, res, next);
};

export const Logout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (error) {
        if (error) console.log(error);
        res.json({ message: "Odhlásený !" });
    });
};

export const Register = async (req: Request, res: Response, next: NextFunction) => {

    var problems: Array<string> = [];

    const email = req.body.email;
    const password = req.body.password;
    //const confirmPassword = req.body.confirmPassword;

    if (!email || !password /*|| !confirmPassword*/) {
        problems.push("Neplatný vstup !");
    } else {
        if (!email.includes("@")) { //TODO: REGEX
            problems.push("Email musí byť platný !");
        }
    
        if (password.length < 6) {
            problems.push("Heslo musí obsahovať aspoň 6 znakov !");
        }
        
        if (password == password.toLowerCase() || password == password.toUpperCase()) {
            problems.push("Heslo musí obsahovať aspoň 1 veľký a malý znak !");
        }
    
        if (!password.match("[0-9]")) {
            problems.push("Heslo musí obsahovať aspoň 1 číslo !");
        }
    
        /*if (confirmPassword != password) {
            problems.push("Heslá sa nezhodujú !");
        }*/
    }

    if (problems.length == 0) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const newUser = new User({ "email": email, "password": hash });
            await newUser.save().then().catch(() => problems.push("Nebolo možné vytvoriť účet !"));
        } catch (error: any) {
            problems.push("Nebolo možné vytvoriť účet !");
        }
    }

    return res.send(problems);
};

export const ChangePassword = async (req: Request, res: Response, next: NextFunction) => {

    const password = req.body.password;
    const currentPassword = req.body.currentPassword;
    
    if (!password || !currentPassword ||
        password.length < 6 || 
        password == password.toLowerCase() || password == password.toUpperCase() || 
        !password.match("[0-9]")) {
            return res.status(400).send({ "error": "Nesprávny Vstup" });
    }

    if (!req.user) return res.status(401).json({ "error": "Nie si prihlásený" });
        
    const id = (req.user as Document)._id;
        
    try {
        const user = await User.findById(id);

        const oldPassword = user?.password;

        if (!bcrypt.compareSync(currentPassword, oldPassword as string)) {
            return res.status(401).send({ "error": "Zadali ste zlé heslo" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        (user as Document).password = hash;

        user?.save();

        return res.json({ "message": "Heslo úspešne zmenené !" });
    } catch (error) {
        console.log(error);
    }
    
    return res.status(404).send({ "error": "Niekde nastala chyba" });
};

export const ChangePermissions = async (req: Request, res: Response, next: NextFunction) => {

    const email = req.body.name;
    const permissions = req.body.permissions;
    
    if (!email) return res.status(400).send({ "error": "Nesprávny Vstup" });
    if (!req.user) return res.status(401).json({ "error": "Nie si prihlásený" });
    if (!HasUserPermissions(req.user, Ranks.SUPERADMIN)) return res.status(401).json({ "error": "Nemáte oprávnenia pre túto akciu !" });
        
    try {
        const user = await User.find({ "email": email });

        if(isNaN(permissions) || permissions < 0 || permissions > ranks.length - 1) return res.status(404).send({ "error": "Neexistujúca hodnosť" });
        else if(user.length == 0) return res.status(404).send({ "error": "Používateľ neexistuje" });

        (user[0] as Document).permLevel = permissions;

        user[0]?.save();

        return res.json({ "message": "Heslo úspešne zmenené !" });
    } catch (error) {
        console.log(error);
    }
    
    return res.status(404).send({ "error": "Niekde nastala chyba" });
};