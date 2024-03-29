import React from 'react';



import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-kit-react/views/thankPage.js";
import GridItem from 'components/Grid/GridItem';

import Logo from "assets/img/logo_completo.png"



const useStyles = makeStyles(styles);
export default function ThankPage(props) {

    const classes = useStyles();
      
    return (
        <GridContainer justify="center" className={classes.root}>
            <div className={classes.layer}></div>


            <GridItem xs={12} sm={12} md={12} className={classes.logo}>
                <img src={Logo} style={{ width: "300px" }} />
                <h1 className={classes.title} >Gracias por tu compra!</h1>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.desc}>
                <p className={classes.text}>Tu pedido ha sigo creado. Recuerda que este será enviado al vendedor para que te lo entregue.</p>                
            </GridItem>

        </GridContainer>
    )
}