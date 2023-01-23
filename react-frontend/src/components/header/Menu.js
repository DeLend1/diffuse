import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav>
      <NavLink to="." end>
        Deposit
      </NavLink>
      <NavLink to="/withdraw" end>
        Withdraw
      </NavLink>
    </nav>
  );
};

export default Menu;
