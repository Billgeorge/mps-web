import React from "react";

import GridItem from "components/Grid/GridItem";
import TextField from '@material-ui/core/TextField';
import styles from "assets/jss/material-kit-react/views/CreateProduct";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);
export default function CustomField(props) {
    const classes = useStyles();

    return(
        <GridItem xs={12} sm={12} md={12}>
            <h3>Ingresa al menos 1 característica especial</h3>
            <h4>Característica 1</h4>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField placeholder="Color, Talla u otro" onChange={props.handleSpecialFeature1} value={props.specialFeature1.nameFeature} name="nameFeature" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Nombre característica" variant="outlined" required />
            </GridItem>            
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField placeholder="S,M,L,XL,XXL" onChange={props.handleSpecialFeature1} value={props.specialFeature1.valuesFeature} name="valuesFeature" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Posibles valores separados por comas" variant="outlined" required />
            </GridItem>
            <h4>Característica 2</h4>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField placeholder="Color, Talla u otro" onChange={props.handleSpecialFeature2} value={props.specialFeature2.nameFeature} name="nameFeature" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Nombre característica" variant="outlined" required />
            </GridItem>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField placeholder="S,M,L,XL,XXL" onChange={props.handleSpecialFeature2} value={props.specialFeature2.valuesFeature} name="valuesFeature" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Posibles valores separados por comas" variant="outlined" required />
            </GridItem>
            <h4>Característica 3</h4>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField placeholder="Color, Talla u otro" onChange={props.handleSpecialFeature3} value={props.specialFeature3.nameFeature} name="nameFeature" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Nombre característica" variant="outlined" required />
            </GridItem>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField placeholder="S,M,L,XL,XXL" onChange={props.handleSpecialFeature3} value={props.specialFeature3.valuesFeature} name="valuesFeature" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Posibles valores separados por comas" variant="outlined" required />
            </GridItem>

        </GridItem>
    )
}