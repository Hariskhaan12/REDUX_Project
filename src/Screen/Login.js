import React, { useState } from "react";
import Button from "../Component/Button";
import Input from "../Component/Input";
import {useNavigate} from 'react-router-dom'

function Login() {
  let Navigate=useNavigate();
  
  let initialState = {
    Email: "",
    Password: "",
    Uid:""
  };
  const [LoginData, setLoginData] = useState(initialState);

  let InputHandler = (e) => {
    let { name, value } = e.target;
    setLoginData({ ...LoginData, [name]: value });
  };

  let LoginFunc = () => {

      let flag=false;
     let prevData = JSON.parse(localStorage.getItem("UserData"));
     if(prevData===null)
     {
      alert("There is No User ..!")
     }
     else{
     prevData.map((val,index)=>{
        if(LoginData.Email===val.Email && LoginData.Password===val.Password)
        {
            LoginData.Uid=val.Uid
            flag=true;
            localStorage.setItem("LoginDetails",JSON.stringify(LoginData))
        }
     })
     }
     if(flag===true)
     {
         alert("Login SuccessFully")
         Navigate("/")
     }
     else if(prevData!=null && flag==false){
         alert("Login Unsucessfully")
     }
  };

  let LoginbtnStyle={
    padding:"10px",
    backgroundColor:"lightGreen",
    borderRadius:"5px",
    border:"none",
    fontWeight:"bolder",
    marginTop:"5px",
    marginBottom:"15px"

  }

  let InputStyle = {
    padding: "2px",
    width: "60%",
    border: "none",
    borderBottom: "1px solid black",
    backgroundColor: "antiquewhite",
    margin: "10px",
    outline: "none",
  };

  let NavigateToSignUp = () => {
    Navigate("/SignUp");
  };

  return (
    <div
      style={{
        width: "30%",
        textAlign: "center",
        // margin: "auto",
        position: "absolute",
        left: "35%",
        top: "20%",

        backgroundColor: "antiquewhite",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        paddingBottom: "20px",
      }}
    >
      <h2 style={{ paddingTop: "20px" }}>Login Page</h2>
      <Input
        styl={InputStyle}
        name="Email"
        plch={"Enter Email"}
        typ="Email"
        func={InputHandler}
      ></Input>
      <Input
        styl={InputStyle}
        name="Password"
        plch={"Enter Password"}
        typ="Password"
        func={InputHandler}
      ></Input>
      <Button text="Login" func={LoginFunc} styl={LoginbtnStyle} />
      <p>
        Don't have an Account ? <br />
        <a
          style={{ color: "purple", textDecoration: "underline" }}
          onClick={NavigateToSignUp}
        >
          <i>SignUp</i>
        </a>
      </p>
    </div>
  );
}

export default Login;
