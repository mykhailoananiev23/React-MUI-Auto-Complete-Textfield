import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AutoTextComponent from "./component/AutoTextComponent";

const objArr = [
  {
    icon: "icon1",
    id: 1,
    description: "button1",
    type: "objectA",
  },
  {
    icon: "icon2",
    id: 2,
    description: "button2",
    type: "objectB",
  },
  {
    icon: "icon3",
    id: 3,
    description: "button3",
    type: "objectC",
  },
  {
    icon: "icon4",
    id: 4,
    description: "button4",
    type: "objectD",
  },
  {
    icon: "icon5",
    id: 5,
    description: "button5",
    type: "objectE",
  },
  {
    icon: "icon6",
    id: 6,
    description: "button6",
    type: "objectF",
  },
  {
    icon: "icon7",
    id: 7,
    description: "button7",
    type: "objectG",
  },
  {
    icon: "icon8",
    id: 8,
    description: "button8",
    type: "objectH",
  },
  {
    icon: "icon9",
    id: 9,
    description: "button9",
    type: "objectI",
  },
  {
    icon: "icon10",
    id: 10,
    description: "button10",
    type: "objectJ",
  },
];

function App() {
  const callback1 = (str: string) => {
    const matchedData = objArr.filter((ele) =>
      ele.description.toLowerCase().includes(str)
    );
    return matchedData;
  };

  const callback2 = (str: string) => {
    const objMap = {};
    objArr.forEach((obj:any) => {
      objArr[obj.description] = obj;
    });

    const result = str.replace(/\{\{(.*?)\}\}/g, (match:any, placeholder:any) => {
      const obj = objArr[placeholder];
      return obj ? JSON.stringify(obj, null, 2) : match;
    });

    return result;
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div style={{width: "500px"}}>
        <AutoTextComponent guess={callback1} complete={callback2} multiline />
      </div>
    </div>
  );
}

export default App;
