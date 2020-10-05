
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Cube from "assets/img/cube.png"
import Estarter from "assets/img/estarter.png"
import FinalFeliz from "assets/img/finalfeliz.png"

const useStyles = makeStyles(styles);

export default function Partner() {
    const classes = useStyles();
    return (
        <div className={classes.section} id="howWork">
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Nuestros Aliados</h2>
          </GridItem>
        </GridContainer>

        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4} style={{marginBottom:"20px"}}>
            <img src={Cube} style={{width:"100px"}} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4} style={{marginBottom:"20px"}}> 
            <img src={Estarter} style={{width:"100px"}} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <img src={FinalFeliz} style={{width:"100px"}} />
          </GridItem>
        </GridContainer>
        </div>
    )
}