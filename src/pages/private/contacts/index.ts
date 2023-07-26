import { lazy } from "react";

const Friends = lazy(() => import("./contacts.container"));

export { Friends };
