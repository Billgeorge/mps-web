import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { CORE_BASEURL } from '../../constant/index'

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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import consumeServicePost from '../../service/ConsumeService'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { getIdFromUrl } from 'util/UrlUtil'

const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [errorMessage, setErrorMessage] = React.useState({});

  const [isPassWordHidden, setHiddenPassword] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPasswordCreated, setIsPasswordCreated] = React.useState(false);

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  React.useEffect(() => changeMessageValidation(), []);
  const changeMessageValidation = () => {
    document.registerForm.onsubmit = function (event) {
      setIsPasswordCreated(false)
      const callBack = (error) => {
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
      const callBackSucess = () => {
        document.getElementById("registerForm").reset();
        setIsLoading(false)
        setIsPasswordCreated(true)
      }
      event.preventDefault()
      if (document.getElementById("pass").value !== document.getElementById("confirmPass").value) {
        setErrorMessage({ 'Error': 'Las contraseñas deben coincidir.' })
        return
      }
      if (isLoading) {
        return
      }
      setIsLoading(true)
      console.log("creating password")
      setErrorMessage({})

      let id = getIdFromUrl()
      if (id === "" || id === null || id === "password") {
        setErrorMessage({ 'Error': 'No tienes autorización para hacer esto.' })
        return
      }

      consumeServicePost({
        id: id,
        password: document.getElementById("pass").value
      }, callBack, callBackSucess,
        CORE_BASEURL + "/user/password")
    }
    let htmlInputs = document.forms["registerForm"].getElementsByTagName("input");
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
          backgroundColor: "#03a9f4"
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
                    <h4>Crear Contraseña</h4>
                  </CardHeader>
                  <CardBody>
                    {isLoading
                      ? <CircularProgress />
                      : <span></span>
                    }
                    <label style={{ color: 'rgba(0, 0, 0, 0.87)' }}>Hola, Por favor asegurate de que tu contraseña cumpla las siguientes condiciones:</label>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Debe ser mínimo de 8 caracteres."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Debe contener al menos un número."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Debe contener al menos una mayuscula."
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Incluir caracteres especiales como:   #@$!%*?&.,;-_"
                        />
                      </ListItem>
                    </List>
                    <CustomInput

                      labelText="Contraseña"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: isPassWordHidden ? "password" : "text",
                        required: true,
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
                    <CustomInput

                      labelText="Confirmar Contraseña"
                      id="confirmPass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: isPassWordHidden ? "password" : "text",
                        required: true,
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
                    <a onClick={showPassword}>
                      {isPassWordHidden
                        ? <span>Ver contraseña</span>
                        : <span>Ocultar contraseña</span>
                      }</a>

                    {Object.keys(errorMessage).map((keyName, i) => (
                      <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                    ))}
                    {isPasswordCreated
                      ? <Alert severity="success">Contraseña creada, ahora puedes iniciar sesión. </Alert>
                      : <span></span>
                    }
                    <br />

                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" type="submit">
                      Crear Contraseña
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
