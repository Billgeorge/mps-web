import { container } from "assets/jss/material-kit-react.js";
import promotionStyle from "./Promotions";


const signupPageStyle = {
  container: {
    ...container,
    paddingTop: "15vh",
    marginBottom: "2rem",
    width: "90%",
    margin: '0 auto',
    paddingLeft: "5vh",
    color: "#000",
  },
  arrow: {
    ...promotionStyle.arrow,
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
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
  form: {
    margin: "0"
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
  infoWork:{
    fontWeight:"500"
  },
  textArea:{
    border: "1px solid #c5c5c8",
    color: "rgba(0, 0, 0, 0.54)",
    padding: "0",
    fontSize: "1rem",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
    fontWeight: "400",
    lineHeight: "1",
    letterSpacing: "0.00938em"
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px"
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center"
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important"
  },
  section: {
    backgroundColor: "white",
    borderRadius: "5px",
    color: "black",
    textAlign: "center"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  imgProduct:{
    width: "100%",
    maxWidth: "550px",
    height: "auto",
    margin:"auto",
    borderColor:"gray",
    borderStyle:"dashed",
    borderWidth:"thin"
    
  },
  inputIconsColor: {
    color: "#495057"
  },
  '@media(max-width: 600px)':{    
    container:{
      paddingLeft:"15vh",
      width:"100%",
    }
  },
  addImg:{    
    position: "relative",
    top: "80%",
    left: "50%"
  }
};

export default signupPageStyle;