import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";
import { Icon, Typography } from "@mui/material";

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
  const [filterDate, setfilterDate] = useState<any>([]);
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const [DropdownData, setDropdownData] = useState([]);

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
    const value = event.target.value;
    setInputValue(value);
    if (value.charAt(value.length - 1) === "*") {
      setShowDropdown(true);
      const data = guess(value.slice(0, -1));
      setDropdownData(data);
    } else {
      setShowDropdown(false);
    }
  };

  const handleOptionClick = (e: any, ele: any) => {
    setInputValue(ele.description);
    const { clientX, clientY } = e;
    setDropdownData([]);
    setShowDropdown(false);
    var result = {
      cursorX: clientX,
      cursorY: clientY,
      letter: ele.description,
    };
    console.log(clientX, clientY, ele.descaiptiong);
    complete(result);
  };

  return (
    <div style={{ position: "relative" }}>
      <TextField
        label="Type something..."
        value={inputValue}
        onChange={handleInputChange}
        inputRef={textFieldRef}
        sx={{ width: "100%" }}
      />
      {showDropdown && DropdownData.length > 0 && (
        <DropdownList sx={{ width: dropdownWidth }}>
          {multiline ? (
            DropdownData.map((ele: any, idx: any) => (
              <DropdownItem
                key={idx}
                onClick={(e) => handleOptionClick(e, ele)}
              >
                <Icon>{ele.icon}</Icon>
                <Typography>{ele.description}</Typography>
                <Typography variant="caption">{ele.type}</Typography>
              </DropdownItem>
            ))
          ) : (
            DropdownData.map((ele: any, idx: any) => (
            <DropdownItem key={idx} onClick={(e) => handleOptionClick(e, ele)}>
              <Typography>{ele.description}</Typography>
            </DropdownItem>
            ))
          )}
        </DropdownList>
      )}
    </div>
  );
};

export default MyComponent;
