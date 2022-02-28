import { container } from "assets/jss/material-kit-react.js";

const createProductPageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    paddingLeft: "5vh",
    color: "#FFFFFF",
    paddingBottom: "200px"
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px"
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important"
  },
  imgProduct:{
    width: "100%",
    maxWidth: "500px",
    height: "auto",
    margin:"0 auto",
    borderColor:"gray",
    borderStyle:"dashed",
    borderWidth:"thin"
  },
  addImg:{
    position: "absolute",
    top: "87%",
    right: "12%"
  },
  addFile:{
    width: "100px",
    height: "100px",
    border: "blue !important",
    borderStyle: "dashed !important",
    borderRadius: "10px !important"
  }
}

export default createProductPageStyle;