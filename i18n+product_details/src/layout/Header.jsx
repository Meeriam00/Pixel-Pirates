import React from 'react'
import { NavLink } from 'react-router'
import i18n from '../i18n/i18n'

const Header = () => {

const changeLanguage=(language)=>{
  i18n.changeLanguage(language);
  localStorage.setItem("lang",language)
}


  return (
   <>
 <div className="container"> 
  <header className="d-flex justify-content-center py-3"> 
    <ul className="nav nav-pills">
      <li className="nav-item"><NavLink to="/" className="nav-link" aria-current="page">Home</NavLink></li> 
      <li className="nav-item"><NavLink to="/product" className="nav-link">Product</NavLink></li>
    </ul> 

    <button onClick={()=>changeLanguage("en")}>En</button>
    <button onClick={()=>changeLanguage("az")}>Az</button>

    
  </header> 
  </div>

   </>
  )
}

export default Header