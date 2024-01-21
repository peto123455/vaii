import express, { Request, Response } from "express";
import * as Topic from "../controllers/topics";

const router = express.Router();

router.route('/').post(Topic.CreateTopic)
    .get(Topic.ListTopics)
    .delete(Topic.DeleteTopic)
    .put(Topic.UpdateTopic);

export default router;