import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true
  },
  marks: {
      accuredMark: { type: Number, required: true },
      totalMark: { type: Number, required: true },
      Exam: { type: String, required: true },
      //required: true,
  }
},{timestamps:true});

export const Result = mongoose.model("Result", resultSchema);

