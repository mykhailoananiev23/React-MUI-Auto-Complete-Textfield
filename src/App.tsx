import React, { useState } from "react";
import "./App.css";
import AutoTextField from "./components/AutoTextField";
import Container from "@mui/material/Container";

function App() {
  const [FilterDate, setFilterDate] = useState<any>([]);
  const testData = [
    { id: 1, description: "Description 1", type: "Type 1" },
    { id: 2, description: "Description 2", type: "Type 2" },
    { id: 3, description: "Description 3", type: "Type 3" },
    { id: 4, description: "Description 4", type: "Type 4" },
    { id: 5, description: "Description 5", type: "Type 5" },
    { id: 6, description: "Description 6", type: "Type 6" },
    { id: 7, description: "Description 7", type: "Type 7" },
    { id: 8, description: "Description 8", type: "Type 8" },
    { id: 9, description: "Description 9", type: "Type 9" },
    { id: 10, description: "Description 10", type: "Type 10" },
  ];

  const callback1 = (text: any) => {
    var result = testData.filter((item) =>
      item.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilterDate(result)
    return result;
  };
  const callback2 = (str: any) => {
    console.log(str)
    return [];
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
        {/* <AutoTextField /> */}
        <AutoTextField guess={callback1} complete={callback2} multiline />
      </Container>
    </div>
  );
}

export default App;
