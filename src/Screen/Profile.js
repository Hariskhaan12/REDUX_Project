import { Modal, Card } from "react-bootstrap";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Input from "../Component/Input";
import { connect } from "react-redux";

function Profile(props) {
  //fetching the user data from local sotrage
  let Uid = JSON.parse(localStorage.getItem("LoginDetails")).Uid;
  let LoginUserName;

  // to get the Login UserName 
  let Loginemail = JSON.parse(localStorage.getItem("LoginDetails")).Email;
  let UsersData = JSON.parse(localStorage.getItem("UserData"));
  UsersData.map((val)=>{
    if(val.Email===Loginemail)
    {
    LoginUserName=val.Name
    }
  })
  

  let initialState = {
    PostName: "",
    PostPrice: "",
    PostImage: "",
    PostDesc: "",
  };
  const [show, setShow] = useState(false); // state for opening the closing the modal
  const [NewPostData, setNewPostData] = useState(initialState);

  // function to opena nd close the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let creatPostbtnStyle = {
    position: "absolute",
    left: "85%",
    right: "10%",
    width:"10%"
  };

  let labelStyle = {
    // textAlign: "right",
    // clear: "both",
    float: "left",
    marginRight: "15px",
  };
  let PostDetailsWrap = {
    marginTop: "12px",
  };

  let InputStyle = {
    border: "none",
    borderBottom: "1px solid black",
    textDecoration: "none",
    outline: "none",
    position: "relative",
    left: "25px",
  };

  let InputHandler = (e) => {
    let { name, value } = e.target;
    setNewPostData({ ...NewPostData, [name]: value });
  };

  // console.log(NewPostData);
  let CreatePost = () => {
    props.dispatch({
      type: "AddNewPost",
      payload: {
        UserId: Uid,
        PName: NewPostData.PostName,
        PP: NewPostData.PostPrice,
        PI: NewPostData.PostImage,
        PD: NewPostData.PostDesc,
      },
    });
    // props.dispatch({ type: "Good", PName: NewPostData.PostName });
    setShow(false);
  };

  return (
    <div>
      <h2 style={{marginTop:"2%",marginLeft:"2%",fontStyle:"italic"}}>{LoginUserName}'s Profile</h2>
      <Button
        style={creatPostbtnStyle}
        variant="warning"
        size="sm"
        onClick={handleShow}
      >
        Create New Post
      </Button>
      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div style={PostDetailsWrap}>
            <label style={labelStyle}>Post Name:</label>
            <Input
              name="PostName"
              typ="text"
              styl={InputStyle}
              func={InputHandler}
            />
          </div>
          <div style={PostDetailsWrap}>
            <label style={labelStyle}>Post Price:</label>
            <Input
              name="PostPrice"
              typ="Number"
              styl={InputStyle}
              func={InputHandler}
            />
          </div>
          <div style={PostDetailsWrap}>
            <label style={labelStyle}>Post Image Url:</label>
            <Input
              name="PostImage"
              typ="text"
              styl={InputStyle}
              func={InputHandler}
            />
          </div>
          <div style={PostDetailsWrap}>
            <label style={labelStyle}>Description:</label>
            <textarea
              style={{ width: "60%", outline: "none" }}
              onChange={InputHandler}
              name="PostDesc"
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" size="sm" onClick={CreatePost}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {props.PostData.length == 0
        ? "No Post Created "
        : props.PostData.map((val, index) => {
            // {console.log(val)}
            if (val.UserId === Uid) {
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
                        height: "15vw",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{val.PName}</Card.Title>
                      <Card.Text>
                        Description: {val.PD} <br />
                        Price:${val.PP}
                      </Card.Text>
                      <Button variant="primary" size="sm">Edit</Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            }
          })}
    </div>
  );
}

const mapReduxStatetoProps = (state) => {
    console.log("Map Redux", state.PostData);
  return {
    PostData: state.PostData,
  };
};

let newApp = connect(mapReduxStatetoProps)(Profile);

export default newApp;
