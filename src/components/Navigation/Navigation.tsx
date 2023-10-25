import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { navigation } from "../inputs/types";

const NavigationLink = ({ icon = null, route = "/", children }: navigation) => {
  return (
    <NavLink
      to={route}
      className="navigation_link"
      onClick={() => console.log("close sidebar")}
    >
      {icon}
      <span className="navigation_link__label">{children}</span>
    </NavLink>
  );
};

const Navigation = () => {
  return (
    <div className="navigation__container">
      <NavigationLink route="/home" icon={<HomeIcon />}>
        Home
      </NavigationLink>
      <NavigationLink route="/Chat" icon={<HomeIcon />}>
        White Board
      </NavigationLink>
    </div>
  );
};

export default Navigation;
