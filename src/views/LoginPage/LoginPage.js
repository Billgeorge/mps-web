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
import { Link } from 'react-router-dom';

import { login, getRole } from '../../service/AuthenticationService'
import Alert from '@material-ui/lab/Alert';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const [errorMessage, setErrorMessage] = React.useState("");
  const [paymentUrl, setPaymentUrl] = React.useState("");

  const history = useHistory();

  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => changeMessageValidation(), []);
  const changeMessageValidation = () => {
    document.loginForm.onsubmit = function (event) {
      console.log("signing in")
      event.preventDefault()
      if (isLoading) {
        return
      }
      setErrorMessage("")
      const callBackSucess = () => {
        let role = getRole()
        if (role === "seller" || role === "seller-last") {
          history.push("/orders-seller")
          return
        }
        history.push("/dashboard-dropprovider")
      }
      const callBackError = (message) => {
        if (typeof message === "string") {
          const split  = message.split("https")
          if(split.length>1){
            setErrorMessage(split[0])
            setPaymentUrl(`https${split[1]}`)
          }else{
            setErrorMessage(message)
          }
        } else {
          setErrorMessage(message)
        }
        setIsLoading(false);
      }
      const form = event.currentTarget;
      setIsLoading(true);
      login({
        username: document.getElementById("email").value,
        password: document.getElementById("pass").value
      }, callBackSucess, callBackError)
    }
    let htmlInputs = document.forms["loginForm"].getElementsByTagName("input");
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
  const showPassword = event => {
    event.preventDefault()
    setHiddenPassword(!isPassWordHidden)
  }
  const [isPassWordHidden, setHiddenPassword] = React.useState(true);
  const { ...rest } = props;
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
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form} validated="true" name="loginForm" id="loginForm">
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Inicio Sesión</h4>
                  </CardHeader>
                  <CardBody>
                    {isLoading
                      ? <CircularProgress />
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
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                        required: true
                      }}
                      inputProps={{
                        type: isPassWordHidden ? "password" : "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <a onClick={showPassword} style={{ cursor: 'pointer' }}>
                      {isPassWordHidden
                        ? <span>Ver contraseña</span>
                        : <span>Ocultar contraseña</span>
                      }</a>
                    {errorMessage != ""
                      ?
                      <Alert severity="error">{errorMessage}</Alert>
                      : <span>	&nbsp;</span>
                    }{paymentUrl ?
                      <a href={paymentUrl}>
                        <Button color="success">
                          Pagar membresía
                        </Button>
                      </a>
                      : <></>
                    }
                    <br /><br />
                    <span>¿Olvidaste tu contraseña? <a href="/recovery-pass" style={{ cursor: 'pointer' }}>Recupera tu contraseña</a></span>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Iniciar Sesión
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
