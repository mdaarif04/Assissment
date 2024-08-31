import React, { useEffect, useState } from "react";
import "./App.css";
import { Link} from "react-router-dom";

const Dashboard = () => {
  const [assessments, setAssessments] = useState([]);
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [error, setError] = useState(null);


  useEffect(() => {
    // Fetch assessments from the server
    const fetchAssessments = async () => {
      try {
        const response = await fetch("/api/assessments")

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAssessments(data);
      } catch (err) {
        setError(`Failed to fetch assessments: ${err.message}`);
        console.error("Error fetching assessments:", err);
      }
    };

    fetchAssessments();
  }, []);

  useEffect(() => {
    // Filter assessments based on selected filterType
    if (filterType === "all") {
      setFilteredAssessments(assessments);
    } else {
      setFilteredAssessments(
        assessments.filter((assessment) => assessment.type === filterType)
      );
    }
  }, [filterType, assessments]);

 


  return (
    <div className="Dashboard">
      <h1>Assessment Dashboard</h1>

      <div id="btn2">
        <button id="btn1">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/create_assessment"}
          >
            Create Assessment
          </Link>
        </button>
        <button>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/questions"}
          >
            Question Bank Access
          </Link>
        </button>
      </div>

      <div>
        <button
          onClick={() => setFilterType("all")}
          style={{ marginRight: "10px" }}
        >
          All
        </button>
        <button
          onClick={() => setFilterType("quiz")}
          style={{ marginRight: "10px" }}
        >
          Quiz
        </button>
        <button
          onClick={() => setFilterType("assignment")}
          style={{ marginRight: "10px" }}
        >
          Assignment
        </button>
        <button onClick={() => setFilterType("survey")}>Survey</button>
      </div>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Show filtered data */}
      <div id="box">
        {filteredAssessments.length > 0 ? (
          filteredAssessments.map((assessment) => (
            <div id="box1" key={assessment._id}>
              <h3>Title: {assessment.title}</h3>
              <p>Type: {assessment.type}</p>
              <p>Date: {new Date(assessment.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No assessments found for the selected type.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
