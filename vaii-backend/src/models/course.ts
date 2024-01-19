import { ObjectId } from "mongodb";
import { Schema, model, Document } from "mongoose";

const courseSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    theoryHours: {
        type: Number,
        required: true
    }, 
    driveHours: {
        type: Number,
        required: true
    },
    theoryHoursCompleted: {
        type: Number,
        default: 0
    }, 
    driveHoursCompleted: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    paid: {
        type: Number,
        default: 0
    }, 
    completed: {
        type: Boolean,
        default: false
    }
});

export default model("course", courseSchema, "courses");