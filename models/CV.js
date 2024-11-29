import mongoose from "mongoose";
import User from "./User";

const CVSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: "",
    },
    seeGrade: {
      type: Number,
      min: [0, "Invalid SEE Grade"],
      max: [4, "Invalid SEE Grade"],
      default: 0,
    },
    undergrad: {
      type: Number,
      min: [0, "Invalid Undergraduate Grade"],
      max: [4, "Invalid Undergraduate Grade"],
      default: 0,
    },
    graduate: {
      type: Number,
      min: [0, "Invalid Graduate Grade"],
      max: [4, "Invalid Graduate Grade"],
      default: 0,
    },
    skills: {
      type: String,
    },
    experienceYears: {
      type: Number,
      min: 0,
      required: true,
      default: 0,
    },
    hobbies: {
      type: String,
    },
  },
  { timestamps: true },
);

const CV = mongoose.models.CV || mongoose.model("CV", CVSchema);

export default CV;
