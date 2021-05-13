import React from 'react';


import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-kit-react/views/thankPage.js";
import GridItem from 'components/Grid/GridItem';

import Logo from "assets/img/logo_completo.png"
import { Button } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import IconButton from "@material-ui/core/IconButton";
import ReactPixel from 'react-facebook-pixel';



const useStyles = makeStyles(styles);
function ThankPage(props) {

    const classes = useStyles();

    React.useEffect(() => 
  {
    ReactPixel.init(props.fbId);
    console.log('fbId ',props.fbId);
    ReactPixel.fbq('track', 'Purchase', {currency: "COP", value: props.value});
  })
               

    return ( 
    <GridContainer justify="center" className={classes.root}>
        <div className={classes.layer}></div>
        <GridItem xs={12} sm={12} md={12} className={classes.logo}>
            <img src={Logo} style={{width:"300px"}}/>
            <h1  className={classes.title} >Gracias por tu compra!</h1>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} className={classes.desc}>
            <p className={classes.text}>Te hemos enviado un correo electrónico para que notifiques novedades con tu pedido. Tienes 8 días para hacerlo, si no recibimos novedades de tu parte, el dinero será transferido al vendedor.</p>                        
        </GridItem>
    </GridContainer>)
}
const mapStateToProps = (state) => {
    return {
        fbId: state.fbReducer.fbId,
        value: state.fbReducer.value
    }
};
  
  export default connect(mapStateToProps,null)(ThankPage);