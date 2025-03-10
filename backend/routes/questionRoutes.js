const express = require("express");
const router = express.Router();
const { getQuestions, addQuestion, addAnswer, deleteQuestion } = require("../controllers/questionController");

// Q&A Routes
router.get("/", getQuestions);
router.post("/", addQuestion);
router.post("/:id/answer", addAnswer);
router.delete("/:id", deleteQuestion);

module.exports = router;
