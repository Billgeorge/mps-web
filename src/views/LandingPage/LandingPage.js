import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import CallToAction from "./Sections/CallToAction.js";
import Video from "./Sections/Video.js";
import HowWork from "./Sections/HowWork.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="MiPagoSeguro"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Genera Confianza y Seguridad a Tus Clientes Sin Usar ContraEntrega</h1>
              <h4>
                Con nuestro servicio aseguras el pago de la compra por adelantado y 
                puedes despachar con tranquilidad
              </h4>
              <br />
              <Button
                color="success"
                size="lg"
                href="/registro"                
                rel="noopener noreferrer"
              >
               <i className="fas  fa-hand-point-right"></i> Usar Servicio  
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Video />
          <ProductSection />
          <CallToAction />
          <HowWork />               
        </div>
      </div>
      <Footer />
    </div>
  );
}
