const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: [{ type: String }],
  views: { type: Number, default: 0 },
  user: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
