import Avatar from "../../assets/icons/logo-black.png";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__group">
          {/* <ViewTitle /> */}
          title
        </div>

        <div className="header__group">
          <div className="search-box">
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="avatar__container">
          <img src={Avatar} alt="Avatar" className="avatar" />
        </div>
      </header>
    </>
  );
};

export default Header;
