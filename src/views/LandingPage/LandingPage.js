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

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import CallToAction from "./Sections/CallToAction.js";
import Trust from '../../assets/img/trust.jpg';
import HowWork from "./Sections/HowWork.js";
import TeamSection from "./Sections/TeamSection.js";
import Partners from "./Sections/Partners.js";

import WhatsApp from "@material-ui/icons/WhatsApp";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <a href="https://api.whatsapp.com/send?phone=573107626875?text=Me%20gustaría%20conocer%20%20mas%20detalles%20del%20servicio" class={classes.whatsapp} target="_blank"> <WhatsApp class={classes.whatsappIcon}/></a>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="EIKOOS"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <GridContainer className ={classes.headerContainer}>
        <div className={classes.containerH}>
          <GridContainer className ={classes.headerText}>
            <GridItem xs={12} sm={12} md={6}>
              
              <h1 className={classes.title}>Recibe pagos por internet y brinda confianza a tus clientes</h1>
              <h5>
                Digitalizamos el pago contraentrega. Cierra más ventas, brindando tranquilidad a tus clientes.
              </h5>
              <h6>
                Solo 20 cupos nuevos para el 10 de Diciembre
              </h6>
              
              <Button
                color="success"
                size="lg"
                href="/registro"                
                rel="noopener noreferrer"
              >
               <i className="fas  fa-hand-point-right"></i> Reserva tu cupo
              </Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <img src={Trust} className={classes.imgHeader} alt="" />
            </GridItem>
          </GridContainer>          
        </div>
        <div className={classes.styleHeader}></div>
      </GridContainer>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <CallToAction />
          <HowWork />
          <Partners />
          <TeamSection />               
        </div>
      </div>
      <Footer />
    </div>
  );
}
