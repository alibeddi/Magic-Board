import React from 'react'
import Logo from "../../assets/icons/logo.png";

const Error = () => {
  return (
    <div className='error-container'>
          <img src={Logo} alt="Logo" height={150} />
          <p className='error-text'><span>NOT</span> FOUND</p>
    </div>
  )
}

export default Error