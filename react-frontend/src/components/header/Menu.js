import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="navButtons">
      <NavLink to="." end>
        <span id="deposit">Deposit</span>
      </NavLink>
      <NavLink to="/withdraw" end>
      <span id="withdraw">Withdraw</span>
      </NavLink>
    </nav>
  );
};

export default Menu;
