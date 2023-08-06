import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Main from "./routes";
import store from "./store/store";
import ThemeContextProvider from "./contexts/theme.context";
import "./index.css";
import ToasterComponent from "./components/toaster";
const query = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={query}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeContextProvider>
          <Main />
        </ThemeContextProvider>
        <ToasterComponent />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
