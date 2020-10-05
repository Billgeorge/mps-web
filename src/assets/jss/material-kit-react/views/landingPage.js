import { container, title } from "assets/jss/material-kit-react.js";

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  containerH:{
    zIndex: "12",
    color: "#FFFFFF",
    position:"absolute",
    top:"20%",       
    ...container
  },
  styleHeader:{
    position:"relative",
    height: "100%",
    maxHeight:"70vh",
    width: "100%",
    background: "rgb(0,52,97)",
    background: "linear-gradient(90deg, rgba(0,52,97,1) 0%, rgba(3,137,251,1) 25%, rgba(133,195,247,1) 100%)" 
  },
  imgHeader:{
    width:"390px"
  },
  title: {
    ...title,
    display: "inline-block",
    fontSize:"3em",    
    position: "relative",
    marginTop: "10px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  headerContainer : {
    height: "70vh",
    maxHeight : "70vh",
    backgroundSize: "cover",
    position: "relative",
    backgroundPosition: "center"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  headerText:{
    paddingLeft:"8%"
  },
  whatsapp:{
    position:"fixed",
    width:"60px",
    height:"60px",
    bottom:"25px",
    right:"40px",
    backgroundColor:"#25d366",
    color:"#FFF",
    borderRadius:"50px",
    textAlign:"center",
    fontSize:"30px",
    zIndex:"100"
  },
  whatsappIcon:{
    fill:"white"
  },
  '@media(max-width: 600px)':{
    title:{
      fontSize:[['2rem'], '!important']
    },
    h4:{
      fontSize:'1rem'
    }
  },
  '@media(max-width: 330px)':{
    styleHeader:{
      maxHeight:"95vh"
    },
    headerContainer : {
      height: "95vh",
      maxHeight : "95vh"
    }
  },
  '@media(max-width: 770px)':{
    imgHeader:{
      display:"none"
    }
  },
  '@media(min-width: 430px && min-width: 899px)':{
    styleHeader:{
      maxHeight:"55vh"
    },
    headerContainer : {
      height: "55vh",
      maxHeight : "55vh"
    }
  },
  '@media(min-width: 1025px)':{
    styleHeader:{
      maxHeight:"90vh"
    },
    headerContainer : {
      height: "90vh",
      maxHeight : "90vh"
    },
    headerText:{
      paddingLeft:"20%"
    }
  }
};
export default landingPageStyle;
