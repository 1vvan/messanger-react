import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes/routes";
import { MessangerPage } from "./pages/messanger/messanger-page";
import "./assets/scss/App.scss";
import { LoginPage } from "./pages/auth/login/login-page";
import { ColorModeContext, useMode } from "./theme-context/theme-context";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useLogin } from "./pages/auth/login/use-login";
import { RegPage } from "./pages/auth/reg/reg-page";

function App() {
  const { commands } = useLogin();
  const { theme, toggleColorMode, mode } = useMode();
  return (
      <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route
                  path={ROUTES.MESSANGER.path}
                  element={
                    commands.isAuthenticated() ? (
                      <MessangerPage />
                    ) : (
                      <Navigate to={ROUTES.LOGIN.path} />
                    )
                  }
                />
                <Route path={ROUTES.LOGIN.path} element={<LoginPage />} />
                <Route path={ROUTES.REGISTRATION.path} element={<RegPage />} />
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </CssBaseline>
      </ColorModeContext.Provider>
  );
}

export default App;
