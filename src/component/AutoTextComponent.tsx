import * as React from "react";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { styled } from "@mui/system";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

const DropdownList = styled(List)`
position: absolute;
background-color: #ffffff;
border: 1px solid #cccccc;
border-radius: 4px;
max-height: 200px;
overflow-y: auto;
z-index: 10;
`;

const StringDisplayBox = styled(Box)`
position: absolute;
background-color: lightgreen;
max-height: 200px;
overflow-y: auto;
z-index: 5;
`

const DropdownItem = styled(ListItemButton)`
&:hover {
  background-color: #f5f5f5;
}
`;

const AutoTextComponent = ({guess, complete, multiline}: any): JSX.Element => {
  const CodeEditor = React.useRef<any>(null);
  const [displayStr, setdisplayStr] = React.useState("")
  const [focused, setfocused] = React.useState(false)
  const [value, setvalue] = React.useState<string>("")
  const [selectedStr, setSelectedStr] = React.useState<string>("")
  const [selection, setSelection] = React.useState<any>(null);
  const [divideStr, setDivideStr] = React.useState<any>("")
  const [matchedData, setMatchedData] = React.useState<any>([])
  const [options, setOptions] = React.useState<any>([])
  const [DropdownData, setDropdownData] = React.useState<any>([]);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [dropdownWidth, setDropdownWidth] = React.useState<number | null>(null);

  const handleChange = (value: any, viewUpdate: any) => {
    const cursorPos = viewUpdate.changes.sections[0];
    const condStr = value.slice(cursorPos-1, cursorPos+1)
    setSelection(JSON.stringify(viewUpdate.changes.sections))
    const divideStr = value.slice(0, cursorPos+1);
    setSelectedStr(value.slice(0, cursorPos+1))
    setDropdownData([])
    if(divideStr.includes("{{")){
      var divide = divideStr.split("{{")
      setDivideStr(divide.slice(-1))
      const guessingData = guess(divide.slice(-1));
      if(guessingData.length > 0){
        setShowDropdown(true)
        setDropdownData(guessingData)
      }
      setOptions(guessingData)
      setMatchedData(guessingData)
    }
    setvalue(value)
    const realStr = complete(value)
    setdisplayStr(realStr)
  };

  const handleFocus = () => {
    setfocused(true)
  }

  const handleBlur = () => {
    setfocused(false)
  }

  const handleOptionClick = (e: any, ele: any) => {
    setDropdownData([])

    const replacePartialButtonName = (input: string, partialButtonName: string, fullButtonName: string): string => {
      const parts = input.split(partialButtonName);
      const replacedInput = parts.join(fullButtonName);
      return replacedInput;
    };
    
    const input1 = "test is {{button";
    const partialButtonName1 = "button1";
    const fullButtonName1 = "{{button1}}";
    
    const result1 = replacePartialButtonName(input1, partialButtonName1, fullButtonName1);
    console.log(result1); // Output: "test is {{button1}}"
    
    const input2 = "this is {{button1}} is {{button";
    const partialButtonName2 = "button10";
    const fullButtonName2 = "{{button10}}";
    
    const result2 = replacePartialButtonName(input2, partialButtonName2, fullButtonName2);
    console.log(result2); // Output: "this is {{button1}} is {{button10}}"
  };

  return (
    <Box sx={{display: "relative"}}>
      <CodeMirror
        ref={CodeEditor}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {showDropdown && DropdownData.length > 0 && (
        <DropdownList sx={{ width: "100%" }}>
          {DropdownData.map((ele: any, idx: any) => (
            <DropdownItem key={idx} onClick={(e) => handleOptionClick(e, ele)}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  {/* <HomeIcon /> */}
                </Grid>
                <Grid item xs={8}>
                  <Typography>{ele.description}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="caption">{ele.type}</Typography>
                </Grid>
              </Grid>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
      {
        focused ? 
        <StringDisplayBox sx={{ width: "100%" }}>
            {displayStr}
        </StringDisplayBox> : null
      }
      <div>
        {selectedStr}
      </div>
      <div>
        {selection}
      </div>
      <div>
        {
          divideStr
        }
      </div>
      <div>
        {
           divideStr.includes("}}") ? "":divideStr
        }
      </div>
      <div>
        {
          JSON.stringify(matchedData)
        }
      </div>
    </Box>
  );
};

export default AutoTextComponent;
