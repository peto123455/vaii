import express, { Request, Response } from "express";
import router from './router'

const app = express();
const port = 8080;

app.get('*', router);

app.listen(port, () => {
  console.log(`Backend started at port ${port}`);
})