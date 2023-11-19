import express, { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt"
import passport from "passport";
import { Document } from "mongodb";

export const UserInfo = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user == undefined) return res.status(200).json({ error: "Nie ste prihlásený !" });
    
    const user = req.user as Document;

    res.json({
        id: user._id,
        email: user.email
    });
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

            return res.status(200).json({
                id: user.id,
                email: user.email
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
        const category = await User.findById(id);

        const oldPassword = category?.password;

        if (!bcrypt.compareSync(currentPassword, oldPassword as string)) {
            return res.status(401).send({ "error": "Zadali ste zlé heslo" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        (category as Document).password = hash;

        category?.save();

        return res.json({ "message": "Heslo úspešne zmenené !" });
    } catch (error) {
        console.log(error);
    }
    
    return res.status(404).send({ "error": "Niekde nastala chyba" });
};