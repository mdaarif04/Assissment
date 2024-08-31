import React from "react";
import { useNavigate } from "react-router-dom";

const AddNewQuestionButton = () => {
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    navigate("/creation");
  };

  return <button onClick={handleAddQuestion}>Add New Question</button>;
};

export default AddNewQuestionButton;
