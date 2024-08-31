import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  title: String,
  type: String,
  date: Date,
  analytics: {
    averageScore: Number,
    completionRate: Number,
  }, 
  
},
);

export const Assessment = mongoose.model("Assessment", assessmentSchema);
