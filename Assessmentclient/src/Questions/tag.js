import React from "react";

const CategoryAndTags = ({ question }) => {
  return (
    <div>
      <h4>Category: {question.category}</h4>
      <p>Tags: {question.tags.join(", ")}</p>
    </div>
  );
};

export default CategoryAndTags;
