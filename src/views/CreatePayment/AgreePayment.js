import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {getIdFromUrl} from 'util/UrlUtil'
import InfoArea from "components/InfoArea/InfoArea.js";
import Lock from "@material-ui/icons/Lock";
import TrackChanges from "@material-ui/icons/TrackChanges";
import EmojiEmotions from "@material-ui/icons/EmojiEmotions";

import {consumeServiceGet} from 'service/ConsumeService'
import {CORE_BASEURL} from 'constant/index'

import styles from "assets/jss/material-kit-react/views/createPayment.js";

import consumerService from '../../service/ConsumeService'

const useStyles = makeStyles(styles);

export default function AgreePayment(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");  

  const [errorMessage, setErrorMessage] = React.useState({});
  const [payment, setPayment] = React.useState({});
  const [merchant, setMerchant] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);      

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const callBackSuccessGet = (payment) =>{
    setPayment(payment)
    const url = `${CORE_BASEURL}/merchant/${payment.idMerchant}`
    consumeServiceGet(callBackGet,callBackSuccessGetMerchant,url)
  }
  const callBackSuccessGetMerchant = (merchant) => {
    setMerchant(merchant)
  }

  const callBackGet = () => {
    let errorObjects = {"Error":"Error completando pago, por favor contactar a administrador"}
    setErrorMessage(errorObjects)
    setIsLoading(false)
  }

  React.useEffect(() => changeMessageValidation(), []);
  const getPaymentData = () => {
    const idPayment = getIdFromUrl()
    const url = `${CORE_BASEURL}/payment/${idPayment}`
    consumeServiceGet(callBackGet,callBackSuccessGet,url)
  }

  const changeMessageValidation = () =>{
    getPaymentData()
    document.agreeForm.onsubmit = function(event){
      
      const callBack = (error) => {
        let errorObjects = {"Error":"Error completando pago, por favor contactar a administrador"}
        if(error !== null){
          errorObjects = error
        }
        setErrorMessage(errorObjects)
        setIsLoading(false)
      }
      const callBackSucess = (url) =>{
        document.getElementById("agreeForm").reset();
        setIsLoading(false)        
        window.location.assign(url)
      }
      setIsLoading(true)
      console.log("submitting")
      event.preventDefault()
      setErrorMessage({})
      const form = event.currentTarget;      
      consumerService({    
        idPayment: getIdFromUrl(),
        customer: {
          numberId: document.getElementById("id").value,
         name: document.getElementById("name").value,
        lastName:document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        contactNumber: document.getElementById("contactNumber").value
        }
      },callBack,callBackSucess, CORE_BASEURL+"/payment/agree")
    }
    let htmlInputs = document.forms["agreeForm"].getElementsByTagName("input");
    console.log(htmlInputs)
    for(let input of htmlInputs){
      console.log(input.item)
     input.oninvalid = function(e) {
        e.target.setCustomValidity("Este campo es obligatorio o invalido");
    }
    input.oninput = function(e) {
      e.target.setCustomValidity("");
  };
    }    
  }
  return (
    
    <div>
      <Header
        absolute
        color="transparent"
        brand="MiPagoSeguro"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
            backgroundColor:"#03a9f4"
          /*backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"*/
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} validated="true" name="agreeForm" id="agreeForm">
                    <CardHeader className={classes.cardHeader}>
                        <h3 style={{fontWeight:"600"}}>Aceptar Pago</h3>
                    </CardHeader>                 
                    <CardBody>
                    {isLoading
                                ? <CircularProgress/>
                                : <span></span>
                    }
                    <span>Has recibido una solicitud de pago por el valor de <b>{payment.amount}</b> de <b>{merchant.name}</b></span>
                    <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                    <InputLabel htmlFor="id">Cédula</InputLabel>
                        <OutlinedInput
                            id="id"
                            placeholder="Número de cédula"                            
                            labelWidth={60}
                            type="number"
                            required
                        />
                    </FormControl>
                    <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                    <InputLabel htmlFor="name">Nombres</InputLabel>
                        <OutlinedInput
                            id="name"
                            placeholder="Nombre Completo"                            
                            labelWidth={60}
                            required
                        />
                    </FormControl>
                    <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                        <InputLabel htmlFor="lastName">Apellidos</InputLabel>
                        <OutlinedInput
                            id="lastName"
                            placeholder="Apellidos"                            
                            labelWidth={60}
                            required
                        />
                    </FormControl>
                    <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                        <InputLabel htmlFor="email">Correo Electrónico</InputLabel>
                        <OutlinedInput
                            id="email"
                            placeholder="Ingresa correo electrónico"                            
                            labelWidth={60}
                            required
                        />
                    </FormControl>
                    <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                    <InputLabel htmlFor="contactNumber">Número de Contacto</InputLabel>
                        <OutlinedInput
                            id="contactNumber"
                            placeholder="Número de WhatsApp/Celular"                            
                            labelWidth={60}
                            type="number"
                            required
                        />
                    </FormControl>
                    
                   
                {Object.keys(errorMessage).map((keyName, i) => (
                  <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>    
                ))}
                  <GridItem md={12}>
                        <span>Al realizar el pago estas aceptando los <a href="/terms" target="_blank">términos y condiciones</a></span>
                  </GridItem>                 
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" size="lg" type="submit">
                      Realizar Pago
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
          <div className={classes.section} id="howWork">
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>¿Cómo Funciona?</h2>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Custodia de pago"
              description="Realiza el pago en la página actual. El pago no llega a tu vendedor hasta que no recibas el producto a satisfacción. Tu pago esta en custodia."
              icon={Lock}
              iconColor="info"
              vertical
              className={classes.infoWork}
              descriptionStyle={{color:"black"}}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Haz seguimiento a tu pedido"
              description="Una vez el pago sea realizado, el vendedor procede a despachar el pedido. Puedes ver el estado de tu pedido en el enlace que llegará a tu correo"
              icon={TrackChanges}
              iconColor="info"
              vertical
              descriptionStyle={{color:"black"}}
              
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Notifica la recepción de tu pedido a satisfacción"
              description="Al llegar el pedido debes ingresar al enlace que te llega mediante correo y dar clic en el botón recibí a satisfacción."
              icon={EmojiEmotions}
              iconColor="info"
              vertical
              className={classes.infoWork}
              descriptionStyle={{color:"black"}}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}