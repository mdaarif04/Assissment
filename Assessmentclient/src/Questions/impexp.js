import React from "react";

const ImportExportButtons = ({ onImport, onExport }) => {
  return (
    <div>
      <button onClick={onImport}>Import Questions</button>
      <button onClick={onExport}>Export Questions</button>
    </div>
  );
};

export default ImportExportButtons;
