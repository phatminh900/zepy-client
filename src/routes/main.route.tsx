import React from "react";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ROUTES } from "../constants/navigation.constant";
import {
  AuthContainer,
  Chat,
  Chats,
  Contacts,
  Greeting,
  Login,
  Signup,
  Friends,
  FriendRequests,
  Groups,
  Settings,
  Search,
  GroupChat,
  Call,
  Todos,
  TodoTasks,
  TodoGreeting,
  NotFound,
  FallBack,
} from "../pages";
import Loader from "src/ui/Loader";
import AppLayout from "src/ui/app-layout";
import ProtectRoute from "./auth/auth.route";

const Main = () => {
  return (
    <ErrorBoundary FallbackComponent={FallBack}>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          <Routes>
            <Route path={ROUTES.AUTH} element={<AuthContainer />}>
              <Route index element={<Navigate to={ROUTES.LOGIN} />} />
              <Route path={ROUTES.SIGNUP} element={<Signup />} />
              <Route index path={ROUTES.LOGIN} element={<Login />} />
            </Route>
            <Route
              path="/"
              element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }
            >
              {/* Search */}

              <Route index element={<Navigate to={ROUTES.CHATS} />} />
              <Route path={ROUTES.SEARCH} element={<Search />} />
              {/* Chats */}
              <Route path={ROUTES.CHATS} element={<Chats />}>
                <Route index element={<Greeting />} />
                <Route path={":id"} element={<Chat />} />
                <Route path={"group/:id"} element={<GroupChat />} />
              </Route>
              {/* Contacts */}
              {/* <Route path={`${ROUTES.CHAT_GROUP}/:id`} element={<GroupChat />} /> */}
              <Route path={ROUTES.CONTACTS} element={<Contacts />}>
                <Route index element={<Navigate to={ROUTES.FRIENDS} />} />
                <Route path={ROUTES.FRIENDS} element={<Friends />} />
                <Route path={ROUTES.GROUPS} element={<Groups />} />
                <Route
                  path={ROUTES.FRIEND_REQUESTS}
                  element={<FriendRequests />}
                />
                {/* <Route path={ROUTES.FRIENDS} element={<Friends />} /> */}
              </Route>
              <Route path={ROUTES.TODOS} element={<Todos />}>
                <Route index element={<TodoGreeting />} />
                <Route path=":id" element={<TodoTasks />} />
              </Route>
              {/* settings */}
              <Route path={ROUTES.SETTINGS} element={<Settings />} />
              {/* Call */}
            </Route>
            <Route path={ROUTES.CALL} element={<Call />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
export default Main;
