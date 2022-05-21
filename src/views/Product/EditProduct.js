import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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
import { consumeServiceGet } from 'service/ConsumeService'
import { getQueyParamFromUrl } from 'util/UrlUtil'
import CreateProductStepTwo from './CreateProduct2'
import CreateProductStepOne from "./CreateProduct1";
import IconButton from '@material-ui/core/IconButton';


import styles from "assets/jss/material-kit-react/views/createPayment.js";

import { consumeServicePatch } from '../../service/ConsumeService'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import { CORE_BASEURL } from 'constant/index'

const useStyles = makeStyles(styles);

export default function EditProduct(props) {

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [step, setStep] = React.useState(1);
  const [errorMessage, setErrorMessage] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [productImage, setProductImage] = React.useState(emptyImage);
  const [productPhotos, setproductPhotos] = React.useState([]);
  const [imgs, setImgs] = React.useState([]);
  const [dimensions, setDimensions] = React.useState({
    long: 0,
    width: 0,
    height: 0
  })

  const [editForm, setEditForm] = React.useState({
    amount: "",
    dropshipping: false,
    name: "",
    description: "",
    dropshippingPrice: 0,
    imageUrl: '',

  });

  const backStep = () => {
    setStep(step - 1)
    setErrorMessage({})
  }

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

  const processInformation = () => {
    if (step === 1) {
      processInformationStepOne()
    } else {
      editProduct()
    }
  }

  React.useEffect(() => {
    let url = `${CORE_BASEURL}/product/public/${idp}`
    consumeServiceGet(callBack, callBackGetSucess, url)
  }, []);

  const processInformationStepOne = () => {
    setSuccessMessage("")
    if (editForm.name && editForm.description && productImage) {
      setStep(step + 1)
      setErrorMessage({})
    } else {
      setErrorMessage({ 'Error': 'Falta uno o más campos obligatorios' })
    }
  }

  const editProduct = () => {
    setErrorMessage({})
    setSuccessMessage(null)
    if (isLoading) {
      return
    }
    const callBackSucess = () => {
      setSuccessMessage("Producto editado satisfactoriamente.")
      setIsLoading(false)
    }
    let dropshippingPrice = null

    if (editForm.amount === 0 || (editForm.dropshipping && editForm.dropshippingPrice === 0) || editForm.category === 0 ||
      !editForm.warranty || !editForm.sku || dimensions.long === 0 || dimensions.width === 0
      || dimensions.height === 0 || editForm.weight === 0) {
      setErrorMessage({ 'Error': 'Falta uno o más campos obligatorios' })
      return

    }
    setIsLoading(true)
    let productForm = {
      shortId: idp,
      amount: editForm.amount,
      name: editForm.name,
      dropshipping: editForm.dropshipping,
      description: editForm.description,
      dropshippingPrice: editForm.dropshippingPrice,
      category: editForm.category,
      sku: editForm.sku,
      weight: editForm.weight,
      warranty: editForm.warranty,
      dimensions: [dimensions.long, dimensions.width, dimensions.height]
    }
    const data = new FormData();

    for (const [index, ph] of productPhotos.entries()) {
      if (index > 2) {
        break
      }
      if (index === 0) {
        data.append("image1", ph);
      }
      if (index === 1) {
        data.append("image2", ph);
      }
      if (index === 2) {
        data.append("image3", ph);
      }
    }


    const json = JSON.stringify(productForm);
    const blob = new Blob([json], {
      type: 'application/json'
    });
    data.append("data", blob);

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
    setImgs(response.imageUrl.split(','))
    setDimensions({
      long: response.dimensions[0],
      width: response.dimensions[1],
      height: response.dimensions[0]
    })
  }

  const handleChangeDimensions = (event) => {
    const name = event.target.name;
    setDimensions({
      ...dimensions,
      [name]: event.target.value,
    });
  };

  const handleChangeCheckBox = (event) => {
    const name = event.target.name;
    setEditForm({
      ...editForm,
      [name]: event.target.checked
    });
  };


  const classes = useStyles();
  return (

    <div>
      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form} validated="true" name="editProduct" id="editProduct">
                <CardHeader className={classes.cardHeader}>
                  <h3 style={{ fontWeight: "600" }}><ArrowBackIcon style={{
                    color: "#9c27b0", textDecoration: "none",
                    backgroundColor: "transparent", cursor: "pointer"
                  }} onClick={() => props.history.push('/product')} /> Editar producto</h3>
                </CardHeader>
                <CardBody>
                  {isLoading
                    ? <center> <CircularProgress /></center>
                    : <span></span>
                  }
                  {step === 1 ?
                    <CreateProductStepOne setproductPhotos={setproductPhotos} imgs={imgs} setImgs={setImgs} handleChangeProduct={handleChange} setErrorMessage={setErrorMessage} product={editForm} productImage={editForm.imageUrl} /> :
                    <CreateProductStepTwo isEdit={true} handleChangeDimensions={handleChangeDimensions} dimensions={dimensions} handleChangeCheckBox={handleChangeCheckBox} product={editForm} handleChangeProduct={handleChange} />}

                  {step > 1 ?
                    <IconButton onClick={backStep} color="primary" aria-label="upload picture" component="span">
                      <ArrowBackIcon />
                    </IconButton>
                    : <span></span>}
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
                    {step === 2 ? "Editar Producto" : "Siguiente"}
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