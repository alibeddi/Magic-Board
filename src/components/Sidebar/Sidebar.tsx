import Logo from "../../assets/icons/logo.png";
import Navigation from "../Navigation/Navigation";

const Sidebar = () => {
  return (
    <div className={"sidebar open"}>
      <div className="sidebar__group">
        <div className="logo__container">
          {/* <img src={Logo} alt="Logo" height={150} /> */}
          {/* <Logo /> */}
        </div>
        <Navigation />
      </div>
    </div>
  );
};

export default Sidebar;
