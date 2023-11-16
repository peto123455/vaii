import express, { Request, Response } from "express";
import Auth from './routes/auth';
import mongoose from 'mongoose';
import "dotenv/config";
import bodyParser from "body-parser";
import passport from "passport";
import "./utils/passport"
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
const port = 8080;

/*mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log("DB connected");
});*/

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
    secure: true
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.use('/auth', Auth);

app.listen(port, () => {
  console.log(`Backend started at port ${port}`);
})
