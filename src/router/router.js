import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { Details } from "../pages/MovieDetails";
import { Navigate } from "../pages/Navigate";


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<MainPage/>}/>
          <Route path="details/:id" element={<Details/>}/>
          <Route path="nav" element={<Navigate/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;