import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__title">Forms Task</div>
      <div className="header__navigation">
        <NavLink to="/" className="navigation__nav-link">
          Home
        </NavLink>
        <NavLink to="/uncontrolled-form" className="navigation__nav-link">
          Uncontrolled Form
        </NavLink>
        <NavLink to="/react-hook-form" className="navigation__nav-link">
          React Hook Form
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
