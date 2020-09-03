import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Payment from "@material-ui/icons/Payment";
import MoneyOff from "@material-ui/icons/MoneyOff";
import Money from "@material-ui/icons/Money";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>La confianza y seguridad</h2>
          <h5 className={classes.description}>
            Son algunos de los factores más importantes que influyen en la decisión de compra de los usuarios.
            Por esta razón nuestro servicio te permitirá cerrar más ventas
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Medios de Pago"
              description="Recibe los pagos de tus pedidos con tarjeta de crédito, débito, efecty o PSE"
              icon={Payment}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Evita gastos logísticos adicionales"
              description="Solo procedes a despachar el pedido una vez te confirmemmos el pago ha sido realizado. De esta manera no debes hacer esfuerzos adicionales logísticos para concretar la venta."
              icon={MoneyOff}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Liquidez"
              description="Una vez despaches el pedido y el cliente lo reciba, el dinero pasará a tu poder en un máximo de 2 días hábiles. La máxima duración del proceso será de 8 días hábiles. "
              icon={Money}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
