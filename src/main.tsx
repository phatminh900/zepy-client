import React from "react";
import ReactDOM from "react-dom/client";
import ThemeContextProvider from "./contexts/theme.context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Main from "./routes";
import "./index.css";
import ToasterComponent from "./components/toaster";
const query = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={query}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeContextProvider>
        <Main />
      </ThemeContextProvider>
      <ToasterComponent />
    </QueryClientProvider>
  </React.StrictMode>
);
