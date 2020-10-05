import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function CallToAction() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Regístrate y usa el servicio gratis</h2>
          <h4 className={classes.description}>
            Una vez te registres, puedes usar el servicio sin comisión por 5 días o hasta $2.000.000 (aplican términos y condiciones)
          </h4>
          <div className={classes.form}>
            <GridContainer justify="center">              
              <GridItem xs={12} sm={12} md={4}>
                <Button style={{backgroundColor:"#003461"}} href="/registro">Aumentar mis ventas ya!</Button>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
