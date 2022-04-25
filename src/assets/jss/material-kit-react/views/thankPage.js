import Background from 'assets/img/thanks_bg.jpg'
import BackgroundCel from 'assets/img/thanks_bg_cel.jpg'


const thankPageStyle = {
   root:{
        position: "relative",
        height: "100vh",
        color: "#44169E",
        paddingTop: "5%",
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover'       
    },
    button:{
        color:"#44169E",
        marginLeft:"5px",
        marginTop:"20px"
    },
    layer:{
        backgroundColor: '#e5e5e5 !important',
        opacity:'0.9',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
    },
    logo:{       
        zIndex: "2",
        height:"7%",
        textAlign:'center'
    },
    title:{
        fontWeight:"700"        
    },
    desc:{
        textAlign:"center",
        width:"50%"
    },
    text:{
        fontSize:"20px !important",
        fontWeight:"400"
    },    
    '@media screen and (max-width: 600px)': {
        root: {
            backgroundImage: `url(${BackgroundCel})`
        },
        logo:{
            height:"25%"
        },        
        desc:{
            width:"99%"
        },
        text:{
            fontSize:"16px !important"
        }
    }
}

export default thankPageStyle;