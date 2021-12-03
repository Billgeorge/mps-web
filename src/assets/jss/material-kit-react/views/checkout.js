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
        marginTop: "10%"
    },
    detailText:{      
        fontSize: "1.5rem",
        fontWeight: "500",
        color: "rgba(26,26,26,.6)",
        margin: '0',
    },
    totalPrice:{
        fontSize: "36px",
        fontWeight: "600", 
        lineHeight: "1",
        
    },
    gridItemCard: {
        marginBottom: '20px',
    },
    media: {
        height: 200,
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
        fontFamily: "Roboto, Helvetica, Arial, sans-serif"
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
    },
    containerVariants:{
       display: 'flex',
       flexFlow: 'row wrap',
       alignItems: 'center',
       gap: '10px',
       marginTop: '1rem',
    },
    containerItems:{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '1rem',
        border: '1px solid gray',
        borderRadius: '20px',
        overflow: 'hidden',
        minHeight: '200px'
    },
    conteinerItem:{
        display: 'flex',
        gap: '10px',
        borderStyle: 'dashed none',
        borderWidth: '1.5px',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
       counter:{
        display: 'absolute',
        backgroundColor: 'green',
        color: 'white',
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        top: '0'

},
    containerCards:{
        
        width: '30%',
        border: '1px solid black',
        borderRadius: '20px',
        overflow: 'hidden',
        margin: '0',
        padding: '0'
        
    },
    containerCard:{
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      

    },
    formControl:{
        width: "25%", 
        backgroundColor: "white"
    },   
    title:{
        margin: '0',
        fontSize: '1.5rem', 
        borderBottom: '1px solid #111',
    },
    button:{
        width: '90%',
        fontSize: '10px',
        color: '#fff',
        backgroundColor: 'green'
    },

    '@media(max-width: 600px)':{    
        formControl:{
          width: '80%',
          margin: '0 auto'
        },
        title: {
            fontSize: '1.2rem',
            fontWeight: "400",
        }
    
        },
}

export default checkoutStyle;