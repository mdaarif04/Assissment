import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuestionCreationComponent({ onCreate }) {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [options, setOptions] = useState([""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index) =>
    setOptions(options.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/questions");

    const newQuestion = {
      questionText,
      questionType,
      options,
      correctAnswer,
      difficulty,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        const createdQuestion = await response.json();
        onCreate(createdQuestion);

        // Reset form fields after successful submission
        setQuestionText("");
        setQuestionType("");
        setOptions([""]);
        setCorrectAnswer("");
        setDifficulty("");
        setTags("");

        // Navigate to the questions page after successful creation
        
      } else {
        console.error("Failed to create question");
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
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Question Type</label>
          <input
            type="text"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Options (for multiple-choice)</label>
          {options.map((option, index) => (
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
        <div>
          <label>Correct Answer</label>
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Difficulty</label>
          <input
            type="text"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </div>
        <div>
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button  type="submit">Create Question</button>
      </form>
    </div>
  );
}

export default QuestionCreationComponent;
