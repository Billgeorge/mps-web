import { container } from "assets/jss/material-kit-react.js";



const promotionStyle = {

    container: {   
        ...container,
        paddingTop: "15vh",
        marginBottom: "2rem",
        width: "90%",
        margin: '0 auto',
        paddingLeft: "5vh",
        color: "#000",
    },
    arrow:{
        color: "#9c27b0", 
        textDecoration: "none",
        cursor:"pointer", 
        width: '40px',
        height: '40px',
        border: "1px solid #000", 
        borderRadius: '50%',
        '&:hover':{
            transition: '.2s',
            backgroundColor: '#9c27b0',
            color: '#fff',
            border: 'none',
        }        
        
    },
    title:{
        fontSize:'1.25rem', 
        marginBottom: '1rem',
        textAlign: 'center',
        
        
    },
    cardHeader:{
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    picture:{
        display: 'block',
        height: '200px', 
        width: '250px',
        objectFit: 'contain',
        margin: '0 auto'
    },
    
    '@media(max-width: 600px)':{    
    container:{
      paddingLeft:"10vh",
    },
    title: {
        fontSize: '1rem'
    }

    },
}

export default promotionStyle;