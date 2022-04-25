import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import styles from "assets/jss/material-kit-react/views/checkout.js";
import Button from "components/CustomButtons/Button.js";
import GroupedButtons from 'views/Components/Numeric'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import _ from "lodash";
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles(styles);
export default function CatalogueProductDetail(props) {

    const classes = useStyles();
    const [product, setProduct] = React.useState(props.product);
    const [carQuantity, setCarQuantity] = React.useState(1);
    const [customFields, setCustomFields] = React.useState([])
    const [customFieldsCols, setCustomFieldsCols] = React.useState(0)
    const [errorMessage, setErrorMessage] = React.useState("");



    const handleChangeQuantity = (quantity) => {
        setCarQuantity(quantity)
    };

    const addOrderProduct = () => {
        if (product.variants && product.variants.length>0) {
            addCartItem()
            return
        }
        props.setOrderProducts(oldArray => [...oldArray, { quantity: carQuantity, id: props.product.id, name: props.product.name, price: props.product.price, idToDelete:Math.floor(Math.random() * 100 ) }]);
        props.viewCart()
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    React.useEffect(() => { renderVariants() }, []);

    const renderVariants = () => {
        let variants = product.variants
        if (!variants) {
            return
        }
        let totalCols = 12
        console.log("starting ", variants)
        let attributes = variants.map(function (variant) {
            return JSON.parse(variant.attributes.replaceAll("'", '"'));
        });
        console.log("attrs ", attributes)
        let finalKeys = []
        attributes.forEach(
            function (attr) {
                finalKeys = finalKeys.concat(Object.keys(attr))
            }
        )
        console.log("entries ", Object.entries(attributes))
        console.log("keys ", finalKeys)
        finalKeys = [...new Set(finalKeys)]
        console.log("keys ", finalKeys)
        let cols = totalCols / finalKeys.length
        let finalComponents = []
        finalKeys.forEach(
            function (key) {
                finalComponents.push({
                    'label': key,
                    'options': groupBy(attributes, key)
                })
            }
        )
        setCustomFieldsCols(cols)
        setCustomFields(finalComponents)
        console.log("options ", finalComponents)
        console.log("cols ", cols)
    }

    const groupBy = function (array, key) {
        let options = []
        array.forEach(function (element) {
            let pair = Object.entries(element)
            pair.forEach(
                (pr) => {
                    if (pr[0] == key) {
                        options = options.concat(pr[1])
                    }
                }
            )

        })
        return [...new Set(options)]
    };

    const addCartItem = () => {
        let len = customFields.length
        let label = ""
        let attr = ""
        for (let i = 0; i < len; i++) {
            if (attr) {
                attr = `${attr}, "${document.getElementById(i).name}":"${document.getElementById(i).value}" `
            } else {
                attr = `"${document.getElementById(i).name}":"${document.getElementById(i).value}"`
            }

            label = `${label} ${document.getElementById(i).name}: ${document.getElementById(i).value}`
        }
        let finalItems = addVariantProductToOrder(attr, label)
        console.log(finalItems)
    }

    const addVariantProductToOrder = (attr, newLabel) => {

        let jsonAttr = JSON.parse("{" + attr + "}")
        let productToAdd = null
        product.variants.forEach(
            (item) => {
                let productJsonAttr = JSON.parse(item.attributes.replaceAll("'", '"'))
                if (_.isEqual(jsonAttr, productJsonAttr)) {
                    productToAdd = item
                }
            }
        )
        if (productToAdd) {
            props.setOrderProducts(oldArray => [...oldArray, { quantity: carQuantity, id: productToAdd.id, name: newLabel, price: productToAdd.price,idToDelete:Math.floor(Math.random() * 100 ) }]);
            props.viewCart()
        } else {
            setErrorMessage("El producto no tiene inventario.")
        }

    }

    return (
        <GridContainer className={classes.container} >
            <GridItem className={classes.sideSection} xs={12} sm={12} md={6} style={{ backgroundColor: "rgb(204 204 204 / 22%)" }}>

                <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                    <h3 className={classes.shopName}>{product.name}</h3>
                    <div className={classes.totalPrice}><span>{formatter.format(product.price)}</span></div><br />
                    <img src={product.imgUrls[0]} alt={product.name} className={classes.imgProduct} />
                </GridItem>

                {product.warranty && product.warranty !== "" ?
                    <>
                        <GridItem xs={12} sm={12} md={12} className={classes.detailText}>Garantía</GridItem>
                        <GridItem xs={12} sm={12} md={12} className={classes.productDescription}> {product.warranty}</GridItem>
                    </> : <></>
                }
            </GridItem>
            <GridItem xs={12} sm={12} md={6} className={classes.rightSide}>
                <br />

                <GridItem xs={12} sm={12} md={12} className={classes.detailText}> Descripción </GridItem>
                <GridItem xs={12} sm={12} md={12} className={classes.productDescription}> {product.description}</GridItem>

                <br />
                {customFields && customFields.length > 0 ?
                    <GridContainer justifyContent="center">
                        <h3 className={classes.shopName}>Selecciona tus productos</h3>
                        {
                            customFields.map(function (cf, index) {
                                return <>
                                    <GridItem style={{ textAlign: "center" }} xs={customFieldsCols} sm={customFieldsCols} md={customFieldsCols}>
                                        <InputLabel htmlFor="outlined-age-native-simple">{cf.label}</InputLabel>
                                        <Select
                                            native
                                            label={cf.label}
                                            inputProps={{
                                                name: cf.label,
                                                id: index
                                            }}
                                        >
                                            {cf.options.map(function (state) {
                                                return <option value={state}>{state.toLowerCase().replace(/^./, (str) => {
                                                    return str.toUpperCase();
                                                })}</option>;
                                            })
                                            }
                                        </Select>
                                    </GridItem>
                                </>
                            })

                        }
                    </GridContainer> : <></>
                }

                <br />

                <GridContainer justify="center" style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <GridItem justify="center" style={{ textAlign: 'center', marginTop: '4px' }} xs={6} sm={6} md={6} className={classes.detailText}> Cantidad </GridItem>
                    <GridItem justify="center" style={{ margin: "0 auto" }} xs={6} sm={6} md={6}>
                        <GroupedButtons callback={handleChangeQuantity} ></GroupedButtons>
                    </GridItem>
                </GridContainer>

                <br /> <br />
                <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                    <span>Al realizar la compra estás aceptando nuestros <a href="https://www.eikoos.com/terminos-y-condiciones/" target="_blank">términos y condiciones</a></span>
                </GridItem>
                {errorMessage != ""
                    ? <GridItem xs={12} sm={12} md={12} ><Alert severity="error">{errorMessage}</Alert></GridItem> : <span></span>
                }
                <Button onClick={addOrderProduct} style={{ fontSize: "1.07em", fontWeight: "900", backgroundColor: "#3636c3" }} className={classes.buttonText} color="success" size="lg">
                    Añadir a tu pedido
                </Button>

                <Button onClick={() => { props.viewCatalogue() }} style={{ fontSize: "1.07em", fontWeight: "900", backgroundColor: "#3636c3" }} className={classes.buttonText} size="lg">
                    <ArrowBackIcon className={classes.arrow} onClick={() => { }} /> Volver al catálogo
                </Button>


            </GridItem>
        </GridContainer>
    )

}