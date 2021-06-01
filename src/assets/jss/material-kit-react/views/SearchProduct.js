import { container } from "assets/jss/material-kit-react.js";

const SearchProductStyle = {
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
  '@media(max-width: 600px)':{
    container:{
      paddingLeft:"10vh"
    }
  }  
}

export default SearchProductStyle;

