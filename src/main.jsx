import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./themes"; // where LIGHT/DARK is defined
import { SnackbarProvider } from "notistack";

const theme = getTheme("LIGHT"); //  DARK, LIGHT   You can make this dynamic

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </SnackbarProvider>
  </StrictMode>
);
