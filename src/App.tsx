import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes/routes";
import { MessangerPage } from "./pages/messanger/messanger-page";
import './assets/scss/App.scss'

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.MESSANGER.path} element={<MessangerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
