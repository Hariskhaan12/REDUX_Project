import { Card } from "react-bootstrap";
import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import MyBootstrapModal from "../Component/MyBootstrapModal";
import OffCanvasExample from "../Component/OffCanvas";



function Profile(props) {

  //fetching the login user Uid from local sotrage

  let Uid = JSON.parse(localStorage.getItem("LoginDetails")).Uid;
  let LoginUserName;

  // to get the Login UserName
  let Loginemail = JSON.parse(localStorage.getItem("LoginDetails")).Email;
  let UsersData = JSON.parse(localStorage.getItem("UserData"));
  UsersData.map((val) => {
    if (val.Email === Loginemail) {
      LoginUserName = val.Name;
    }
  });

  let initialState = {
    PostName: "",
    PostPrice: "",
    PostImage: "",
    PostDesc: "",
  };

  // State for Post that are created .. storing post details when user entering it.
  const [NewPostData, setNewPostData] = useState(initialState);

  const [show, setShow] = useState(false); // state for opening the closing the modal
  // function to open and close the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /// 2nd Modal
  const [show2, setShow2] = useState(false);
  const handle2Close = () => setShow2(false);
  const handle2Show = () => setShow2(true);

  // ---------------------------------

    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const CanvashandleClose = () => setShowOffCanvas(false);
    const CanvashandleShow = () => setShowOffCanvas(true);

  let creatPostbtnStyle = {
    position: "absolute",
    left: "85%",
    right: "10%",
    width: "10%",
  };


  let InputHandler = (e) => {
    let { name, value } = e.target;
    setNewPostData({ ...NewPostData, [name]: value });
  };

  // console.log(NewPostData);
  let CreatePost = () => {
    let LocalPostData = [];
    let oldData = JSON.parse(localStorage.getItem("PostData"));
    if (oldData === null) {
      LocalPostData.push({ ...NewPostData, Uid });
      localStorage.setItem("PostData", JSON.stringify(LocalPostData));
      props.dispatch({ type: "AddNewPost", payload: LocalPostData });
    } else {
      oldData.push({ ...NewPostData, Uid });
      localStorage.setItem("PostData", JSON.stringify(oldData));
      // console.log("NewPost Data",[{ ...NewPostData, Uid }]);
      props.dispatch({
        type: "AddNewPost",
        payload: [{ ...NewPostData, Uid }],
      });
    }

    setShow(false);
  };

  let DeletePost = (index) => {
    console.log("delete", index);
    let localPostData = JSON.parse(localStorage.getItem("PostData"));
    localPostData.splice(index, 1);
    // console.log("after delete", localPostData);
    props.dispatch({ type: "DeletePost", payload: localPostData });
    localStorage.setItem("PostData", JSON.stringify(localPostData));
  };

  
  let editBtnHandler = (index) => {
    handle2Show();
    localStorage.setItem("EditIndex",index)
  };
  
  let EditPost = () => {
    console.log(NewPostData);
    let EditIndex=localStorage.getItem("EditIndex")
    let prevLocalPostData=JSON.parse(localStorage.getItem("PostData"));
 
    prevLocalPostData[EditIndex].PostName=NewPostData.PostName
    prevLocalPostData[EditIndex].PostDesc=NewPostData.PostDesc
    prevLocalPostData[EditIndex].PostImage=NewPostData.PostImage
    prevLocalPostData[EditIndex].PostPrice=NewPostData.PostPrice
    prevLocalPostData[EditIndex].Uid = Uid;

   // after edited set back to local storage

    localStorage.setItem("PostData",JSON.stringify(prevLocalPostData))
    props.dispatch({ type: "EditPost",payload:prevLocalPostData });
    console.log(prevLocalPostData);
    handle2Close()
    
  };








  useEffect(() => {
    console.log("use Effect is Running");
    let localPostData = JSON.parse(localStorage.getItem("PostData"));
    // console.log(localPostData);
    if (localPostData != null) {
      props.dispatch({ type: "AddNewPost", payload: localPostData });
    } else {
      console.log("Local Storage data is empty");
    }
    // clean Up function is necessary since when we load the page again we dont
    // want to add again to the redux state through use Effect
    // clean up function will empty the redux state so when page load it get the data from local then add to redux
    // this will remove the automatically add twice the data in redux state
    return () => {
      props.dispatch({ type: "AddNewPost", payload: "" });
      console.log("cleanUp");
    };
  }, []);

  return (
    <div>
      {/* {console.log("return Redux state from profile:", props.PostData)} */}
      <h2 style={{ marginTop: "2%", marginLeft: "2%", fontStyle: "italic" }}>
        {LoginUserName}'s Profile
        <Button variant="link" onClick={CanvashandleShow} style={{textDecoration:"none",marginLeft:"2px"}}>
          Edit
        </Button>
        <OffCanvasExample
          show={showOffCanvas}
          handleClose={CanvashandleClose}
        />
      </h2>
      <Button
        style={creatPostbtnStyle}
        variant="warning"
        size="sm"
        onClick={handleShow}
      >
        Create New Post
      </Button>
      {/* create post Modal */}
      <MyBootstrapModal
        show2={show}
        Title=" New Post"
        btnText="Create"
        mainFunc={CreatePost}
        InputHandler={InputHandler}
        handle2Close={handleClose}
      ></MyBootstrapModal>
      {props.PostData.length == 0
        ? "No Post Created "
        : props.PostData.map((val, index) => {
            // console.log('val',val.Uid)
            if (val.Uid === Uid) {
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
                        height: "15vw",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{val.PostName}</Card.Title>
                      <Card.Text>
                        Description: {val.PostDesc} <br />
                        Price:${val.PostPrice}
                      </Card.Text>
                      <div style={{ textAlign: "right" }}>
                        <Button
                          variant="link"
                          size="sm"
                          style={{ paddingRight: "10%" }}
                          onClick={() => editBtnHandler(index)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => DeletePost(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              );
            }
          })}

      {/* Edit Post Modal */}
      <MyBootstrapModal
        show2={show2}
        Title="Edit Post"
        handle2Close={handle2Close}
        InputHandler={InputHandler}
        btnText="Save Changes"
        mainFunc={EditPost}
      />
    </div>
  );
}

const mapReduxStatetoProps = (state) => {
    // console.log("Map Redux", state.PostData);
  return {
    PostData: state.PostData,
  };
};

let newApp = connect(mapReduxStatetoProps)(Profile);

export default newApp;
