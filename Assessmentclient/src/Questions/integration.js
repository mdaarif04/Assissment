import React, { useState, useEffect } from "react";
import QuestionList from "./AssessmentCreationTool";
import AddNewQuestionButton from "./creation";
import ImportExportButtons from "./impexp";
import SearchBar from "./searchbar";

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch questions from the server when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/easyquestion");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Search function to filter questions based on search term
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Function to import questions (placeholder implementation)
  const handleImport = async () => {
    try {
      // Logic for importing questions
      // e.g., uploading a file, parsing it, and sending it to the server
      alert("Import functionality not yet implemented");
    } catch (error) {
      console.error("Error importing questions:", error);
    }
  };

  // Function to export questions (placeholder implementation)
  const handleExport = async () => {
    try {
      // Logic for exporting questions
      // e.g., fetching data from the server and downloading it as a file
      alert("Export functionality not yet implemented");
    } catch (error) {
      console.error("Error exporting questions:", error);
    }
  };

  // Filter questions based on the search term
  const filteredQuestions = questions.filter((question) =>
    question.questionText?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Question Bank</h1>
      <SearchBar onSearch={handleSearch} />
      <AddNewQuestionButton />
      <ImportExportButtons onImport={handleImport} onExport={handleExport} />
      <QuestionList questions={filteredQuestions} onCreate={setQuestions} />
    </div>
  );
};

export default QuestionBank;
