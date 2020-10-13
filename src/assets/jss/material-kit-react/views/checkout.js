import { container } from "assets/jss/material-kit-react.js";

const checkoutStyle = {
    container: {
        boxShadow: "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        bordeRadius: "6px",
        backgroundColor: "#fff !important",
        marginLeft:"1%",
        marginRight:"1%",
        marginTop:"20px",
        paddingLeft:"1%",
        padding:"1%",
        zIndex: "12",
        color: "#000",
        ...container
    },
    detailTitle:{
        fontSize: "20px",
    fontWeight: "500",
    color: "rgba(26,26,26,.6)"
    },
    totalPrice:{
    fontSize: "36px",
    fontWeight: "600"
    },
    midSize:{
        marginLeft:"0",
        marginRight:"0",
        
        paddingRight:"0",
        width:"100%"
    },
    shopName:{
      fontWeight:"500",
      marginTop:"25px",
      marginBottom:"25px",
      marginLeft:"5px",
      fontFamily: "'Fira Sans Extra Condensed', sans-serif"
           
    }
}

export default checkoutStyle;