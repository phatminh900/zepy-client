import React from "react";
export * from "./login";
export * from "./signup";
const AuthContainer = React.lazy(() => import("./auth.container"));

export { AuthContainer };
