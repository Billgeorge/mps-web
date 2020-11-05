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
          <h2 className={classes.title}>Vende sin comisiones, ¡Separa tu cupo ahora!</h2>
          <h4 className={classes.description}>
            Cuando nuestro servicio este activo puedes vender sin comisión durante tus primeros 5 días o hasta $2.000.000
          </h4>
          <div className={classes.form}>
            <GridContainer justify="center">              
              <GridItem xs={12} sm={12} md={4}>
                <Button size="lg" style={{backgroundColor:"rgb(14 95 220)"}} href="/registro"><i className="fas  fa-hand-point-right"></i>Separa tu cupo</Button>
              </GridItem>
            </GridContainer>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
