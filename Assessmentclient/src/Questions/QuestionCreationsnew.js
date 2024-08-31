import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionList = () => {
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    questionType: "",
    difficulty: "",
    subject: "",
    options: [""],
    correctAnswer: "",
    tags: "",
  });

  const navigate = useNavigate();

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const addOption = () => {
    setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ""] });
  };

  const removeOption = (index) => {
    const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestionData = {
      questionText: newQuestion.questionText,
      questionType: newQuestion.questionType,
      difficulty: newQuestion.difficulty,
      subject: newQuestion.subject,
      options:
        newQuestion.questionType === "multiple-choice"
          ? newQuestion.options
          : [],
      correctAnswer: newQuestion.correctAnswer,
      tags: newQuestion.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const response = await fetch("/api/easyquestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestionData),
      });

      if (response.ok) {
        // Reset form fields after successful creation
        setNewQuestion({
          questionText: "",
          questionType: "",
          difficulty: "",
          subject: "",
          options: [""],
          correctAnswer: "",
          tags: "",
        });
        // Navigate to another page
        navigate("/integration");
      } else {
        const error = await response.json();
        console.error("Failed to create question:", error);
      }
    } catch (error) {
      console.error("Error occurred while creating the question:", error);
    }
  };

  return (
    <div>
      <h2>Create New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question Text</label>
          <input
            type="text"
            name="questionText"
            value={newQuestion.questionText}
            onChange={handleNewQuestionChange}
            required
          />
        </div>
        <div>
          <label>Question Type</label>
          <select
            name="questionType"
            value={newQuestion.questionType}
            onChange={handleNewQuestionChange}
            required
          >
            <option value="">Select Type</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="short-answer">Short Answer</option>
            <option value="essay">Essay</option>
            <option value="true-false">True/False</option>
          </select>
        </div>
        {newQuestion.questionType === "multiple-choice" && (
          <div>
            <label>Options</label>
            {newQuestion.options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button type="button" onClick={() => removeOption(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addOption}>
              Add Option
            </button>
          </div>
        )}
        <div>
          <label>Correct Answer</label>
          <input
            type="text"
            name="correctAnswer"
            value={newQuestion.correctAnswer}
            onChange={handleNewQuestionChange}
            required
          />
        </div>
        <div>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={newQuestion.difficulty}
            onChange={handleNewQuestionChange}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label>Subject</label>
          <select
            name="subject"
            value={newQuestion.subject}
            onChange={handleNewQuestionChange}
            required
          >
            <option value="">Select Subject</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
        </div>
        <div>
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={newQuestion.tags}
            onChange={handleNewQuestionChange}
          />
        </div>
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
};

export default QuestionList;
