import React, { useState } from "react";

const QuestionList = ({ questions }) => {
  const [filter, setFilter] = useState({
    type: "",
    difficulty: "",
    subject: "",
  });

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  // Apply filters to the questions list
  const filteredQuestions = questions.filter((question) => {
    return (
      (filter.type
        ? question.questionType &&
          question.questionType.toLowerCase() === filter.type.toLowerCase()
        : true) &&
      (filter.difficulty
        ? question.difficulty &&
          question.difficulty.toLowerCase() === filter.difficulty.toLowerCase()
        : true) &&
      (filter.subject
        ? question.subject &&
          question.subject.toLowerCase() === filter.subject.toLowerCase()
        : true)
    );
  });

  return (
    <div>
      <h2>Question List</h2>
      <div>
        <label>Type:</label>
        <select name="type" onChange={handleFilterChange} value={filter.type}>
          <option value="">All</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="short-answer">Short Answer</option>
          <option value="essay">Essay</option>
          <option value="true-false">True/False</option>
        </select>
      </div>
      <div>
        <label>Difficulty:</label>
        <select
          name="difficulty"
          onChange={handleFilterChange}
          value={filter.difficulty}
        >
          <option value="">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label>Subject:</label>
        <select
          name="subject"
          onChange={handleFilterChange}
          value={filter.subject}
        >
          <option value="">All</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="history">History</option>
        </select>
      </div>
      <div>
        {filteredQuestions.length > 0 ? (
          <ul>
            {filteredQuestions.map((question, index) => (
              <li key={index}>{question.questionText}</li>
            ))}
          </ul>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
