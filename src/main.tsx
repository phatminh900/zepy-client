import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Main from "./routes";
import store from "./store/store";
import ThemeContextProvider from "./contexts/theme.context";
import "./index.css";
import "./i18";
import ToasterComponent from "./components/toaster";
import CallContextProvider from "./contexts/call.context";

const query = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={query}>
    <Provider store={store}>
      <CallContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeContextProvider>
          <Main />
        </ThemeContextProvider>
        <ToasterComponent />
      </CallContextProvider>
    </Provider>
  </QueryClientProvider>
  // </React.StrictMode>
);
