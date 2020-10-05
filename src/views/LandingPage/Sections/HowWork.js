import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Link from "@material-ui/icons/Link";
import LocalShipping from "@material-ui/icons/LocalShipping";
import AccountBalance from "@material-ui/icons/AccountBalance";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function HowWork() {
  const classes = useStyles();
  return (
    <div className={classes.section} id="howWork">
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>¿Cómo funciona?</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Comparte enlace de pago"
              description="Inicia sesión y genera un enlace de pago usando nuestra plataforma. Compártelo con tu cliente para que pague."
              icon={Link}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Despacha el pedido"
              description="Una vez el pago sea realizado, nuestra plataforma te  notificará mediante correo electrónico para que procedas a despachar el pedido. Recuerda que el pago está retenido."
              icon={LocalShipping}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Recibe tu dinero"
              description="Actualiza el estado del pedido a enviado dentro de nuestra plataforma. Si no se presenta ninguna novedad en 8 días hábiles o antes, el dinero del pedido te será transferido."
              icon={AccountBalance}
              iconColor="info"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}