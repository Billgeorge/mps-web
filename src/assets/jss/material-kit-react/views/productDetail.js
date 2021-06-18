import { container } from "assets/jss/material-kit-react.js";

const productDetailStyle = {
    container: {
        ...container,
        position: 'relative',        
        backgroundColor: "#fff !important",
        marginLeft:"5%",
        marginRight:"1%",
        marginTop:"60px",
        paddingLeft:"2%",
        paddingBottom: "200px",
        paddingTop: "2%",
        zIndex: "2"
    },
    buttons: {   
        border: "none",     
        color: "#FFFFFF",
        padding:"15px",
        textAlign: "center",
        position : "relative",
        top: "-16px",
        left: "-16px",              
        fontSize: "16px",
        margin: "2px",
        backgroundColor:"#000000",        
    },
    rightSide:{
        backgroundColor:"#fff",
        marginTop: "1%",
        marginBottom: "1%"
    },
    detailText:{      
        fontSize: "20px",
        fontWeight: "500",
        textAlign:"center",
        color: "rgba(26,26,26,.6)",
        paddingTop:"5px"
    },
    totalPrice:{
        fontSize: "36px",
        fontWeight: "500",
        color: "#000000CC",
        fontFamily: "Proxima Nova,-apple-system,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif"

    },
    gridItemCard: {
        marginBottom: '20px',
    },
    media: {
        height: 150,
        backgroundSize: '100%'       
    },
    imgProduct:{
        width: "100%",
        maxWidth: "500px",
        height: "auto",
        margin:"0 auto"

    },
    productDescription:{
        fontSize: "18px",
        fontWeight: "400",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        color: "#9b9b9b"
    },
    midSize:{
        marginLeft:"0",
        marginRight:"0",
        
        paddingRight:"0",
        width:"100%"
    },
    shopName:{
      fontWeight:"350",
      marginTop:"25px",
      marginBottom:"25px",
      marginLeft:"5px",
      fontFamily: "'Fira Sans Extra Condensed', sans-serif"
           
    },
    buttonText:{
        '&:hover': {
            backgroundColor: "#0202ab",
            color:"white"
        },
        backgroundColor:"#01015a",
        fontWeight:"bold",
        fontSize:"1.1em",
        textTransform:"none",
        width:"98%"
    }
}

export default productDetailStyle;