import React, { useState, useEffect } from "react";

const Q_A = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const addQuestion = async () => {
    if (newQuestion.trim() && userName.trim()) {
      const newEntry = { question: newQuestion, user: userName };
      try {
        const res = await fetch("http://localhost:5000/api/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        });
        const data = await res.json();
        setQuestions([...questions, data]);
        setNewQuestion("");
        setUserName("");
      } catch (error) {
        console.error("Error adding question:", error);
      }
    }
  };

  const addAnswer = async (id) => {
    if (newAnswer.trim()) {
      try {
        const res = await fetch(`http://localhost:5000/api/questions/${id}/answer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer: newAnswer }),
        });
        const updatedQuestion = await res.json();
        setQuestions(questions.map((q) => (q._id === id ? updatedQuestion : q)));
        setNewAnswer("");
      } catch (error) {
        console.error("Error adding answer:", error);
      }
    }
  };

  const addComment = async (id) => {
    if (newComment.trim()) {
      try {
        const res = await fetch(`http://localhost:5000/api/questions/${id}/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comment: newComment }),
        });
        const updatedQuestion = await res.json();
        setQuestions(questions.map((q) => (q._id === id ? updatedQuestion : q)));
        setSelectedQuestion(updatedQuestion);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const openModal = (q) => {
    setSelectedQuestion(q);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{
      backgroundImage:
        "url('https://nighteye.app/wp-content/uploads/2022/05/dark-ui-design-best-practices-1.jpg.webp')",
    }} 
     className="min-h-screen p-6 bg-gray-100 text-black flex flex-col font-sans">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full md:w-2/3">
          {/* Ask a Question */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
            <h2 className="text-2xl font-bold mb-4">Ask a Question</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 mb-3 border rounded-lg bg-gray-100 text-black focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="text"
              placeholder="Type your question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-100 text-black focus:ring-2 focus:ring-gray-400"
            />
            <button
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-2 rounded-lg mt-3 w-full font-semibold shadow-md transition-transform transform hover:scale-105"
              onClick={addQuestion}
            >
              Submit
            </button>
          </div>

          {/* Questions List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions.length > 0 ? (
              questions.map((q) => (
                <div
                  key={q._id}
                  className="p-5 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 shadow-md transition-transform transform hover:scale-105 cursor-pointer"
                  onClick={() => openModal(q)}
                >
                  <h3 className="text-lg font-semibold">{q.user}</h3>
                  <p className="mt-2">{q.question}</p>
                  <p className="text-sm text-gray-500 mt-2">{q.answers.length} Answers</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-2">No questions yet. Be the first to ask!</p>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedQuestion && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-lg relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>
              <h3 className="text-2xl font-semibold">{selectedQuestion.question}</h3>
              <p className="text-sm mt-2 text-gray-500">Asked by {selectedQuestion.user}</p>

              {/* Answers Section */}
              <div className="mt-4 space-y-3">
                {selectedQuestion.answers.map((answer, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg border shadow-sm">
                    {answer}
                  </div>
                ))}
              </div>

              {/* Answer Input */}
              <textarea
                placeholder="Write your answer..."
                className="w-full p-3 border rounded-lg mt-3 bg-gray-100 text-black focus:ring-2 focus:ring-gray-400"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button className="bg-gray-700 text-white px-5 py-2 rounded-lg mt-3 w-full" onClick={() => addAnswer(selectedQuestion._id)}>
                Submit Answer
              </button>

              {/* Comments Section */}
              <h4 className="text-lg font-semibold mt-6 mb-2">Comments</h4>
              {selectedQuestion.comments?.length > 0 ? (
                selectedQuestion.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-100 p-3 rounded-lg border shadow-sm">
                    {comment}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
              <textarea
                placeholder="Write a comment..."
                className="w-full p-3 border rounded-lg mt-3 bg-gray-100 text-black focus:ring-2 focus:ring-gray-400"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="bg-gray-700 text-white px-5 py-2 rounded-lg mt-3 w-full" onClick={() => addComment(selectedQuestion._id)}>
                Submit Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Q_A;
