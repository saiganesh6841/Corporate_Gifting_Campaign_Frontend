import React, { useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { themeCreator } from "../../../../themes/index";
import { connect } from "react-redux";
export const ThemeContext = React.createContext((themeName) => {});
const ThemeProvider = (props) => {
  const curThemeName = localStorage.getItem("adminTheme") || "LIGHT";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName) => {
    localStorage.setItem("adminTheme", themeName);
    _setThemeName(themeName);
    props.themeChange(themeName);
  };
  return React.createElement(
    ThemeContext.Provider,
    { value: setThemeName },
    React.createElement(MuiThemeProvider, { theme: theme }, props.children)
  );
};
const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

const mapDispachToProps = (dispatch) => {
  return {
    themeChange: (theme) => dispatch({ type: "THEME", value: theme }),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(ThemeProvider);
