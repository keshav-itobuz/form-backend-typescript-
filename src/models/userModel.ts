import mongoose from "mongoose";
import { Profession } from "../enum/enum";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        profession: {
            type: String,
            enum: Profession
        },
        building: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        phone: {
            type: String,
        },
        email: {
            type: String,
            required: true
        }
    },
    { timestamps: true },
);

const User = mongoose.model("user", userSchema);
export default User;