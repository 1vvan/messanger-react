import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes/routes";
import { MessangerPage } from "./pages/messanger/messanger-page";
import "./assets/scss/App.scss";
import { LoginPage } from "./pages/login/login-page";
import { useAuth } from "./pages/login/use-auth";
import { ColorModeContext, useMode } from "./theme-context/theme-context";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const { commands } = useAuth();
  const { theme, toggleColorMode, mode } = useMode();

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route
                path={ROUTES.MESSANGER.path}
                // element={<MessangerPage />}
                element={
                  commands.isAuthenticated() ? (
                    <MessangerPage />
                  ) : (
                    <Navigate to={ROUTES.LOGIN.path} />
                  )
                }
              />
              <Route path={ROUTES.LOGIN.path} element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </CssBaseline>
    </ColorModeContext.Provider>
  );
}

export default App;
