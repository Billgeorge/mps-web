import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styles from "assets/jss/material-kit-react/views/createPayment.js";

import { consumeServiceGet } from 'service/ConsumeService'
import consumeServicePost from 'service/ConsumeService'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import { CORE_BASEURL } from 'constant/index'

const useStyles = makeStyles(styles);

export default function CreateProduct() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [errorMessage, setErrorMessage] = React.useState({});
  const [states, SetStates] = React.useState([]);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [citiesResponse, SetCitiesResponse] = React.useState([]);
  const [cities, SetCities] = React.useState([]);
  const [city, SetCity] = React.useState({
    department: "",
    code: "",
  })
  const [daneCode, SetDaneCode] = React.useState({
    id: ''
  })

  const handleChangeState = (event) => {
    let value = event.target.value
    let newCities = citiesResponse.filter(record => record.state == value)
    SetCities(newCities)
    SetCity({
      department: value,
      code: "",
    })
    setErrorMessage("")


  }
  const callBackGetDaneSucess = (response) => {
    SetDaneCode(response)
  }
  const handleChange = (event) => {
    setErrorMessage("")
    let value = event.target.value
    SetCity({
      ...city,
      code: value,
    })
    let url = `${CORE_BASEURL}/dane/town/${value}`
    consumeServiceGet(callBack, callBackGetDaneSucess, url)

  };

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


  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const callBackErrorGetCities = () => {
    setErrorMessage("Error obteniendo ciudades")
  }
  const callBackSuccessGetCities = (cities) => {
    SetCities(cities)
    SetCitiesResponse(cities)
    let states = []
    cities.forEach(record => {
      {
        let actualState = record.state
        let exist = false
        states.forEach(state => {
          if (state == actualState) {
            exist = true
          }
        })
        if (!exist) {
          states.push(actualState)
        }
      }
    })
    SetStates(states)
  }

  const classes = useStyles();
  const getCities = () => {
    const url = `${CORE_BASEURL}/logistic/cities`
    consumeServiceGet(callBackErrorGetCities, callBackSuccessGetCities, url)
  }
  const changeMessageValidation = () => {
    getCities()
    document.createBranch.onsubmit = function (event) {
      setErrorMessage({})
      event.preventDefault()
      const callBackSucess = (response) => {
        setSuccessMessage("Sucursal creada satisfactoriamente.")
        setIsLoading(false)
      }
      let branch_data = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        daneCodeId: document.getElementById('daneCode').value
      }
      let contact_data = {
        name: document.getElementById('contactName').value,
        identification: document.getElementById('identification').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
      }

      let createRequest = {
        branch: branch_data,
        contact: contact_data
      }
      consumeServicePost(createRequest, callBack, callBackSucess, `${CORE_BASEURL}/branch`)

    }
  }

  React.useEffect(() => { changeMessageValidation() }, []);


  return (

    <div>
      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form} validated="true" name="createBranch" id="createBranch">
                <CardHeader className={classes.cardHeader}>
                  <h3 style={{ fontWeight: "600" }}><a href="/product"><ArrowBackIcon /></a> Crear Sucursal nueva</h3>
                </CardHeader>
                <CardBody>
                  {isLoading
                    ? <center> <CircularProgress /></center>
                    : <span></span>
                  }

                  <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="name">Nombre de la sucursal</InputLabel>
                    <OutlinedInput
                      id="name"
                      placeholder="Nombre sucursal"
                      labelWidth={60}
                      required
                    />

                  </FormControl>

                  <FormControl style={{ width: "50%", backgroundColor: "white" }} variant="outlined" className={classes.form}>
                    <InputLabel htmlFor="outlined-age-native-simple">Departamento</InputLabel>
                    <Select
                      native
                      value={city.department}
                      onChange={handleChangeState}
                      label="Departamento"
                      inputProps={{
                        name: 'state',
                        id: 'outlined-age-native-simple',
                      }}

                    >

                      <option aria-label="None" value="" />
                      {
                        states.map(function (state) {
                          return <option value={state}>{state}</option>;
                        })
                      }
                    </Select>
                  </FormControl>

                  <FormControl style={{ width: "48%", backgroundColor: "white" }} variant="outlined" className={classes.form}>
                    <InputLabel htmlFor="outlined-age-native-simple">Ciudad</InputLabel>
                    <Select
                      native
                      value={city.code}
                      onChange={handleChange}
                      label="Ciudad"
                      inputProps={{
                        name: 'city',
                        id: 'outlined-age-native-simple',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {
                        cities.map(function (item) {
                          return <option value={item.code}>{item.city}</option>;
                        })
                      }
                    </Select>
                  </FormControl>
                  <FormControl>
                    <input id='daneCode' type="hidden" value={daneCode.id} />                  
                  </FormControl>
                  <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <TextField
                      id="address"
                      label="Dirección"
                      multiline
                      rows={2}
                      placeholder="Dirección"
                      variant="outlined"
                      inputProps={{ maxLength: 1000 }}
                      required
                    />
                  </FormControl>



                  {Object.keys(errorMessage).map((keyName, i) => (
                    <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                  ))}
                  {successMessage
                    ? <Alert severity="success">{successMessage}</Alert>
                    : <span></span>
                  }
                  <br />

                  <CardHeader className={classes.cardHeader}>
                    <h4 style={{ fontWeight: "600" }}> Información de Contacto</h4>
                  </CardHeader>
                  <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="contactName">Nombre Encargado</InputLabel>
                    <OutlinedInput
                      id="contactName"
                      placeholder="Nombre"
                      labelWidth={60}
                      required
                    />
                  </FormControl>
                  <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="identification">Identificación</InputLabel>
                    <OutlinedInput
                      id="identification"
                      placeholder="Número de identificación"
                      labelWidth={60}
                      required
                    />
                  </FormControl>
                  <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="phone">Teléfono</InputLabel>
                    <OutlinedInput
                      id="phone"
                      placeholder="Número de Contacto"
                      labelWidth={60}
                      required
                    />
                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                      <InputLabel htmlFor="email">Correo Electrónico</InputLabel>
                      <OutlinedInput
                        id="email"
                        placeholder="Correo"
                        labelWidth={60}
                        required
                      />
                    </FormControl>
                  </FormControl>
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button color="primary" size="lg" type="submit">
                    Crear Sucursal
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div>

  );
}
