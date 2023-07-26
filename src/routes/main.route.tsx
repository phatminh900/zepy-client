import React from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { ROUTES } from "../constants/navigation.constant";
import {
  AuthContainer,
  Chat,
  Chats,
  Dashboard,
  Friends,
  Greeting,
  Login,
  Signup,
} from "../pages";
import Loader from "src/ui/Loader";
import AppLayout from "src/ui/app-layout";

const Main = () => {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/auth" element={<AuthContainer />}>
            <Route index element={<Navigate to={ROUTES.LOGIN} />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
            <Route index path={ROUTES.LOGIN} element={<Login />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to={ROUTES.CHATS} />} />
            {/* Chats */}
            <Route path={ROUTES.CHATS} element={<Chats />}>
              <Route index element={<Greeting />} />
              <Route path={":id"} element={<Chat />} />
            </Route>
            <Route path={ROUTES.FRIENDS} element={<Friends />}>
              <Route index element={<Greeting />} />
              <Route path={":id"} element={<Chat />} />
            </Route>
            {/* Friend List */}
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};
export default Main;
