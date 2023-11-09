import * as React from "react";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import CodeMirror from "@uiw/react-codemirror";
import { styled } from "@mui/system";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

const DefinedCodeMirror = styled(CodeMirror)`
  border-radius: 10px 10px 0px 0px;
  border: 1px solid grey;
  padding: 5px;
  font-size: 16px;
  font-family: math;
`;

const DropdownList = styled(List)`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 10px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 10;
`;

const StringDisplayBox = styled(Box)`
  position: absolute;
  border-radius: 0px 0px 10px 10px;
  color: #006600;
  background: #99ffcc;
  max-height: 200px;
  overflow-y: auto;
  z-index: 5;
`;

const DropdownItem = styled(ListItemButton)`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const AutoTextComponent = ({
  guess,
  complete,
  multiline,
}: any): JSX.Element => {
  const CodeEditor = React.useRef<any>(null);
  const [displayStr, setdisplayStr] = React.useState("");
  const [focused, setfocused] = React.useState(false);
  const [value, setvalue] = React.useState<string>("");
  const [selectedStr, setSelectedStr] = React.useState<string>("");
  const [divideStr, setDivideStr] = React.useState<any>("");
  const [DropdownData, setDropdownData] = React.useState<any>([]);
  const [showDropdown, setShowDropdown] = React.useState(false);

  React.useEffect(() => {
    if (divideStr) {
      const guessingData = guess(divideStr);
      if (guessingData.length > 0) {
        setShowDropdown(true);
        setDropdownData(guessingData);
      }
    }
  }, [divideStr]);

  const handleChange = (value: any, viewUpdate: any) => {
    const cursorPos = viewUpdate.changes.sections[0];
    const divideStr = value.slice(0, cursorPos + 1);
    setSelectedStr(value.slice(0, cursorPos + 1));
    setDropdownData([]);
    if (divideStr.includes("{{")) {
      var divide = divideStr.split("{{");
      setDivideStr(divide.slice(-1));
      const guessingData = guess(divide.slice(-1));
      if (guessingData.length > 0) {
        setShowDropdown(true);
        setDropdownData(guessingData);
      }
    }
    setvalue(value);
    const realStr = complete(value);
    setdisplayStr(realStr);
  };

  const handleFocus = () => {
    setfocused(true);
  };

  const handleBlur = () => {
    setfocused(false);
  };

  const handleKeyUp = (e: any) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      setShowDropdown(false)
    }
  };

  const handleOptionClick = (e: any, ele: any) => {
    setShowDropdown(false);
    var mid = selectedStr.lastIndexOf("{{");
    var oldStr = selectedStr.length;
    var result =
      selectedStr.slice(0, mid) + "{{" + ele.description + value.slice(oldStr);
    const realStr = complete(result);
    setdisplayStr(realStr);
    setvalue(result);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <DefinedCodeMirror
        ref={CodeEditor}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        basicSetup={{ lineNumbers: false }}
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
      {false && focused ? (
        <StringDisplayBox sx={{ width: "100%" }}>
          <div style={{ textAlign: "left", width: "100%", paddingTop: "5px" }}>
            <div
              style={{
                fontWeight: "bold",
                fontFamily: "math",
                paddingLeft: "10px",
              }}
            >
              String
            </div>
          </div>
          <div
            style={{
              textAlign: "left",
              padding: "0px 10px",
              fontFamily: "math",
              lineHeight: "20px",
              paddingBottom: "10px",
            }}
          >
            {displayStr}
          </div>
        </StringDisplayBox>
      ) : null}
    </Box>
  );
};

export default AutoTextComponent;
