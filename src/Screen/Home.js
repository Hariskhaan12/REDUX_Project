import {React,useState,useEffect} from 'react'
// import Button from '../Component/Button'
import {useNavigate} from 'react-router-dom'
import {Card,Button} from 'react-bootstrap'
import { connect } from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function Home(props) {
let Navigate=useNavigate();
let Uid = JSON.parse(localStorage.getItem("LoginDetails")).Uid;

const [HeartIconStyle, setHeartIconStyle] = useState(false);
const [AddedFav, setAddedFav] = useState("");



let CreatePost=()=>{  
  // console.log("this is creatPost func");
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


 let DeletePost = (index) => {
   console.log("delete", index);
   let localPostData = JSON.parse(localStorage.getItem("PostData"));
   localPostData.splice(index, 1);
   // console.log("after delete", localPostData);
   props.dispatch({ type: "DeletePost", payload: localPostData });
   localStorage.setItem("PostData", JSON.stringify(localPostData));
 };




let IconStyle={
  position:"relative",
  bottom:"20px",
  left:"7.5rem",
  top:"12%"
}






let HeartIconFunc=()=>{
    setHeartIconStyle(!HeartIconStyle);
  

}


useEffect(() => {
   let localPostData = JSON.parse(localStorage.getItem("PostData"));
   // console.log(localPostData);
   if (localPostData != null) {
     props.dispatch({ type: "AddNewPost", payload: localPostData });
   } else {
     console.log("Local Storage data is empty");
   }
   // empty the redux state so when we on the profile page we dont extra data in redux we only add the data which is in local stroage
   // through use state.
     return () => {
       props.dispatch({ type: "AddNewPost", payload: "" });
       console.log("cleanUp");
     };


}, [])


  return (
    <div>
      {/* {console.log('Home',props.PostData)} */}
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={CreatePost}
          variant="warning"
          size="md"
          style={{ backgroundColor: "orange", marginTop: "8%" }}
        >
          Create Post
        </Button>
        {/* <Button func={CreatePost} styl={CreatePostStyle} text="CREATE POST" /> */}
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
                    src={val.PostImage}
                    style={{
                      width: "100%",
                      height: "17vw",
                      objectFit: "cover",
                    }}
                  />
                  <Card.Body>
                    <Card.Title>
                      {val.PostName}
                      <div className="ICONS" style={IconStyle}>
                        <FontAwesomeIcon
                          icon={faHeart}
                          size="lg"
                          style={{
                            color: HeartIconStyle ? "red" : "grey",
                            marginLeft: "44%",
                            paddingRight: "5%",
                          }}
                          onClick={HeartIconFunc}
                        />
                        
                        <span style={{display: "flex",position: "relative",left: "38%",fontSize: "small"}}>
                          {AddedFav}
                        </span>

                      
                      </div>
                    </Card.Title>
                    <Card.Text
                      style={{
                        position: "relative",
                        bottom: "8%",
                        right: "4%",
                      }}
                    >
                      <strong> Description:</strong> {val.PostDesc} <br />
                      <strong> Price : $ </strong>
                      {val.PostPrice}
                    </Card.Text>
                    {val.Uid === Uid ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        {/* <Button variant="link" size="md" style={{marginRight:"4%"}}>Edit</Button> */}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => DeletePost(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
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