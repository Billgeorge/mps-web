import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import styles from "assets/jss/material-kit-react/views/checkout.js";
import Button from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Example from "assets/img/examples/product-1.png"

const useStyles = makeStyles(styles);
export default function Checkout() {

    const classes = useStyles();
    const [isCash, setIsCash] = React.useState(true);

    return(
    <GridContainer className={classes.container} >
        <GridItem className={classes.sideSection} xs={12} sm={12} md={6} style={{backgroundColor: "rgb(60 60 60 / 22%)"}}>
            <GridItem xs={12} sm={12} md={12} style={{display: "flex"}} >
                <Button
                href=""
                color="transparent"
                target="_blank"
                style={{padding:"0"}}
                className={classes.navLink}          
                >          
                    <Avatar style={{backgroundColor: "rgb(29 143 210)"}} >
                                TP
                    </Avatar>
                                        
                </Button>
                <h3 className={classes.shopName}>Tu Tienda</h3>    
            </GridItem> 
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
            <h3 className={classes.shopName}>Zapatos Aquiles línea</h3> 
            <div className={classes.totalPrice}><span>$35.000</span></div><br/>
                <img src={Example} className={classes.imgProduct} />
                                
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                <div className={classes.productDescription}> descripcion de prueba para ver como se ve esta inscripcion a</div>
                <GridContainer justify="center" style={{marginTop:"30px"}}>
                    <GridItem xs={12} sm={12} md={6} className={classes.DetailText}> Cantidad </GridItem>                                        
                    
                </GridContainer>
            </GridItem>          
            
        </GridItem>
        <GridItem xs={12} sm={12} md={6} className= {classes.sideSection} style={{backgroundColor: "rgb(222 220 228 / 22%)"}}>
        <h3 className={classes.shopName}>Información de pago</h3>
            <RadioGroup aria-label="gender" name="gender1" row>
                <FormControlLabel value="female" control={<Radio />} label="Efectivo" />
                <FormControlLabel value="male" control={<Radio />} label="Tarjeta Crédito" />
                <FormControlLabel value="other" control={<Radio />} label="Tarjeta Débito/Ahorros" />            
            </RadioGroup>
            <br/>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <TextField style={{width:"98%", backgroundColor:"white"}}  id="outlined-basic" label="Número de Identificación" variant="outlined" />
                </GridItem>                    
            </GridContainer>

            <GridContainer justify="center" style={{marginTop:"10px"}}>
                <GridItem xs={12} sm={12} md={12}>
                    <TextField style={{width:"98%", backgroundColor:"white"}}  id="outlined-basic" label="Número de Tarjeta" variant="outlined" />
                </GridItem>  
                <GridItem xs={12} sm={12} md={12} >
                    <TextField  id="outlined-basic" style={{width:"50%", backgroundColor:"white"}} placeholder="MM/YY" variant="outlined" />
                    <TextField  id="outlined-basic" style={{width:"48%", backgroundColor:"white"}}  placeholder="CVV" variant="outlined" />
                </GridItem>
                <GridItem xs={12} sm={12} md={6} className={classes.midSize}>
                   
                </GridItem>                    
            </GridContainer>
            <GridContainer justify="center" style={{marginTop:"10px"}}>
                <GridItem xs={12} sm={12} md={12}>
                    <TextField style={{width:"98%", backgroundColor:"white"}}  id="outlined-basic" label="Nombre sobre tarjeta" variant="outlined" />
                </GridItem>                    
            </GridContainer>
            <br/>
            <Button style={{width:"98%", backgroundColor:"#0202ce"}} color="success" size="lg">
                      Pagar $35.000
            </Button>    
        </GridItem>        
    </GridContainer>
    )

}