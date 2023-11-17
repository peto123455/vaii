import { Schema, model, Document } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    theoryHours: {
        type: Number,
        required: true
    }, 
    driveHours: {
        type: Number,
        required: true
    }, 
    description: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }
});

export default model("category", categorySchema, "categories");