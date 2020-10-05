import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Payment from "@material-ui/icons/Payment";
import MoneyOff from "@material-ui/icons/MoneyOff";
import ThumbUp from "@material-ui/icons/ThumbUp";
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
            Por esta razón, nuestro servicio te permitirá cerrar más ventas
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <h2 className={classes.title}>Beneficios</h2>
        </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Recibe cualquier medio de Pago"
              description="Recibe los pagos de tus pedidos con tarjeta de crédito, débito, efecty o PSE"
              icon={Payment}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Somos una contraentrega digital"
              description="Aunque el comprador paga antes de recibir el producto, dicho pago solo será entregado al vendedor cuando el comprador notifique la recepción a satisfacción del producto."
              icon={MoneyOff}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Incrementa tus ventas"
              description="Al brindar confianza y seguridad a tus clientes mediante nuestros servicios, estarán más dispuestos a comprarte."
              icon={ThumbUp}
              iconColor="success"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
