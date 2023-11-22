import { Schema, model, Document } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    permLevel: {
        type: Number,
        required: true,
        default: 0
    }
});

export default model("user", userSchema);