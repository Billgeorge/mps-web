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
import AddIcon from '@material-ui/icons/AddAPhoto'
import IconButton from '@material-ui/core/IconButton';
import emptyImage from "assets/img/new_product.png"
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
import { consumeServiceGet } from 'service/ConsumeService'
import { getQueyParamFromUrl } from 'util/UrlUtil'


import styles from "assets/jss/material-kit-react/views/createPayment.js";

import InputAdornment from '@material-ui/core/InputAdornment';
import { consumeServicePatch } from '../../service/ConsumeService'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import { CORE_BASEURL } from 'constant/index'

const useStyles = makeStyles(styles);

export default function EditProduct(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  const [errorMessage, setErrorMessage] = React.useState({});

  const [successMessage, setSuccessMessage] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);
  const [productImage, setProductImage] = React.useState('');

  const [editForm, setEditForm] = React.useState({
    amount: "",
    dropshipping: false,    
    name: "",
    description: "",
    dropshippingPrice: 0,
    imageUrl: ''
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setEditForm({
      ...editForm,
      [name]: event.target.value,
    });
  };

  let idp = getQueyParamFromUrl('idp')
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const fileSelected = (event) => {
    setErrorMessage({})
    let file = event.target.files[0]
    if (file && file.size > 1048576) {
      setErrorMessage({ 'Error': 'Tu imagén es muy pesada. No debe superar 1Mb' })
      return
    }
    rederImage(file)
    setProductImage(file)
  };

  const rederImage = (file) => {
    var fr = new FileReader();
    fr.onload = function () {
      document.getElementById("productImage").src = fr.result;
    }
    fr.readAsDataURL(file);
  }
  const processInformation = () => {
    setErrorMessage({})    
    setSuccessMessage(null)
    const callBackSucess = () => {
      setSuccessMessage("Producto editado satisfactoriamente.")
      setIsLoading(false)
    }    
    let dropshippingPrice = null
    
    if (document.getElementById('dropshipping').value === "true" && document.getElementById("dropshippingPrice").value < 1) {
      setErrorMessage({ 'Error': 'Para un producto dropshipping es obligatorio el precio a distribuidor' })
      return
    }
    if (document.getElementById('dropshipping').value === "true") {
      dropshippingPrice = document.getElementById('dropshippingPrice').value
    }
    setIsLoading(true)
    let productForm = {
      amount: document.getElementById('valor').value,      
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      dropshipping: document.getElementById('dropshipping').value,
      dropshippingPrice: dropshippingPrice,
      shortId: idp
    }
    const data = new FormData();    
    const json = JSON.stringify(productForm);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    data.append("data", blob);      
    data.append("image", productImage);
    consumeServicePatch(data, callBack, callBackSucess, `${CORE_BASEURL}/product`)

  }
  const callBack = (error) => {
    if (error != null) {
      setErrorMessage(error)
    } else {
      setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
    }
    setIsLoading(false)
  }
  const callBackGetSucess = (response) => {
    setIsLoading(false)
    setEditForm(response)
  }
  
  
  const classes = useStyles();
  React.useEffect(() => {
    changeMessageValidation()
  }, []);
  const changeMessageValidation = () => {    
    let url = `${CORE_BASEURL}/product/public/${idp}`
    consumeServiceGet(callBack, callBackGetSucess, url)   
    const loadMessagesInput = () => {
      let htmlInputs = document.forms["editProduct"].getElementsByTagName("input");
      let htmlTextArea = document.forms["editProduct"].getElementsByTagName("textarea");
      console.log(htmlInputs)

      for (let input of htmlTextArea) {
        console.log(input.item)
        input.oninvalid = function (e) {
          e.target.setCustomValidity("Este campo es obligatorio o invalido");
        }
      }
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
    loadMessagesInput()
  }
  return (

    <div>
      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form} validated="true" name="editProduct" id="editProduct">
                <CardHeader className={classes.cardHeader}>
                  <h3 style={{ fontWeight: "600" }}><a href="/product"><ArrowBackIcon /></a> Editar producto</h3>
                </CardHeader>
                <CardBody>
                  {isLoading
                    ? <center> <CircularProgress /></center>
                    : <span></span>
                  }
                  <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="name">Nombre del producto</InputLabel>
                    <OutlinedInput
                      id="name"
                      name="name"
                      placeholder="Nombre producto"
                      labelWidth={60}
                      value={editForm.name || ""}
                      onChange={handleChange}
                    />

                  </FormControl>
                  <FormControl>
                  <GridItem xs={12} sm={12} md={12}>
                    <img type="file" src={editForm.imageUrl || emptyImage} name="productImage" id="productImage" className={classes.imgProduct} />
                    <input onChange={fileSelected} accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" />
                    <label className={classes.addImg} htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <AddIcon />
                      </IconButton>
                    </label>
                  </GridItem>                  
                   
                  </FormControl>
                  <FormControl style={{ width: "100%", paddingBottom: "10px",paddingTop: "20px" }}>
                    <TextField
                      id="description"
                      name="description"
                      label="Descripción"
                      multiline
                      rows={4}
                      placeholder="Características, beneficios y demás del producto"
                      variant="outlined"
                      inputProps={{ maxLength: 1000 }}
                      value={editForm.description || ""}
                      onChange={handleChange}
                      required
                    />
                  </FormControl>                  
                  <FormControl variant="outlined" style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="dropshipping">¿Disponible para que otros lo vendan?</InputLabel>
                    <Select
                      native
                      value={editForm.dropshipping || false}
                      onChange={handleChange}
                      inputProps={{
                        name: 'dropshipping',
                        id: 'dropshipping'
                      }}
                    >
                      <option value={"true"}>Si</option>
                      <option value={"false"}>No</option>
                    </Select>
                  </FormControl>
                  {editForm.dropshipping === "true" || editForm.dropshipping === true
                    ? <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                      <InputLabel htmlFor="valor">Precio a distribuidor</InputLabel>
                      <OutlinedInput
                        id="dropshippingPrice"
                        name="dropshippingPrice"
                        placeholder="Precio para vendedor dropshipping"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        labelWidth={60}
                        type="number"
                        value={editForm.dropshippingPrice || ""}
                        onChange={handleChange}
                      />
                    </FormControl>
                    : <span></span>
                  }
                  <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="valor">Precio a consumidor</InputLabel>
                    <OutlinedInput
                      id="valor"
                      name="amount"
                      placeholder="Recuerda tener en cuenta nuestra comisión"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
                  <Button color="primary" size="lg" onClick={processInformation}>
                    Editar Producto
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <Footer />
    </div >

  );
}