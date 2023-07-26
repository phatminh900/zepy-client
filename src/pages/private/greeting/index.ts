import { lazy } from "react";
const Greeting = lazy(() => import("./greeting.container"));
export { Greeting };
