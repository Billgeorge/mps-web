import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// core components
import Header from "components/Header/Header.js";
import HeaderLinksSession from "components/Header/HeaderLinksSession.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {getMerchantId} from 'service/AuthenticationService'

import styles from "assets/jss/material-kit-react/views/createPayment.js";

import InputAdornment from '@material-ui/core/InputAdornment';
import consumeServicePost from '../../service/ConsumeService'

import {CORE_BASEURL} from 'constant/index'

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");  

  const [errorMessage, setErrorMessage] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);
  
  const [url, setUrl] = React.useState("");    

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;


  const copyUrl = event => {
    navigator.clipboard.writeText(url);
  }

  React.useEffect(() => changeMessageValidation(), []);
  const changeMessageValidation = () =>{
    document.createPayment.onsubmit = function(event){      
      const callBack = (error) => {
        setErrorMessage(error)
        setIsLoading(false)
      }
      const callBackSucess = (response) =>{
        var getUrl = window.location;
        var baseUrl = getUrl .protocol + "//" + getUrl.host + "/";
        setUrl(baseUrl+"agree-payment/"+response.id)
        document.getElementById("createPayment").reset();
        setIsLoading(false)        
      }
      setIsLoading(true)
      console.log("submitting")
      event.preventDefault()
      setErrorMessage({})
      const form = event.currentTarget;      
      consumeServicePost({    
        amount: document.getElementById("valor").value,
        idMerchant: getMerchantId()
      },callBack,callBackSucess,`${CORE_BASEURL}/payment`)
    }
    let htmlInputs = document.forms["createPayment"].getElementsByTagName("input");
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
        rightLinks={<HeaderLinksSession />}
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
                  { url == "" 
                   ?<form className={classes.form} validated="true" name="createPayment" id="createPayment">
                        <CardHeader className={classes.cardHeader}>
                            <h3 style={{fontWeight:"600"}}><a href="/dashboard"><ArrowBackIcon /></a> Crear enlace de pago</h3>
                        </CardHeader>                 
                        <CardBody>
                        {isLoading
                                    ? <CircularProgress/>
                                    : <span></span>
                        }
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                        <InputLabel htmlFor="description">Descripción</InputLabel>
                            <OutlinedInput
                                id="descriptioon"
                                placeholder="Describe el producto/servicio"                            
                                labelWidth={60}
                                required
                            />
                        </FormControl>
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                            <InputLabel htmlFor="valor">Valor</InputLabel>
                            <OutlinedInput
                                id="valor"
                                placeholder="Recuerda tener en cuenta nuestra comisión"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={60}
                                required
                                type="number"
                            />
                        </FormControl>
                        
                      
                    {Object.keys(errorMessage).map((keyName, i) => (
                      <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>    
                    ))}
                    
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button color="primary" size="lg" type="submit">
                          Crear Enlace
                        </Button>
                      </CardFooter>
                    </form>
                  : <div><CardHeader className={classes.cardHeader}>
                      <h3 style={{fontWeight:"600"}}><a href="/dashboard"><ArrowBackIcon /></a> Enlace creado</h3>
                    </CardHeader> 
                    <CardBody> <label id="finalLink">{url}</label>
                      </CardBody>
                      <CardFooter className={classes.cardFooter}> <Button onClick={copyUrl} color="primary">Copiar Enlace</Button></CardFooter></div>
                  }
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}