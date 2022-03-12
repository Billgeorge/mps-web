import { container } from "assets/jss/material-kit-react.js";
import signupPageStyle from "./DashBoard";


const PublicProductStyle = {
  container: {
    ...container,
    flexGrow: 1,
    zIndex: "2",
    position: "relative",
    paddingLeft: "5vh",
    paddingTop: "15vh",
    color: "#FFFFFF",
    paddingBottom: "200px"
  },
  title: {
    ...signupPageStyle.title
  },

  '@media(max-width: 600px)':{
    container:{
      paddingLeft:"5vh"
    },
    title: {
      fontSize:"1.5rem",
      textAlign:"center"
    }
   
  }  
}

export default PublicProductStyle;

