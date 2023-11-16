import express, { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from "bcrypt"
import passport from "passport";
import { Document } from "mongodb";
import { IVerifyOptions } from "passport-local";

export const Login = async (req: Request, res: Response, next: NextFunction) => {

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(400).send("Bad Request !");
    }

    passport.authenticate("local", (error: any, user: Document) => {
        if (error) return res.status(500).send(error);
        else if (!user) return res.status(400).send("Internal error");

        req.logIn(user, (error: any) => {
            if (error) return res.status(500).send(error);

            return res.status(200).json({
                id: user.id
            });
        });
    })(req, res, next);
};

export const Register = async (req: Request, res: Response, next: NextFunction) => {

    var problems: Array<string> = [];

    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (!email || !password || !confirmPassword) {
        problems.push("Invalid input !");
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
    
        if (confirmPassword != password) {
            problems.push("Heslá sa nezhodujú !");
        }
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