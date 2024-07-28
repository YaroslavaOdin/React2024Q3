import React from "react";
import ThemeContext from "../../theme-context/themeContext";
import "./ThemeBtn.css";

const ThemeBtn: React.FC = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme, changeTheme }) => (
        <button onClick={changeTheme} className={`theme-${theme} theme-btn`}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
};

export default ThemeBtn;
