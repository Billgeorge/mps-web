import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/productDetail.js";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardHeader from "components/Card/CardHeader.js";
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js";
import Footer from "components/Footer/Footer.js";
import Alert from '@material-ui/lab/Alert';

import { consumeServiceGet } from 'service/ConsumeService'
import { getQueyParamFromUrl } from 'util/UrlUtil'

import { CORE_BASEURL } from 'constant/index'
import consumeServicePost from "service/ConsumeService";




const useStyles = makeStyles(styles);
export default function ProductDetail(props) {
    const [successMessage, setSuccessMessage] = React.useState(null);

    const [errorMessage, setErrorMessage] = React.useState({});

    const [product, setProduct] = React.useState({
        id: "",
        name: "",
        description: "",
        inventory: "",
        merchantId: "",
        amount: "",
        dropshippingPrice: 0,
        imageUrl: ""

    })
    const [merchant, setMerchant] = React.useState({
        name: "",
        contactNumber: ""
    })
    React.useEffect(() => {
        changeMessageValidation()
    }, []);
    const changeMessageValidation = () => {
        const callBack = (error) => {
            if (error != null) {
                setErrorMessage(error)
            } else {
                setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
            }

        }
        const callBackGetProductSucess = (response) => {
            setProduct(response)
        }

        let idp = getQueyParamFromUrl('idp')
        let url = `${CORE_BASEURL}/product/public/${idp}`
        consumeServiceGet(callBack, callBackGetProductSucess, url)


    }

    const addDropShipping = () => {
        setErrorMessage({})
        setSuccessMessage(null)
        const callBackSucess = () => {
            setSuccessMessage("Producto vinculado satisfactoriamente.")
        }
        consumeServicePost({
            productId: product.id
        }, callBackErrorAddingDrop, callBackSucess, `${CORE_BASEURL}/dropshippingsale`)
    }

    const callBackErrorAddingDrop = (error) => {
        if (error != null && typeof error === 'object') {
            setErrorMessage(error)
        } else if (error != null) {
            setErrorMessage({ 'Error': error })
        }
        else {
            setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
        }        
    }

    const classes = useStyles();

    return (
        <div>
            <ResponsiveDrawe />
            <GridContainer className={classes.container} >
                <GridItem className={classes.sideSection} xs={12} sm={12} md={6}>
                    <CardHeader className={classes.cardHeader}>
                        <h3 style={{ fontWeight: "600" }}><ArrowBackIcon style={{
                            color: "#9c27b0", textDecoration: "none",
                            backgroundColor: "transparent", cursor: "pointer"
                        }} onClick={() => props.history.goBack()} /> Detalle de producto </h3>
                    </CardHeader>
                    <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                        <h3 className={classes.shopName}
                            id="nameProduct"
                            name="name"
                            value={product.name || ""}
                        />
                        <div className={classes.totalPrice} > <span> $ {product.amount || ""} </span> </div><br />
                        <img src={product.imageUrl} className={classes.imgProduct} />
                    </GridItem>
                    {product.variants && product.variants.length > 0 ?
                        <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                            <GridContainer>
                                <GridItem xs={6} sm={6} md={6} className={classes.gridItemCard} >
                                    <div style={{ textAlign: 'center' }} className={classes.productDescription}> Atributos </div>
                                </GridItem>
                                <GridItem xs={6} sm={6} md={6} className={classes.gridItemCard} >
                                    <div style={{ textAlign: 'center' }} className={classes.productDescription}> Inventario </div>
                                </GridItem>
                                {
                                    product.variants.map(function (product) {
                                        return <>
                                            <GridItem xs={6} sm={6} md={6} className={classes.gridItemCard} >
                                                <div className={classes.productDescription}> {product.attributes.replace('{', '').replace('}', '')} </div>
                                            </GridItem>
                                            <GridItem xs={6} sm={6} md={6} className={classes.gridItemCard} >
                                                <div style={{ textAlign: 'center' }} className={classes.productDescription}> {product.inventory} </div>
                                            </GridItem>
                                        </>
                                    })
                                }
                            </GridContainer>
                        </GridItem> : <></>}
                </GridItem>
                <GridItem xs={12} sm={12} md={6} className={classes.rightSide}>

                    <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                        <h4 className={classes.productDescription} style={{ fontSize: "25px" }}> Nombre del Producto: </h4>
                        <div className={classes.productDescription}> {product.name || ""} </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                        <h4 className={classes.productDescription} style={{ fontSize: "25px" }}> Precio Distribuidor: </h4>
                        <div className={classes.productDescription}> ${product.dropshippingPrice} </div>
                    </GridItem>                    
                    <GridItem justify="center" xs={12} sm={12} md={12} className={classes.gridItemCard}>
                        <h4 className={classes.productDescription} style={{ fontSize: "25px" }}> Cantidad Disponible: </h4>
                        <div className={classes.productDescription}> {product.inventory || 0} </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                        <h4 className={classes.productDescription} style={{ fontSize: "25px" }}> Descripción: </h4>
                        <div className={classes.productDescription}> {product.description || ""} </div>
                    </GridItem>
                    {product.warranty ?
                        <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                            <h4 className={classes.productDescription} style={{ fontSize: "25px" }}> Garantía: </h4>
                            <div className={classes.productDescription}> {product.warranty || ""} </div>
                        </GridItem> : <></>}
                    {product.sku ?
                        <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                            <h4 className={classes.productDescription} style={{ fontSize: "25px" }}> Sku: </h4>
                            <div className={classes.productDescription}> {product.sku || ""} </div>
                        </GridItem> : <></>}
                    <br />{!getQueyParamFromUrl('vw') ?
                        <Button onClick={addDropShipping} className={classes.buttonText} color="success" size="lg">
                            Vincular Producto a mi Comercio
                        </Button>
                        : <></>}
                    {Object.keys(errorMessage).map((keyName, i) => (
                        <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                    ))}
                    {successMessage
                        ? <Alert severity="success">{successMessage}</Alert>
                        : <span></span>
                    }

                </GridItem>
            </GridContainer>
            <Footer />
        </div>
    )

}