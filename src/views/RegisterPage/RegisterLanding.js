import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Storefront from "@material-ui/icons/Storefront";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import {CORE_BASEURL} from '../../constant/index'

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
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import { Smartphone} from "@material-ui/icons";
import consumeServicePost from '../../service/ConsumeService'

const useStyles = makeStyles(styles);

export default function RegisterLanding(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");  

  const [errorMessage, setErrorMessage] = React.useState({});
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMerchantCreated, setIsMerchantCreated] = React.useState(false);    

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  React.useEffect(() => changeMessageValidation(), []);
  const changeMessageValidation = () =>{
    document.registerForm.onsubmit = function(event){
      setIsMerchantCreated(false)
      const callBack = (error) => {
        let errorObjects = {"Error":"Error creando Merchant por favor contactar el administrador"}
        if(error !== null){
          errorObjects = error
        }
        setErrorMessage(errorObjects)
        setIsLoading(false)
      }
      const callBackSucess = () =>{
        document.getElementById("registerForm").reset();
        setIsLoading(false)
        setIsMerchantCreated(true)
      }
      setIsLoading(true)
      console.log("creating merchant")
      event.preventDefault()
      setErrorMessage({})
      const form = event.currentTarget;      
      consumeServicePost({    
        name: document.getElementById("merchantName").value,
        email:document.getElementById("email").value,
        contactNumber: document.getElementById("contactNumber").value        
      },callBack,callBackSucess,
      CORE_BASEURL+"/merchant/landing")
    }
    let htmlInputs = document.forms["registerForm"].getElementsByTagName("input");
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
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} validated="true" name="registerForm" id="registerForm">
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Registro</h4>                    
                  </CardHeader>                  
                  <CardBody>
                  {isLoading
                                ? <CircularProgress/>
                                : <span></span>
                  }
                    <CustomInput                    
                      labelText="Nombre Comercio..."
                      id="merchantName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Storefront className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Correo Electrónico..."
                      id="email"                      
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        required: true,                        
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Número Celular..."
                      id="contactNumber"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "number",
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Smartphone className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />                    
                   
                {Object.keys(errorMessage).map((keyName, i) => (
                  <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>    
                ))}
                {isMerchantCreated
                                ? <Alert severity="success">¡Bienvenido a MiPagoSeguro!, Revisa tu correo y crea tu contraseña lo antes posible. </Alert>    
                                : <span></span>
                                }
                 <br/>
                 <GridItem md={12}>
                      <span>Al registrarte estas aceptando los <a href="/terms" target="_blank">términos y condiciones</a></span>
                    </GridItem> 
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Registrarse
                    </Button>                                      
                  </CardFooter>                  
                </form>
              </Card>
            </GridItem>            
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}