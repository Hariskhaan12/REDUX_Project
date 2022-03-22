import {Modal,Button} from 'react-bootstrap'
import React from 'react'
import Input from '../Component/Input'

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

function MyBootstrapModal({ show2, handle2Close, Title, InputHandler, btnText,mainFunc }) {
  return (
    <div>
      <Modal
        show={show2}
        onHide={handle2Close}
        size="md"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{Title}</Modal.Title>
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
          <Button variant="danger" onClick={handle2Close}>
            Close
          </Button>
          <Button variant="primary" onClick={mainFunc}>
            {btnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyBootstrapModal
 

