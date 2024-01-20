import { Schema, model, Document } from "mongoose";

const topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export default model("topic", topicSchema, "topics");