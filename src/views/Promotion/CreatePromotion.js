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
import { consumeServicePatch } from 'service/ConsumeService'
import { getQueyParamFromUrl } from 'util/UrlUtil'

import ResponsiveDrawer from "components/LeftMenu/ResponsiveDrawer.js"
import styles from "assets/jss/material-kit-react/views/createPayment.js";
import {CORE_BASEURL} from 'constant/index'


const useStyles = makeStyles(styles);

export default function CreatePromotion(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    const [errorMessage, setErrorMessage] = React.useState({});

    const [successMessage, setSuccessMessage] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(false);

    const [form, setForm] = React.useState({
        quantity: 0,
        amount: 0
    })

    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const handleChange = (event) => {
        const name = event.target.name;
        setForm({
            ...form,
            [name]: event.target.value,
        });
    };
    React.useEffect(() => { changeMessageValidation() }, []);

    const changeMessageValidation = () => {
        const callBack = (error) => {
            if (error != null) {
                setErrorMessage(error)
            } else {
                setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
            }
            setIsLoading(false)
        }
        const callBackSucess = () => {
            setSuccessMessage("Promoción creada con éxito")
            document.getElementById("createBranch").reset();
            setIsLoading(false)
        }
        let idc = getQueyParamFromUrl('idc')

        document.createPromotion.onsubmit = function (event) {
            setErrorMessage({})
            event.preventDefault()
            setSuccessMessage(null)
            setIsLoading(true)

            consumeServicePatch({
                dropshippingSaleId: idc,
                discountRules: [{
                    quantity: document.getElementById("quantity").value,
                    condition: "EQUAL",
                    discount:{
                        target: "TOTAL_PRICE",
                        type: "FIXED_PRICE",
                        amount: document.getElementById("amount").value
                    }
                }]

            }, callBack,callBackSucess,`${CORE_BASEURL}/discounts`)
        }
    }
    return (
        <div>
            <ResponsiveDrawer />
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                        <Card className={classes[cardAnimaton]}>
                            <form className={classes.form} validated="true" name="createPromotion" id="createPromotion">
                                <CardHeader className={classes.cardHeader}>
                                    <h3 style={{ fontWeight: "600" }}><a href="/product-drop"><ArrowBackIcon /></a> Crear Promoción</h3>
                                </CardHeader>
                                <CardBody>
                                    {isLoading
                                        ? <center> <CircularProgress /></center>
                                        : <span></span>
                                    }
                                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                                        <InputLabel htmlFor="name">Cantidad</InputLabel>
                                        <OutlinedInput
                                            id="quantity"
                                            name="quantity"
                                            placeholder="Unidades"
                                            labelWidth={60}
                                            required
                                            type="number"
                                            value={form.quantity || ""}
                                            onChange={handleChange}
                                        />
                                    </FormControl>
                                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                                        <InputLabel htmlFor="amount">Precio promocional</InputLabel>
                                        <OutlinedInput
                                            id="amount"
                                            name="amount"
                                            placeholder="Precio"
                                            labelWidth={60}
                                            required
                                            type="number"
                                            value={form.amount || ""}
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
                                    <Button color="primary" size="lg" type="submit">
                                        Crear Promoción
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