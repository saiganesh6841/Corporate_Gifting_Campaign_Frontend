import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./themes"; // where LIGHT/DARK is defined
import { SnackbarProvider } from "notistack";
import "./config/i18n.js"; //
import "./index.css";
import { Provider } from "react-redux";
import reducer from "./pages/privateRouting/admin/hook/reducer.js";
import { createStore } from "redux";

const theme = getTheme("LIGHT"); //  DARK, LIGHT   You can make this dynamic
export const store = createStore(reducer);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
