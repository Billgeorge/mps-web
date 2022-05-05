import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

import { connect } from 'react-redux'

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
import { getIdFromUrl, getQueyParamFromUrl } from 'util/UrlUtil'
import InfoArea from "components/InfoArea/InfoArea.js";
import Lock from "@material-ui/icons/Lock";
import TrackChanges from "@material-ui/icons/TrackChanges";
import EmojiEmotions from "@material-ui/icons/EmojiEmotions";

import { consumeServiceGet } from 'service/ConsumeService'
import consumeServicePost from "service/ConsumeService";
import { CORE_BASEURL, PULL_BASEURL } from 'constant/index'

import styles from "assets/jss/material-kit-react/views/createPayment.js";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import consumerService from '../../service/ConsumeService'
import ReactPixel from 'react-facebook-pixel';

import { setFbPixel, setValue } from 'actions/actions'

import { useHistory } from "react-router-dom";


const useStyles = makeStyles(styles);



function AgreePayment(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [errorMessage, setErrorMessage] = React.useState({});
  const [payment, setPayment] = React.useState({});
  const [merchant, setMerchant] = React.useState("");

  const [paymentInformation, setPayInformation] = React.useState({});
  const history = useHistory();

  const callBackSuccessGetPaymentInformation = (paymentInformation) => {
    setPayInformation(paymentInformation)
    document.getElementById("agreeForm").reset();
    setIsLoading(false)
    history.push("/methods?id=" + paymentInformation.id)
  }

  const getExternalPayment = (id) => {
    let idPayment = ""
    if (!id) {
      idPayment = getIdFromUrl().split('#')[0]
    } else {
      idPayment = id
    }
    const url = `${PULL_BASEURL}/cashin/redirect`
    consumeServicePost({ id: idPayment }, callBackPost, callBackSuccessGetPaymentInformation, url)
  }

  const [isLoading, setIsLoading] = React.useState(false);
  const [isCheckout, setIsCheckout] = React.useState(false);

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2
  })

  const callBackSuccessGet = (payment) => {
    setPayment(payment)
    props.setValue(payment.amount)
    let merchantId = ""
    if (getQueyParamFromUrl('idp') != null) {
      merchantId = payment.merchantId
      setIsCheckout(true)
    } else {
      merchantId = payment.idMerchant
    }
    const url = `${CORE_BASEURL}/merchant/public/${merchantId}`
    consumeServiceGet(callBackGet, callBackSuccessGetMerchant, url)
  }
  const callBackSuccessGetMerchant = (merchant) => {
    setMerchant(merchant)

    ReactPixel.init(merchant.fbId);
    ReactPixel.fbq('track', 'InitiateCheckout');
    props.setFbPixel(merchant.fbId);
  }

  const callBackPost = (error) => {
    if (error != null && typeof error === 'object') {
      setErrorMessage(error)
    } else if (error != null && typeof error === 'String') {
      setErrorMessage({ 'Error': error })
    }
    else {
      setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
    }
    setIsLoading(false)
  }
  const callBackGet = () => {
    let errorObjects = { "Error": "Error obteniendo información de pago" }
    setErrorMessage(errorObjects)
    setIsLoading(false)

  }

  React.useEffect(() => {
    changeMessageValidation()
  }
    , []);

  const getPaymentData = () => {
    const idp = getQueyParamFromUrl('idp')
    let url = ""
    if (idp !== null) {
      url = `${CORE_BASEURL}/product/public/${idp}`
    } else {
      const idPayment = getIdFromUrl().split('#')[0]
      url = `${CORE_BASEURL}/payment/public/${idPayment}`
    }
    consumeServiceGet(callBackGet, callBackSuccessGet, url)
  }

  const changeMessageValidation = () => {
    getPaymentData()
    document.agreeForm.onsubmit = function (event) {

      const callBack = (error) => {
        let errorObjects = { "Error": "Error completando pago, por favor contactar a administrador" }
        if (error !== null) {
          errorObjects = error
        }
        setErrorMessage(errorObjects)
        setIsLoading(false)
      }
      event.preventDefault()
      if (isLoading) {
        return
      }
      const callBackSucess = (id) => {
        getExternalPayment(id)
      }
      setIsLoading(true)
      console.log("submitting")
      
      setErrorMessage({})
      const form = event.currentTarget;
      const idp = getQueyParamFromUrl('idp')
      let idPayment = ""
      let url = ""
      let customer = {}
      if (idp !== null) {
        idPayment = idp
        url = CORE_BASEURL + "/product/payment"
        customer = {
          numberId: document.getElementById("id").value,
          name: document.getElementById("name").value,
          address: document.getElementById("address").value,
          neighborhood: document.getElementById("neighborhood").value,
          city: document.getElementById("city").value,
          department: document.getElementById("department").value,
          email: document.getElementById("email").value,
          contactNumber: document.getElementById("contactNumber").value
        }
      } else {
        idPayment = getIdFromUrl().split('#')[0]
        url = CORE_BASEURL + "/payment/agree"
        customer = {
          numberId: document.getElementById("id").value,
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          contactNumber: document.getElementById("contactNumber").value
        }
      }
      consumerService({
        idPayment: idPayment,
        customer: customer
      }, callBack, callBackSucess, url)
    }
    let htmlInputs = document.forms["agreeForm"].getElementsByTagName("input");
    console.log(htmlInputs)
    for (let input of htmlInputs) {
      console.log(input.item)
      input.oninvalid = function (e) {
        e.target.setCustomValidity("Este campo es obligatorio o invalido");
      }
      input.oninput = function (e) {
        e.target.setCustomValidity("");
      };
    }
  }
  return (

    <div>
      <Header
        absolute
        color="transparent"
        brand="EIKOOS"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundColor: "#44169E"
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
                    <h3 style={{ fontWeight: "600", fontSize: "2.5em", fontFamily: 'Dosis, sans-serif' }}>Bienvenido a EIKOOS </h3> <EmojiEmotionsIcon style={{ fontSize: '2.5em', color: "#44169E" }} />
                    <h5 style={{ fontWeight: "600" }}>Con nuestro servicio tu dinero esta a salvo</h5>
                  </CardHeader>
                  <CardBody>
                    {isLoading
                      ? <GridItem xs={12} sm={12} md={12}><center><CircularProgress /></center></GridItem>
                      : <span></span>
                    }
                    <span><b>Somos una contraentrega digítal. El vendedor no recibirá el pago hasta que recibas tu pedido.</b> <a href="#howWork"> ->Ver como funciona</a></span><br />
                    <span>Procede a realizar el pago de tu pedido por el valor de <b>{formatter.format(payment.amount)}</b> del comercio <b>{merchant.name}</b></span>

                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                      <InputLabel htmlFor="id">Cédula</InputLabel>
                      <OutlinedInput
                        id="id"
                        placeholder="Número de cédula"
                        labelWidth={60}
                        type="number"
                        required
                      />
                    </FormControl>
                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                      <InputLabel htmlFor="name">Nombre Completo</InputLabel>
                      <OutlinedInput
                        id="name"
                        placeholder="Nombre y Apellidos"
                        labelWidth={60}
                        required
                      />
                    </FormControl>

                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                      <InputLabel htmlFor="email">Correo Electrónico</InputLabel>
                      <OutlinedInput
                        id="email"
                        placeholder="Ingresa correo electrónico"
                        labelWidth={60}
                        type="email"
                        required
                      />
                    </FormControl>
                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                      <InputLabel htmlFor="contactNumber">Número de Contacto</InputLabel>
                      <OutlinedInput
                        id="contactNumber"
                        placeholder="Número de WhatsApp/Celular"
                        labelWidth={60}
                        type="number"
                        required
                      />
                    </FormControl>

                    {isCheckout ? (
                      <div>
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={6}>
                            <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                              <InputLabel htmlFor="address">Dirección Completa</InputLabel>
                              <OutlinedInput
                                id="address"
                                placeholder="Dirección tan completa como sea posible"
                                labelWidth={100}
                                type="text"
                                required
                              />

                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                              <InputLabel htmlFor="neighborhood">Barrio</InputLabel>
                              <OutlinedInput
                                id="neighborhood"
                                placeholder="Barrio"
                                labelWidth={60}
                                type="text"
                                required
                              />

                            </FormControl>
                          </GridItem>
                          <GridItem xs={6} sm={6} md={6}>
                            <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                              <InputLabel htmlFor="city">Ciudad</InputLabel>
                              <OutlinedInput
                                id="city"
                                placeholder="Ciudad"
                                labelWidth={60}
                                type="text"
                                required
                              />

                            </FormControl>
                          </GridItem>
                          <GridItem xs={6} sm={6} md={6}>
                            <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                              <InputLabel htmlFor="department">Departamento</InputLabel>
                              <OutlinedInput
                                id="department"
                                placeholder="Departamento"
                                labelWidth={60}
                                type="text"
                                required
                              />

                            </FormControl>
                          </GridItem>
                        </GridContainer>
                      </div>
                    ) : <span></span>
                    }


                    {Object.keys(errorMessage).map((keyName, i) => (
                      <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                    ))}
                    <GridItem md={12}>
                      <span>Al realizar el pago estas aceptando los <a href="https://www.eikoos.com/terminos-y-condiciones/" target="_blank">términos y condiciones</a></span>
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
                <a href="#agreeForm">Ir a Pagar</a>
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
                    descriptionStyle={{ color: "black" }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InfoArea
                    title="Haz seguimiento a tu pedido"
                    description="Una vez el pago sea realizado, el vendedor procede a despachar el pedido. Puedes ver el estado de tu pedido en el enlace que llegará a tu correo"
                    icon={TrackChanges}
                    iconColor="info"
                    vertical
                    descriptionStyle={{ color: "black" }}

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
                    descriptionStyle={{ color: "black" }}
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

const mapDispatchToProps = {
  setFbPixel, setValue
}

export default connect(null, mapDispatchToProps)(AgreePayment);