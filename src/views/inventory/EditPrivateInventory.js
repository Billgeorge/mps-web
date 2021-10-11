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
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { getQueyParamFromUrl } from 'util/UrlUtil'


import styles from "assets/jss/material-kit-react/views/createPayment.js";

import InputAdornment from '@material-ui/core/InputAdornment';
import { consumeServicePatch } from '../../service/ConsumeService'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import { CORE_BASEURL } from 'constant/index'

const useStyles = makeStyles(styles);

export default function EditPrivateInventory(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [errorMessage, setErrorMessage] = React.useState({});

  const [successMessage, setSuccessMessage] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const [editForm, setEditForm] = React.useState({
    amount: ""
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setEditForm({
      ...editForm,
      [name]: event.target.value,
    });
  };

  const saveAmount = () => {
    if (isLoading) {
      return
    }
    setSuccessMessage(null)
    setErrorMessage({})
    if (!editForm.amount) {
      setErrorMessage({ 'Error': 'Nuevo inventario es obligatorio' })
      return
    }
    if (editForm.amount < 1) {
      setErrorMessage({ 'Error': 'Debes asignar al menos una unidad' })
      return
    }
    let idp = getQueyParamFromUrl('idp')
    setIsLoading(true)

    consumeServicePatch({
      quantity: editForm.amount,
      privateInventoryId: idp
    }, callBack, callBackSuccess, `${CORE_BASEURL}/privateinventory`)

  };


  const callBack = (error) => {
    if (error != null && typeof error === 'object') {
      setErrorMessage(error)
    } else if (error != null) {
      setErrorMessage({ 'Error': error })
    }
    else {
      setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
    }
    setIsLoading(false)
  }

  const callBackSuccess = (error) => {
    editForm.amount = ""
    setSuccessMessage("Inventario privado editado correctamente")
    setIsLoading(false)
  }


  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  return (

    <div>
      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form} validated="true">
                <CardHeader className={classes.cardHeader}>
                  <h3 style={{ fontWeight: "600" }}><ArrowBackIcon style={{
                    color: "#9c27b0", textDecoration: "none",
                    backgroundColor: "transparent", cursor: "pointer"
                  }} onClick={() => props.history.push('/private-inventory')} /> Editar inventario privado</h3>
                </CardHeader>
                <CardBody>
                  <p style={{ fontWeight: "600", fontSize: "1.2em", fontFamily: 'Dosis, sans-serif' }}>
                    Coloca a continuación la cantidad de unidades que deseas asignar a este inventario privado. Ten en cuenta este valor afecta el total de inventario que pusiste al crear el producto.
                  </p>
                  {isLoading
                    ? <center> <CircularProgress /></center>
                    : <span></span>
                  }
                  <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="amount">Número Unidades Inventario</InputLabel>
                    <OutlinedInput
                      id="amount"
                      name="amount"
                      labelWidth={60}
                      required
                      type="number"
                      value={editForm.amount || ""}
                      onChange={handleChange}
                    />
                  </FormControl>


                  {Object.keys(errorMessage).map((keyName, i) => (
                    <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                  ))}
                  {successMessage
                    ? <Alert severity="success">{successMessage}</Alert>
                    : <span></span>
                  }

                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button onClick={() => { saveAmount() }} color="primary" size="lg" >
                    Editar Inventario
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