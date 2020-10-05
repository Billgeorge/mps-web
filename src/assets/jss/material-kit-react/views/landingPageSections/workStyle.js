import { title } from "assets/jss/material-kit-react.js";

const callToActionStyle = {
  section: {
    backgroundColor: "#f5f7fa",    
    padding: "30px 0"
  },
  title: {
    ...title,
    marginBottom: "50px",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center"
  },
  description: {
    color: "#999",
    textAlign: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px"
  },
  form:{
    textAlign: "center"
  },
  reactPLayer:{
    position: "absolute",
    top: "0",
    left: "0",
    
  },
  reactPlayerWrap:{
    position: "relative",
    paddingTop: "5%",
    minHeight:"500px"
  }
};

export default callToActionStyle;
