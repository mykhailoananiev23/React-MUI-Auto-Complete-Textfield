import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/system";
import { Grid, Icon, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const options: string[] = ["Option 1", "Option 2", "Option 3"];

const DropdownList = styled(List)`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
`;

const DropdownItem = styled(ListItemButton)`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const MyComponent = ({ guess, complete, multiline }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const [DropdownData, setDropdownData] = useState([]);
  const [oldPosition, setOldPosition] = useState(-1)
  const [currentPosition, setcurrentPosition] = useState(-1)

  useEffect(() => {
    const handleResize = () => {
      if (textFieldRef.current) {
        const { width } = textFieldRef.current.getBoundingClientRect();
        setDropdownWidth(width);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (event: any) => {
    const inst = event.target;
    const value = inst.value;
    const cursorPosition = event.target.selectionStart;

    setcurrentPosition(cursorPosition)
    setInputValue(inst.value);
    if(value.slice(-1) === "{"){
      event.target.selectionStart = currentPosition;
      setInputValue(prev => prev + "}");
    }
  };
  
  const handleOptionClick = (e: any, ele: any) => {
    
  };
  
  const handleKeyUp = (e: any) => {
    const inst = e.target
    var key = e.key;
    if(key==="{"){
      setcurrentPosition(inst.selectionStart)
      // e.target.selctionStart = 
    }
  }

  useEffect(() => {
    // textFieldRef?.current?.selectionStart -=1;
  }, [inputValue]);

  return (
    <div style={{ position: "relative" }}>
      <TextField
        label="Type something..."
        value={inputValue}
        onChange={handleInputChange}
        inputRef={textFieldRef}
        sx={{ width: "100%" }}
        onKeyUp={handleKeyUp}
      />
      {showDropdown && DropdownData.length > 0 && (
        <DropdownList sx={{ width: dropdownWidth }}>
          {multiline
            ? DropdownData.map((ele: any, idx: any) => (
                <DropdownItem
                  key={idx}
                  onClick={(e) => handleOptionClick(e, ele)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <HomeIcon />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>{ele.description}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="caption">{ele.type}</Typography>
                    </Grid>
                  </Grid>
                </DropdownItem>
              ))
            : DropdownData.map((ele: any, idx: any) => (
                <DropdownItem
                  key={idx}
                  onClick={(e) => handleOptionClick(e, ele)}
                >
                  <Typography>{ele.description}</Typography>
                </DropdownItem>
              ))}
        </DropdownList>
      )}
      <div>{currentPosition}</div>
      <div>{inputValue}</div>
    </div>
  );
};

export default MyComponent;
