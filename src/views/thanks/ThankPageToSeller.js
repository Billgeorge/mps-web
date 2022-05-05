import React from 'react';



import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-kit-react/views/thankPage.js";
import GridItem from 'components/Grid/GridItem';

import Logo from "assets/img/logo_completo.png"




const useStyles = makeStyles(styles);
export default function ThankPageToSeller(props) {

    const classes = useStyles();

    return (
        <GridContainer justify="center" className={classes.root}>
            <div className={classes.layer}></div>


            <GridItem xs={12} sm={12} md={12} className={classes.logo}>
                <img src={Logo} style={{ width: "300px" }} />
                <h1 className={classes.title} >Gracias por tu pago</h1>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.desc}>
                <p className={classes.text}>Si este es tu pago de membresía y ya creaste tu contraseña, ahora puedes iniciar sesión. Si es el pago de un pedido, recuerda los pedidos salen a despacho entre el 11 y 13 o 24 y 26 de cada mes.</p>                
            </GridItem>

        </GridContainer>
    )
}