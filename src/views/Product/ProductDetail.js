import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/productDetail.js";
import Example from "assets/img/examples/product-1.png";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardHeader from "components/Card/CardHeader.js";
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js";
import Footer from "components/Footer/Footer.js";
import Alert from '@material-ui/lab/Alert';

import {consumeServiceGet} from 'service/ConsumeService'
import {getQueyParamFromUrl} from 'util/UrlUtil'

import {CORE_BASEURL} from 'constant/index'
import consumeServicePost from "service/ConsumeService";




const useStyles = makeStyles(styles);
export default function ProductDetail(props) {  
    const [successMessage, setSuccessMessage] = React.useState(null);
    
    const [errorMessage, setErrorMessage] = React.useState("");

    const [product, setProduct] =  React.useState({
        id :"",
        name: "",
        description: "",
        inventory: "",
        merchantId: "",
        amount: "",
        dropshippingPrice: 0,
        imageUrl: ""

    })
    const [merchant, setMerchant] =  React.useState({
        name:"",
    })
    React.useEffect(() => {     
        changeMessageValidation()
      }, []);
    const changeMessageValidation = () =>{
        const callBack = (error) => {
            if(error!=null){
            setErrorMessage(error)
            }else{
              setErrorMessage({'Error':'Ha ocurrido un error inesperado por favor contactar al administrador'})
            }
            
        }
        
        const callBackGetProductSucess = (response) =>{            
            setProduct(response) 
            let idm = response.merchantId
            console.log("merchantId: ",idm)
            let url1 = `${CORE_BASEURL}/merchant/public/${idm}`
            consumeServiceGet(callBack,callBackGetMerchantSucess,url1)    
                   
        }

        const callBackGetMerchantSucess = (response) =>{            
            setMerchant(response)            
        }

        let idp = getQueyParamFromUrl('idp')
        let url=`${CORE_BASEURL}/product/public/${idp}`        
        consumeServiceGet(callBack,callBackGetProductSucess,url)
              
        
    } 

    const addDropShipping = () => {
        setErrorMessage({})            
        setSuccessMessage(null)
        const callBackSucess = () =>{
            setSuccessMessage("Producto vinculado satisfactoriamente.")                        
        }
        consumeServicePost({
            productId: product.id
        },callBackErrorAddingDrop,callBackSucess,`${CORE_BASEURL}/dropshippingsale`)
    } 
    const callBackErrorAddingDrop = () => {
        setErrorMessage("Error añadiendo producto")        
    }

    const classes = useStyles();

    return(
<div>
    <ResponsiveDrawe />
    <GridContainer className={classes.container} >
        <GridItem className={classes.sideSection} xs={12} sm={12} md={6}>
            <CardHeader className={classes.cardHeader}>
                <h3 style={{fontWeight:"600"}}><a href="/search-product"><ArrowBackIcon /></a> Detalle de producto </h3>
            </CardHeader>
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
            <h3 className={classes.shopName}
                id="nameProduct"
                name="name"
                value={product.name || ""}
            />                            
            <div className={classes.totalPrice} > <span> $ {product.amount || ""} </span> </div><br/>
                <img src={product.imageUrl} className={classes.imgProduct} />                                
            </GridItem>                      
        </GridItem>             
        <GridItem xs={12} sm={12} md={6} className= {classes.rightSide}>

            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                <h4 className={classes.productDescription} style={{fontSize:"25px"}}> Nombre del Producto: </h4>
                <div className={classes.productDescription}> {product.name || ""} </div>                
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                <h4 className={classes.productDescription} style={{fontSize:"25px"}}> Precio Distribuidor: </h4>
                <div className={classes.productDescription}> ${product.dropshippingPrice} </div>                
            </GridItem>                        
            <GridItem  justify="center" xs={12} sm={12} md={12} className={classes.gridItemCard}>
            <h4 className={classes.productDescription} style={{fontSize:"25px"}}> Nombre Proveedor:  </h4>            
            <div className={classes.productDescription}> {merchant.name || ""} </div>
            </GridItem>
            <GridItem  justify="center" xs={12} sm={12} md={12} className={classes.gridItemCard}>
            <h4 className={classes.productDescription} style={{fontSize:"25px"}}> Cantidad Disponible: </h4>            
            <div className={classes.productDescription}> {product.inventory || 0} </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                <h4 className={classes.productDescription} style={{fontSize:"25px"}}> Descripción: </h4>
                <div className={classes.productDescription}> {product.description || ""} </div>                
            </GridItem> 
            <br/>
            <Button onClick={addDropShipping} className={classes.buttonText}  color="success" size="lg">
                 Vincular Producto a mi Comercio
            </Button>
            {successMessage
                      ?<Alert severity="success">{successMessage}</Alert> 
                      :<span></span>
                    }
                
        </GridItem>          
    </GridContainer>
    <Footer/>
    </div>    
    )

}