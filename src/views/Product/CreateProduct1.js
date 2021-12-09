import React from "react";

import AddIcon from '@material-ui/icons/AddAPhoto'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import GridItem from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/CreateProduct";


const useStyles = makeStyles(styles);
export default function CreateProductStepOne(props) {
    const classes = useStyles();
    return (
        <GridItem xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={12}>


                <img type="file" src={props.productImage} name="productImage" alt='Imagen' id="productImage" className={classes.imgProduct} />
                <input onChange={props.fileSelected} accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" />
                <label className={classes.addImg} htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <AddIcon />
                    </IconButton>
                </label>

            </GridItem>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField onChange={props.handleChangeProduct} value={props.product.name} name="name" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Nombre producto" variant="outlined" required />
            </GridItem>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField style={{ width: "100%", paddingBottom: "10px" }}
                    id="description"
                    onChange={props.handleChangeProduct} value={props.product.description} name="description"
                    label="Descripción"
                    multiline
                    rows={4}
                    placeholder="Características, beneficios y demás del producto"
                    variant="outlined"
                    inputProps={{ maxLength: 1000 }}
                    required
                />
            </GridItem>

        </GridItem>
    )
}