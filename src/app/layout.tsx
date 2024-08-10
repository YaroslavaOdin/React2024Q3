"use client";

import { ThemeProvider } from "../theme-context/themeProvider";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
