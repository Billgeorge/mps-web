import React from "react";

import styles from "assets/jss/material-kit-react/views/CreateProduct";
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import GridItem from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import { categories } from 'constant/index'
import GridContainer from "components/Grid/GridContainer";
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(styles);
export default function CreateProductStepTwo(props) {
    const classes = useStyles();
    return (
        <GridItem xs={12} sm={12} md={12}>

            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={props.handleChangeCheckBox} value={props.product.dropshipping} name="dropshipping"
                            color="primary"
                        />
                    }
                    label="¿Es producto dropshipping?"
                />
            </GridItem>
            {props.product.dropshipping ?
                <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                        <InputLabel htmlFor="valor">Precio a distribuidor</InputLabel>
                        <OutlinedInput
                            onChange={props.handleChangeProduct} value={props.product.dropshippingPrice} name="dropshippingPrice"
                            id="dropshippingPrice"
                            placeholder="Recuerda tener en cuenta nuestra comisión"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            labelWidth={60}
                            required
                            inputProps={{ min: 10000 }}
                            type="number"
                        />
                    </FormControl>
                </GridItem>
                : <span></span>}

            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="valor">Precio a consumidor</InputLabel>
                    <OutlinedInput
                        id="amount"
                        onChange={props.handleChangeProduct} value={props.product.amount} name="amount"
                        placeholder="Recuerda tener en cuenta nuestra comisión"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        labelWidth={60}
                        required
                        min="1000"
                        inputProps={{ min: 10000 }}
                        type="number"
                    />
                </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <FormControl style={{ width: "100%", backgroundColor: "white" }} variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Categoría de producto</InputLabel>
                    <Select
                        native
                        onChange={props.handleChangeProduct} value={props.product.category} name="category"
                        label="Categoría producto"
                        inputProps={{
                            name: 'category',
                            id: 'category'
                        }}

                    >
                        <option aria-label="None" value="" />

                        {

                            categories.map(function (category) {
                                return <option value={category.category}>{category.name}</option>;
                            })

                        }

                    </Select>
                </FormControl>
            </GridItem>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="valor">Sku</InputLabel>
                    <OutlinedInput
                        id="sku"
                        onChange={props.handleChangeProduct} value={props.product.sku} name="sku"
                        labelWidth={60}
                        required
                    />
                </FormControl>
            </GridItem>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField style={{ width: "100%", paddingBottom: "10px" }}
                    id="warranty"
                    onChange={props.handleChangeProduct} value={props.product.warranty} name="warranty"
                    label="Garantía"
                    multiline
                    rows={4}
                    placeholder="¿cuánto tiempo de garantía?¿Condiciones?"
                    variant="outlined"
                    inputProps={{ maxLength: 1000 }}
                    required
                />
            </GridItem>
            <GridContainer justify="center">
                <GridItem style={{ marginTop: "10px" }} xs={6} sm={6} md={6}>
                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                        <InputLabel htmlFor="valor">Largo</InputLabel>
                        <OutlinedInput
                            id="long"
                            onChange={props.handleChangeDimensions} value={props.dimensions.long} name="long"
                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                            labelWidth={65}
                            required
                            min="1"
                            inputProps={{ min: 1 }}
                            type="number"
                        />
                    </FormControl>
                </GridItem>
                <GridItem style={{ marginTop: "10px" }} xs={6} sm={6} md={6}>
                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                        <InputLabel htmlFor="valor">Ancho</InputLabel>
                        <OutlinedInput
                            id="width"
                            onChange={props.handleChangeDimensions} value={props.dimensions.width} name="width"
                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                            labelWidth={65}
                            required
                            min="1"
                            inputProps={{ min: 1 }}
                            type="number"
                        />
                    </FormControl>
                </GridItem>
            </GridContainer>
            <GridContainer justify="center">
                <GridItem style={{ marginTop: "10px" }} xs={6} sm={6} md={6}>
                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                        <InputLabel htmlFor="valor">Alto</InputLabel>
                        <OutlinedInput
                            id="height"
                            onChange={props.handleChangeDimensions} value={props.dimensions.height} name="height"
                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                            labelWidth={65}
                            required
                            min="1"
                            inputProps={{ min: 1 }}
                            type="number"
                        />
                    </FormControl>
                </GridItem>
                <GridItem style={{ marginTop: "10px" }} xs={6} sm={6} md={6}>
                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                        <InputLabel htmlFor="valor">Peso</InputLabel>
                        <OutlinedInput
                            id="weight"
                            onChange={props.handleChangeProduct} value={props.product.weight} name="weight"
                            endAdornment={<InputAdornment position="end">lb</InputAdornment>}
                            labelWidth={60}
                            required
                            min="1"
                            inputProps={{ min: 1 }}
                            type="number"
                        />
                    </FormControl>
                </GridItem>
            </GridContainer>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={props.handleChangeCheckBox} value={props.product.specialFeatures} name="specialFeatures"
                            color="primary"
                        />
                    }
                    label="¿Este producto tiene características especiales (color, talla, etc)?"
                />
            </GridItem>
        </GridItem>
    )
}