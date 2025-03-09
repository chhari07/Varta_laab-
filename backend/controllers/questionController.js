const Question = require("../models/Question");

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ date: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new question
const addQuestion = async (req, res) => {
  const { question, user, image } = req.body;
  try {
    const newQuestion = new Question({ question, user, image });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to add question" });
  }
};

// Add an answer to a question
const addAnswer = async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    question.answers.push(answer);
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to add answer" });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete question" });
  }
};

module.exports = { getQuestions, addQuestion, addAnswer, deleteQuestion };
