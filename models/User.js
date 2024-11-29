import mongoose from "mongoose";
import CV from "./CV";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  cv: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CV",
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
