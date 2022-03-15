import React, { useState } from 'react'
import Button from '../Component/Button'
import Input from '../Component/Input'
import{ useNavigate} from "react-router-dom";

function SignUp() {
    let Navigate=useNavigate();

    let initialState={
        Name:"",
        Email:"",
        Password:"",
        Uid:""
    }
    const [UserData, setUserData] = useState(initialState);


    let InputHandler=(e)=>{
        let {name,value}=e.target;
        setUserData({ ...UserData,[name]:value});
    }

    let SignUpFunc=()=>{
        let flag=false;
        if(UserData.Email===""||UserData.Password==="" ||UserData.Name==='')
        {
            alert("All Fields Must be Filled")
        }
        else{
        let prevData=JSON.parse(localStorage.getItem("UserData"));
        if(prevData===null)
        {
            let random = Math.floor(Math.random() * 100000);
            UserData.Uid = random;
            localStorage.setItem("UserData", JSON.stringify([UserData]));
            alert("SignUp Successfully")
        }
        else{
              prevData.map((val, index) => {
                if (val.Email === UserData.Email) {
                    flag=true;
                  alert("Email Already Exist");
                }
            });
            if(flag===false)
            {
                let random = Math.floor(Math.random() * 100000);
                UserData.Uid = random;
                prevData.push(UserData);
                localStorage.setItem("UserData", JSON.stringify(prevData));
                alert("SignUp Successfully");
            }
        }
    }
    }

let SignUpbtnStyle = {
  padding: "10px",
  backgroundColor: "lightGreen",
  borderRadius: "5px",
  border: "none",
  fontWeight: "bolder",
  marginTop: "5px",
  marginBottom: "15px",
};
let InputStyle = {
  padding: "2px",
  width: "60%",
  border: "none",
  borderBottom: "1px solid black",
  backgroundColor: "antiquewhite",
  margin: "10px",
  outline: "none",
};

let NavigateToLogin=()=>{
    Navigate("/Login")
}

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
      <h2 style={{ paddingTop: "20px" }}>SignUp Page</h2>
      <Input
        styl={InputStyle}
        name="Name"
        plch={"Enter Your Name"}
        typ="text"
        func={InputHandler}
      ></Input>
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
      <Button styl={SignUpbtnStyle} text="SignUp" func={SignUpFunc} />
      <p>
        Already Have an Account ? <br />
        <a
          style={{ color: "purple", textDecoration: "underline" }}
          onClick={NavigateToLogin}
        >
          <i>Login</i>
        </a>
      </p>
    </div>
  );
}

export default SignUp