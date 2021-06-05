import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/productDetail.js"
import Example from "assets/img/examples/product-1.png"



const useStyles = makeStyles(styles);
export default function ProductDetail() {
    const classes = useStyles();
    return(
    <GridContainer className={classes.container} >
        <GridItem className={classes.sideSection} xs={12} sm={12} md={6}>            
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
            <h3 className={classes.shopName} >Zapatos Aquiles Esteban coñac</h3>
            <div className={classes.totalPrice} ><span>$ 35.000</span></div><br/>
                <img src={Example} className={classes.imgProduct} />                                
            </GridItem>                      
        </GridItem>             
        <GridItem xs={12} sm={12} md={6} className= {classes.rightSide}>

            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                <h4 className={classes.productDescription} style={{fontSize:"25px"}}> Nombre del Producto: </h4>
                <div className={classes.productDescription}> zapatos estaban coñac aquiles </div>                
            </GridItem>            
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                <h4 className={classes.productDescription} style={{fontSize:"25px"}}> Descripción: </h4>
                <div className={classes.productDescription}> zapatos de linea clásica verano 2021 en cuero </div>                
            </GridItem>             
            <GridItem  justify="center" xs={12} sm={12} md={12} className={classes.gridItemCard}>
            <h4 className={classes.productDescription} style={{fontSize:"25px"}}> Nombre Proveedor:  </h4>            
            <div className={classes.productDescription}> *Nombre del comercio* </div>
            </GridItem>
            <GridItem  justify="center" xs={12} sm={12} md={12} className={classes.gridItemCard}>
            <h4 className={classes.productDescription} style={{fontSize:"25px"}}> Cantidad Disponible: </h4>            
            <div className={classes.productDescription}> *Valor númerico de Cantidad* </div>
            </GridItem>
            <br/>
            <Button className={classes.buttonText}  color="success" size="lg">
                 Vincular Producto a mi Comercio
            </Button>
                
        </GridItem>          
    </GridContainer>
    )

}