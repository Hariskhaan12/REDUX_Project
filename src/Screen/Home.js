import {React,useState} from 'react'
import Button from '../Component/Button'
import {useNavigate} from 'react-router-dom'
import {Card} from 'react-bootstrap'
import { connect } from "react-redux";


function Home(props) {
let Navigate=useNavigate();
let Uid = JSON.parse(localStorage.getItem("LoginDetails")).Uid;
const [ShowPostBtn, setShowPostBtn] = useState("none");



let CreatePost=()=>{  
  console.log("this is creatPost func");
    let loginUSer = localStorage.getItem("LoginDetails");
    if(loginUSer===null)
    {
      alert("You Need to loggedIn first...!")
      Navigate('/Login')
    }
    else{
      Navigate("/Profile")
    }
}

let CreatePostStyle={
    backgroundColor:"orange",
    padding:"10px",
    marginTop:"8%",
    border:"none",
    borderRadius:"4px"
}

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Button func={CreatePost} styl={CreatePostStyle} text="CREATE POST" />
      </div>
      <h2>All Blogs</h2>
      {props.PostData.length == 0
        ? "No One Created Any Post Yet "
        : props.PostData.map((val, index) => {
              return (
                <div
                  className="CardItem"
                  key={index}
                  style={{
                    display: "inline-flex",
                    marginTop: "4rem",
                    marginLeft: "3rem",
                  }}
                >
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={val.PI}
                      style={{
                        width: "100%",
                        height: "17vw",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{val.PName}</Card.Title>
                      <Card.Text>
                        Description: {val.PD} <br />
                        Price:${val.PP}
                      </Card.Text>
                     {val.UserId===Uid ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          text="Edit"
                          styl={{
                            display: { ShowPostBtn },
                            backgroundColor: "grey",
                            padding: "10px",
                            marginTop: "8%",
                            border: "none",
                            borderRadius: "4px",
                            marginRight: "12px",
                            padding: "12px",
                            paddingRight: "15px",
                          }}
                        />
                        <Button
                          text="delete"
                          styl={{
                            display: { ShowPostBtn },
                            backgroundColor: "Red",
                            padding: "10px",
                            marginTop: "8%",
                            border: "none",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                     ):("")}
                     </Card.Body>
                   </Card>
                 </div>
              );
          })}
    </div>
  );
}

const mapReduxStatetoProps = (state) => {
  //   console.log("Map Redux", state.PostData[0].PP);
  return {
    PostData: state.PostData,
  };
};


let newHome = connect(mapReduxStatetoProps)(Home);



export default newHome;