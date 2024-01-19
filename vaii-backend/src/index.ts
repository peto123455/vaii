import express, { Request, Response } from "express";
import Auth from './routes/auth';
import Category from './routes/category';
import mongoose from 'mongoose';
import "dotenv/config";
import bodyParser from "body-parser";
import passport from "passport";
import "./utils/passport"
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Course from "./routes/course";

const app = express();
const port = 8080;

async function connectdb() {
  try {
    await mongoose.connect(`${process.env.MONGO}`);
    console.log("DB connected");
  } catch (error: any) {
    console.log("DB connection failed");
    console.log(error);
    process.exit(1);
  }
}

connectdb();

app.use(session({
  name: 'vaii.spmservers.fun',
  secret: 'secretvaii',
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    secure: false
  },
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    client: mongoose.connection.getClient(),
    collectionName: "sessions"
  })
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
})

app.use('/auth', Auth);
app.use('/category', Category);
app.use('/course', Course);

app.listen(port, () => {
  console.log(`Backend started at port ${port}`);
})
