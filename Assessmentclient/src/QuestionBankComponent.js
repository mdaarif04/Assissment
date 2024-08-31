import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function QuestionBankComponent({ onSelectQuestion }) {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, [searchTerm]);

  const fetchQuestions = async () => {
    const response = await fetch(`/api/questions?search=${searchTerm}`);
    const data = await response.json();
    setQuestions(data);
  };

  const handleSelectQuestion = (question) => {
    setSelectedQuestion(question);
    if (onSelectQuestion) {
      onSelectQuestion(question);
    }
    setEditMode(false); // Reset edit mode when selecting a new question
  };

  const handleEditQuestion = async () => {
    const response = await fetch(`/api/questions/${selectedQuestion._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionText: editText,
        correctAnswer: editAnswer,
      }),
    });

    if (response.ok) {
      const updatedQuestion = await response.json();
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === updatedQuestion._id ? updatedQuestion : q
        )
      );
      setEditMode(false);
      setSelectedQuestion(updatedQuestion);
    } else {
      console.error("Failed to update question");
    }
  };

  const handleDeleteQuestion = async () => {
    if (!selectedQuestion || !selectedQuestion._id) {
      console.error("No question selected for deletion");
      return;
    }

    const response = await fetch(`/api/questions/${selectedQuestion._id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q._id !== selectedQuestion._id)
      );
      setSelectedQuestion(null);
    } else {
      console.error("Failed to delete question");
    }
  };

  return (
    <div>
      <h2>Question Bank</h2>
      <button>
        <Link to={"/integration"}>Question</Link>
      </button>

      <input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={"/questionscreation"}
        >
          Question Creation
        </Link>
      </button>

      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <p>{question.questionText}</p>
            <button onClick={() => handleSelectQuestion(question)}>
              Select
            </button>
          </li>
        ))}
      </ul>

      {selectedQuestion && (
        <div className="selected-question-options">
          <h3>Selected Question: {selectedQuestion.questionText}</h3>
          {/* <h3>Answer: {selectedQuestion.correctAnswer}</h3> */}

          {editMode ? (
            <div>
              <label>
                Question Text:
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </label>
              {/* <label>
                Correct Answer:
                <textarea
                cols={35}
                rows={5}
                  type="text"
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                />
              </label> */}
              <button onClick={handleEditQuestion}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setEditMode(true);
                  setEditText(selectedQuestion.questionText);
                  setEditAnswer(selectedQuestion.correctAnswer);
                }}
              >
                Edit
              </button>
              <button onClick={handleDeleteQuestion}>Delete</button>
              <button onClick={() => setSelectedQuestion(null)}>
                Deselect
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionBankComponent;
