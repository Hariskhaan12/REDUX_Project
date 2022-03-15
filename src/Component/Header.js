import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

function Header({logo}) {
    let Navigate=useNavigate();

let RedirectToLogin=()=>{
    Navigate('/Login')
}

let RedirectToSignUp=()=>{
    Navigate("/SignUp");
}
let RedirectToHome=()=>{
    Navigate("/");
}
let RedirectToProfile = () => {
 let getUSer=localStorage.getItem("LoginDetails");
  if (getUSer === null) {
    alert("You Need to Logged in First");
    Navigate("/Login");
  } 
  else {
      Navigate("/Profile")
  }
};

  return (
    <div className="container">
      <p>{logo}</p>
      <p onClick={RedirectToHome}>Home</p>
      <p>About</p>
      <div className="signIn">
        <p onClick={RedirectToLogin}>Login</p>
        <p onClick={RedirectToSignUp}>SignUp</p>
        <p onClick={RedirectToProfile}>Profile</p>
      </div>
    </div>
  );
}

export default Header