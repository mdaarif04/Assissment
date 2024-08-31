import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create_assessment = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("quiz");
  const [date, setDate] = useState("");
  const [averageScore, setAverageScore] = useState("");
  const [completionRate, setCompletionRate] = useState("");

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data object
    const data = {
      title,
      type,
      date,
      analytics: {
        averageScore: parseFloat(averageScore),
        completionRate: parseFloat(completionRate),
      },
    };

    try {
      // Send the data to the server
      const response = await fetch("/api/assessments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create assessment");
      }

      const result = await response.json();
      alert("Assessment created successfully!");
      console.log("Success:", result);

      // Reset form fields after successful submission
      setTitle("");
      setType("quiz");
      setDate("");
      setAverageScore("");
      setCompletionRate("");

      // Navigate to the home page or another page after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create assessment.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create a New Assessment</h1>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div>
          <label htmlFor="title">Assessment Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          />
        </div>

        <div>
          <label htmlFor="type">Assessment Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          >
            <option value="quiz">Quiz</option>
            <option value="assignment">Assignment</option>
            <option value="survey">Survey</option>
          </select>
        </div>

        <div>
          <label htmlFor="date">Assessment Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          />
        </div>

        <div>
          <label htmlFor="averageScore">Average Score</label>
          <input
            type="number"
            id="averageScore"
            value={averageScore}
            onChange={(e) => setAverageScore(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          />
        </div>

        <div>
          <label htmlFor="completionRate">Completion Rate (%)</label>
          <input
            type="number"
            id="completionRate"
            value={completionRate}
            onChange={(e) => setCompletionRate(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", margin: "5px 0" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Assessment
        </button>
      </form>
    </div>
  );
};

export default Create_assessment;
