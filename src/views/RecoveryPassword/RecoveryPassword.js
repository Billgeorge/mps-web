import React from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
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
import CircularProgress from '@material-ui/core/CircularProgress';

import {CORE_BASEURL} from '../../constant/index'

import Alert from '@material-ui/lab/Alert';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import consumeServicePost from 'service/ConsumeService'

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const [errorMessage, setErrorMessage] = React.useState("");
  const [isRequestSuccess, setIsRequestSuccess] = React.useState(false);

  const history = useHistory();

  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => changeMessageValidation(), []);
  const changeMessageValidation = () =>{
    document.recoveryForm.onsubmit = function(event){
      console.log("recovering pass")
      event.preventDefault()
      setIsRequestSuccess(false);
      setErrorMessage("")
      const callBackSucess = () =>{
        setIsLoading(false);
        setIsRequestSuccess(true);
      }
      const callBackError = (message) =>{
        setErrorMessage("Ha ocurrido un error, por favor contacte al administrador")
        setIsLoading(false);
      }
      const form = event.currentTarget;
      setIsLoading(true);      
      consumeServicePost(    
        document.getElementById("email").value,callBackError,
        callBackSucess,CORE_BASEURL+"/user/recovery-password")      
    }
    let htmlInputs = document.forms["recoveryForm"].getElementsByTagName("input");
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
 
  const { ...rest } = props;
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
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} validated="true" name="recoveryForm" id="recoveryForm">
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Recuperar Contraseña</h4>                    
                  </CardHeader>                  
                  <CardBody>
                  <span>Por favor ingresa tu correo electrónico:</span>
                  {isLoading
                                ? <CircularProgress/>
                                : <span></span>
                  }                    
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
                  {errorMessage != ""
                  ?
                  <Alert severity="error">{errorMessage}</Alert>
                  : <span>	&nbsp;</span>   
                              }
                  {isRequestSuccess
                                ? <Alert severity="success">Hemos enviado un correo para que crees una nueva contraseña. 
                                Por favor asegurate de revisar la carpeta de no deseados o spam, en caso de no verlo en la bandeja de entrada.</Alert>    
                                : <span></span>
                                }                 
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type = "submit" simple color="primary" size="lg">
                      RECUPERAR CONTRASEÑA
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
