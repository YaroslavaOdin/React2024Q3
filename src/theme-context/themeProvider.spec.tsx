import { describe, expect, it } from "vitest";
import { ThemeProvider } from "./themeProvider";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeContext from "./themeContext";
import { themeDark, themeLight } from "./constants";
import React from "react";

describe("ThemeContext", () => {
  it("should provide the default theme", () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <span>{theme}</span>}
        </ThemeContext.Consumer>
      </ThemeProvider>,
    );
    expect(screen.getByText(themeDark)).toBeTruthy();
  });

  it("should toggle the theme when changeTheme is called", () => {
    const TestComponent = () => {
      const { theme, changeTheme } = React.useContext(ThemeContext);
      return (
        <div>
          <span>{theme}</span>
          <button onClick={changeTheme}>Toggle Theme</button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    const toggleButton = screen.getByText("Toggle Theme");
    expect(screen.getByText(themeDark)).toBeTruthy();

    fireEvent.click(toggleButton);
    expect(screen.getByText(themeLight)).toBeTruthy();

    fireEvent.click(toggleButton);
    expect(screen.getByText(themeDark)).toBeTruthy();
  });
});
