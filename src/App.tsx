import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./shared/constants/routes/routes";
import { MessangerPage } from "./modules/messanger/messanger-page";
import "./shared/assets/scss/App.scss";
import { LoginPage } from "./modules/auth/login/login-page";
import {
  ColorModeContext,
  useMode,
} from "./shared/theme-context/theme-context";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useLogin } from "./modules/auth/login/use-login";
import { RegPage } from "./modules/auth/reg/reg-page";

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
