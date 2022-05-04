import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { getQueyParamFromUrl } from 'util/UrlUtil'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import { CORE_BASEURL, PULL_BASEURL } from '../../constant/index'
import FormControl from "@material-ui/core/FormControl";


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
import { consumeServiceGet } from 'service/ConsumeService'
import { useHistory } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import { Smartphone, Home, AlternateEmail, Person } from "@material-ui/icons";
import consumeServicePost from '../../service/ConsumeService'
import image from "assets/img/bg.jpg";

const useStyles = makeStyles(styles);

export default function RegisterLanding(props) {
  const history = useHistory();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [errorMessage, setErrorMessage] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);
  const [isMerchantCreated, setIsMerchantCreated] = React.useState(false);

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const [cities, SetCities] = React.useState([]);
  const [city, setCity] = React.useState({
    department: "",
    code: "",
  })
  const [citiesResponse, SetCitiesResponse] = React.useState([]);
  const [states, SetStates] = React.useState([]);

  const handleChangeState = (event) => {
    let value = event.target.value
    let newCities = citiesResponse.filter(record => record.state.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == value)
    SetCities(newCities)
    setCity({
      department: value,
      code: "",
    })
    setErrorMessage({})
  }

  const handleChange = (event) => {
    setErrorMessage({})
    let value = event.target.value
    setCity({
      ...city,
      code: value,
    })
  };

  const getCities = () => {
    const url = `${CORE_BASEURL}/logistic/cities`
    consumeServiceGet(callBackErrorGetCities, callBackSuccessGetCities, url)
  }

  const callBackErrorGetCities = () => {
    setErrorMessage({ 'Error': "Error obteniendo ciudades" })
  }

  const callBackSuccessGetCities = (cities) => {
    SetCities(cities)
    SetCitiesResponse(cities)
    let states = new Set()
    cities.forEach(record => {
      {
        let actualState = record.state.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        let exist = false
        states.forEach(state => {
          if (state == actualState) {
            exist = true
          }
        })
        if (!exist) {
          states.add(actualState)
        }
      }
    })
    SetStates(Array.from(states))
  }

  React.useEffect(() => changeMessageValidation(), []);
  const changeMessageValidation = () => {
    getCities()
    document.registerForm.onsubmit = function (event) {
      event.preventDefault()
      if (!document.getElementById("department").value || !document.getElementById("city").value) {
        setErrorMessage({ 'Error': 'Debe seleccionar ciudad y departamento' })
        return
      }
      setIsMerchantCreated(false)
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
      const callBackSucess = (response) => {
        document.getElementById("registerForm").reset();
        setIsLoading(false)
        setIsMerchantCreated(true)
        document.getElementById("department").value = ""
        document.getElementById("city").value = ""
        setCity({})
        if (getQueyParamFromUrl("rol") === "seller") {
          const url = `${PULL_BASEURL}/cashin/redirect`
          consumeServicePost({ id: response }, callBack, callbackSuccessMerchantCreation, url)
        }
      }

      const callbackSuccessMerchantCreation = (paymentInformation) => {
        history.push("/methods?id=" + paymentInformation.id)
      }
      if (isLoading) {
        return
      }
      setIsLoading(true)
      console.log("creating merchant")
      setErrorMessage({})
      const form = event.currentTarget;
      const role = getQueyParamFromUrl("rol")
      consumeServicePost({
        name: document.getElementById("merchantName").value,
        email: document.getElementById("email").value,
        role: role,
        contactNumber: document.getElementById("contactNumber").value,
        referer_email: document.getElementById("emailFriend").value ? document.getElementById("emailFriend").value : null,
        city: document.getElementById("city").value,
        department: document.getElementById("department").value,
        address: document.getElementById("address").value
      }, callBack, callBackSucess,
        CORE_BASEURL + "/merchant/landing")
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
                <form className={classes.form} validated="true" name="registerForm" id="registerForm">
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Registro</h4>
                  </CardHeader>
                  <CardBody>
                    {isLoading
                      ? <CircularProgress />
                      : <span></span>
                    }
                    <CustomInput
                      labelText="Tu nombre completo..."
                      id="merchantName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Tu Correo Electrónico..."
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
                    <FormControl style={{ paddingTop: "30px", width: "100%", backgroundColor: "white" }} variant="outlined" className={classes.form}>
                      <InputLabel htmlFor="separtment">Departamento</InputLabel>
                      <Select
                        native
                        value={city.department}
                        onChange={handleChangeState}
                        label="Departamento"
                        inputProps={{
                          name: 'state',
                          id: 'department',
                        }}
                      >
                        <option aria-label="None" value="" />
                        {
                          states.sort(
                            function (a, b) {
                              if (a < b) {
                                return -1;
                              }
                              if (b < a) {
                                return 1;
                              }
                              return 0;
                            }
                          ).map(function (state) {
                            return <option value={state}>{state.replace(/^./, (str) => {
                              return str.toUpperCase();
                            })}</option>;
                          })
                        }
                      </Select>
                    </FormControl>

                    <FormControl style={{ paddingTop: "30px", width: "100%", backgroundColor: "white" }} variant="outlined" className={classes.form}>
                      <InputLabel htmlFor="city">Ciudad</InputLabel>
                      <Select
                        native
                        value={city.code}
                        onChange={handleChange}
                        label="Ciudad"
                        inputProps={{
                          name: 'city',
                          id: 'city',
                        }}
                      >
                        <option aria-label="None" value="" />
                        {
                          cities.sort(
                            function (a, b) {
                              if (a.city < b.city) {
                                return -1;
                              }
                              if (b.city < a.city) {
                                return 1;
                              }
                              return 0;
                            }
                          ).map(function (item) {
                            return <option value={item.code}>{item.city.toLowerCase().replace(/^./, (str) => {
                              return str.toUpperCase();
                            })}</option>;
                          })
                        }
                      </Select>
                    </FormControl>

                    <CustomInput
                      labelText="Tu dirección..."
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        required: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Home className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />

                    <CustomInput
                      labelText="Correo de quien te refiere..."
                      id="emailFriend"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <AlternateEmail className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />

                    {Object.keys(errorMessage).map((keyName, i) => (
                      <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                    ))}
                    {isMerchantCreated
                      ? <Alert severity="success">¡Bienvenido a EIKOOS!, Revisa tu correo y crea tu contraseña lo antes posible. </Alert>
                      : <span></span>
                    }
                    <br />
                    <GridItem md={12}>
                      <span>Al registrarte estas aceptando los <a href="https://www.eikoos.com/terminos-y-condiciones/" target="_blank">términos y condiciones</a></span>
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
