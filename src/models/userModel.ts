import mongoose from "mongoose";
import { Profession } from "../enum/enum";
import { UserData } from "../interface/interface";
const { Schema } = mongoose;

const userSchema = new Schema<UserData>(
  {
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      enum: Profession,
    },
    building: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);
export default User;
