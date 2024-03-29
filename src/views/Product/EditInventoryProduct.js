import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
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
import InventoryPerBranch from "./InventoryPerBranch";


import styles from "assets/jss/material-kit-react/views/createPayment.js";

import { consumeServicePatch } from '../../service/ConsumeService'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import { CORE_BASEURL } from 'constant/index'
import { getMerchantId } from 'service/AuthenticationService'

const useStyles = makeStyles(styles);

export default function EditInventoryProduct(props) {

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    const [errorMessage, setErrorMessage] = React.useState({});

    const [successMessage, setSuccessMessage] = React.useState(null);

    const [isLoading, setIsLoading] = React.useState(false);

    const [branch, setBranch] = React.useState(
        []
    );

    const [product, setProduct] = React.useState({});

    const [combinations, setCombinations] = React.useState([]);

    const [inventories, setInventories] = React.useState([]);

    const [complexProductInventory, setComplexProductInventory] = React.useState([]);


    const callBackSuccessGetBranches = (branches) => {
        getProductInfo()
        setBranch(branches)
    }


    const determineTypeOfProduct = (product) => {
        const combinations = []
        if (product.isMaster && product.variants && product.variants.length > 0) {
            for (let subProduct of product.variants) {
                combinations.push({
                    attr: subProduct.attributes.replace('{', '').replace('}', ''),
                    productId: subProduct.id
                })
            }
        }
        setCombinations(combinations)
    }

    const callBackSuccessProduct = (product) => {
        determineTypeOfProduct(product)
        setProduct(product)
    }

    const callBackInventories = (inventories) => {
        setComplexProductInventory(inventories)
    }

    const callBack = (error) => {
        if (error != null && typeof error === 'object') {
            setErrorMessage(error)
        } else if (error != null && typeof error === 'string') {
            setErrorMessage({ 'Error': error })
        }
        else {
            setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
        }
        setIsLoading(false)
    }

    const callBackErrorGetBranches = (error) => {
        if (error == 404) {
            setErrorMessage({ "Error": "No tiene asociada sucursales, por favor crear al menos una" })
        } else {
            setErrorMessage({ "Error": "Error cargando sucursales" })
        }
    }

    const saveInventory = () => {
        setSuccessMessage("")
        setErrorMessage({})
        setInventories([])
        if (isLoading) {
            return
        }
        if (branch.length > 0) {
            
            let requestUpdate = {}
            if (product.isMaster && product.variants && product.variants.length > 0) {
                requestUpdate = buildRequestCompexProduct()
            } else {

                requestUpdate = buildRequestSimpleProduct()
                if (inventories.length < branch.length) {
                    setErrorMessage({ 'Error': 'Debe llenar todos los inventarios por sucursal' })
                    return
                }
            }
            setIsLoading(true)
            consumeServicePatch(requestUpdate, callBack, callBackCreateProducSuccess, `${CORE_BASEURL}/product/inventory`)

        } else {
            setErrorMessage({ 'Error': 'Falta uno o más campos obligatorios' })
        }
    }

    const buildRequestCompexProduct = () => {
        const variantInventories = []
        const totalInventory = complexProductInventory.reduce(
            function (prev, curr, index, vec) {
                return prev + curr.quantity
            }, 0
        )
        for (let subProduct of product.variants) {
            const totalPerProduct = complexProductInventory.filter(inv => inv.productId === subProduct.id).reduce(
                function (prev, curr, index, vec) {
                    return prev + curr.quantity
                }, 0
            )
            variantInventories.push({
                id: subProduct.id,
                inventory: totalPerProduct
            })
        }

        return {
            masterInventory: {
                id: product.id,
                inventory: totalInventory
            },
            variantsInventory: variantInventories
        }

    }

    const buildRequestSimpleProduct = () => {
        let inventory = calculateInventory()

        return {
            masterInventory: {
                id: getQueyParamFromUrl('idp'),
                inventory: inventory
            }
        }

    }


    const callBackCreateInventorySuccess = (inventory) => {
        setIsLoading(false)
        if(!product.isMaster){
            document.getElementById("editProductInventory").reset()
        }        
        setSuccessMessage("Inventario actualizado correctamente")
    }

    const callBackCreateProducSuccess = (productIn) => {

        let inventoryRequest = []
        if (product.isMaster && product.variants && product.variants.length > 0) {
            inventoryRequest = complexProductInventory
        } else {
            inventoryRequest = inventories
        }
        consumeServicePatch(inventoryRequest, callBack, callBackCreateInventorySuccess, `${CORE_BASEURL}/inventory`)

    }

    const getProductInfo = () => {
        const url = `${CORE_BASEURL}/product/public/${getQueyParamFromUrl('idp').slice(-6)}`
        consumeServiceGet(callBackErrorGetBranches, callBackSuccessProduct, url)
    }

    const getBranches = () => {
        setSuccessMessage("")
        let merchantId = getMerchantId()
        const url = `${CORE_BASEURL}/branch/merchant/${merchantId}`
        consumeServiceGet(callBackErrorGetBranches, callBackSuccessGetBranches, url)

    }

    const calculateInventory = () => {
        let inventory = 0
        branch.forEach(
            branch => {
                inventory = inventory + Number(document.getElementById(branch.id).value)
                if (document.getElementById(branch.id).value) {
                    inventories.push({
                        branchId: branch.id,
                        productId: getQueyParamFromUrl('idp'),
                        quantity: document.getElementById(branch.id).value
                    })
                }
            }
        )
        console.log("inventory total", inventories)
        return inventory
    }


    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    React.useEffect(() => {
        getBranches()
    }, []);

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
                                    }} onClick={() => props.history.push('/product')} /> Editar inventario de producto</h3>
                                </CardHeader>
                                <CardBody>
                                    {isLoading
                                        ? <center> <CircularProgress /></center>
                                        : <span></span>
                                    }{
                                        product.isMaster && product.variants && product.variants.length > 0 ?
                                            <InventoryPerBranch callBack={callBackInventories} branch={branch} combinations={combinations} />
                                            : <form className={classes.form} validated="true" name="editProductInventory" id="editProductInventory">
                                                {branch.map((row) => (
                                                    <GridContainer>
                                                        <GridItem xs={12} sm={12} md={12}>
                                                            <h5>Ingresa el inventario para cada bodega</h5>
                                                        </GridItem>
                                                        <GridItem xs={6} sm={6} md={6} style={{ "textAlign": "center", "paddingTop": "10px" }}>
                                                            <label style={{ "fontSize": "1.5em", "fontWeight": "bold" }}>{row.name}:</label>
                                                        </GridItem>
                                                        <GridItem xs={6} sm={6} md={6}>
                                                            <TextField inputProps={{ min: 0, id: row.id }} type="number" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Inventario" variant="outlined" required />
                                                        </GridItem>
                                                    </GridContainer>
                                                ))}
                                            </form>
                                    }

                                    {Object.keys(errorMessage).map((keyName, i) => (
                                        <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                                    ))}
                                    {successMessage
                                        ? <Alert severity="success">{successMessage}</Alert>
                                        : <span></span>
                                    }

                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button color="primary" size="lg" onClick={saveInventory}>
                                        Editar Inventario
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