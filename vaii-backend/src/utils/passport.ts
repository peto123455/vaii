import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user";
import { Schema, Document } from "mongoose";

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ 
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false,
    }, async (email: string, password: string, done: any) => {
    try {
        const user = await User.findOne({ email });

        if (!user || !bcrypt.compareSync(password, user.password)) return done(null, false);

        return done(null, user);
    } catch (error: any) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, (user as Document).id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user)).catch((error) => done(error));
});