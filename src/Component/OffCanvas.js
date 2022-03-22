import {Offcanvas} from 'react-bootstrap'
import Input from './Input';
import {Button} from "react-bootstrap"

function OffCanvasExample({show,handleClose,InputHandler}) {

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


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button> */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Your Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={PostDetailsWrap}>
            <label style={labelStyle}>Name:</label>
            <Input
              name="PostName"
              typ="text"
              styl={InputStyle}
              func={InputHandler}
            />
          </div>
          <div style={PostDetailsWrap}>
            <label style={labelStyle}>Email:</label>
            <Input
              name="PostPrice"
              typ="Number"
              styl={InputStyle}
              func={InputHandler}
            />
          </div>
          <div style={{ display: "flex", marginTop: "5%" }}>
            <label style={{ marginRight: "2rem" }}>D.O.B : </label>
            <Input typ="Date"></Input>
          </div>
          <div style={{ marginTop: "5%" }}>
            <label style={{ marginRight: "4rem" }}>Select Your Profile : </label>
            <Input typ="file"></Input>
          </div>
          <Button variant="success" size="sm" style={{marginTop:"8%"}}>Save</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasExample;