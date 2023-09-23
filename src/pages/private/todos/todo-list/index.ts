import { lazy } from "react";
const Todos = lazy(() => import("./todos.container"));
export { Todos };
