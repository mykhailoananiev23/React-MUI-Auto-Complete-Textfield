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
max-height: 400px;
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
    setShowDropdown(false)
    var mid = selectedStr.lastIndexOf("{{");
    var oldStr = selectedStr.length;
    var result = selectedStr.slice(0, mid) + "{{" + ele.description + value.slice(oldStr);
    const realStr = complete(result)
    setdisplayStr(realStr)
    setvalue(result)
  };

  return (
    <Box sx={{display: "relative"}}>
      <CodeMirror
        ref={CodeEditor}
        value={value}
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
    </Box>
  );
};

export default AutoTextComponent;
