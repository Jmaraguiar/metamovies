import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<MainPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;