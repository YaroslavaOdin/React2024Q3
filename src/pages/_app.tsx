import type { AppProps } from "next/app";
import { ThemeProvider } from "../theme-context/themeProvider";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
