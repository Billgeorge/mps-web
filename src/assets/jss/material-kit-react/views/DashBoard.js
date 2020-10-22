import { container } from "assets/jss/material-kit-react.js";

const signupPageStyle = {
  container: {
    ...container,
    zIndex: "2",
    position: "relative",
    paddingTop: "10vh",
    color: "#FFFFFF",
    paddingBottom: "200px"
  },
  textButton:{
    display: "inline-block",
    width: "100%",
    fontSize: "13px",
    color: "#999",
    lineHeight: "15px",
    textAlign: "center"
  },
  subContainer: {
    backgroundColor:"gray"    
  },
  boxItem: {
    border:"1px solid #e4e4e4",
    borderRadius: "5px",
    padding: "15px",
    margin: "4px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"    
  },
  imgLink: {
    width:"75px",
    height:"75px"   
  },
  box: {
    backgroundColor:"white",
    color:"black"    
  },
  boxDetail: {
    backgroundColor:"white !important",
    color:"black",
    height:"100px"    
  },
  grid:{
    paddingBottom: "30px"
  },
  valueText:{
    fontSize: "22px",
    color: "#000",
    fontWeight: "600"
  },
  valueTextDetail:{
    fontSize: "16px",
    color: "#000",
    fontWeight: "600"
  },
  deliveryForm:{
    backgroundColor:"white",
    color:"black",
    height:"100px"
    
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%"
    }
  },
  '@media(max-width: 600px)':{
    deliveryForm:{
      height:"150px !important",
      textAlign:"center"
    }
  }  
};

export default signupPageStyle;
