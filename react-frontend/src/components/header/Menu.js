import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="navButtons">
      <NavLink to="." end className="navlink">
        Deposit
      </NavLink>
      <NavLink to="/withdraw" end className="navlink">
        Withdraw
      </NavLink>
    </nav>
  );
};

export default Menu;
