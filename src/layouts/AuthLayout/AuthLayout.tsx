import React from "react";

import Logo from "../../assets/icons/logo-white.png";

function AuthLayout({ children, title, description }:any) {
  return (
    <div className="authlayout">
      <div className="authlayout__content">
        <div className="authlayout__content-section-one">
          <div className="authlayout__content-section-one--logo">
            <img src={Logo} alt='logo' height={500} />
          </div>

          <div className="authlayout__content-section-one--description">
            <p>Welcome</p>
            <p>{description}</p>
          </div>
        </div>
        <div className="authlayout__content-section-two">
          <div className="authlayout__content-header">
            <p className="authlayout__content-header-title">{title}</p>
          </div>
          <div className="authlayout__content-form">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
