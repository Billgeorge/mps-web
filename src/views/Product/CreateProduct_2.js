import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import styles from "assets/jss/material-kit-react/views/CreateProduct";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import CardFooter from "components/Card/CardFooter.js";
import Alert from '@material-ui/lab/Alert';
import { CORE_BASEURL } from 'constant/index'
import CircularProgress from '@material-ui/core/CircularProgress';
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import emptyImage from "assets/img/new_product.png"
import IconButton from '@material-ui/core/IconButton';
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import consumeServicePost from '../../service/ConsumeService'
import { consumeServiceGet } from '../../service/ConsumeService'
import { getMerchantId } from 'service/AuthenticationService'
import CreateProductStepTwo from './CreateProduct2'
import CreateProductStepOne from "./CreateProduct1";
import CustomField from "./CustomField";
import InventoryPerBranch from "./InventoryPerBranch";


const useStyles = makeStyles(styles);
export default function CreateProduct(props) {

    const classes = useStyles();

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    const [isLoading, setIsLoading] = React.useState(false);
    const [specialFeature1, setSpecialFeature1] = React.useState({
        nameFeature: '',
        valuesFeature: ''
    });
    const [specialFeature2, setSpecialFeature2] = React.useState({
        nameFeature: '',
        valuesFeature: ''
    });
    const [specialFeature3, setSpecialFeature3] = React.useState({
        nameFeature: '',
        valuesFeature: ''
    });
    const [step, setStep] = React.useState(1);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [productImage, setProductImage] = React.useState(emptyImage);
    const [productPhotos, setproductPhotos] = React.useState([]);
    const [infoMessage, setInfoMessage] = React.useState("");
    const [inventories, setInventories] = React.useState([]);
    const [complexInventory, setComplexInventory] = React.useState([]);
    const [showCustomFields, setShowCustomFields] = React.useState(false);
    const [combinations, setCombinations] = React.useState([]);
    const [imgs, setImgs] = React.useState([]);
    const [dimensions, setDimensions] = React.useState({
        long: 0,
        width: 0,
        height: 0
    })
    const [product, setProduct] = React.useState({
        name: '',
        description: '',
        dropshipping: false,
        amount: 0,
        dropshippingPrice: 0,
        specialFeatures: false,
        category: 0,
        inventory: 0,
        dimensions: [],
        weight: 0,
        warranty: '',
        variants: [],
        sku: ''
    });
    const [storedProduct, setStoredProduct] = React.useState({});

    const [branch, setBranch] = React.useState(
        []
    );

    const handleChangeProduct = (event) => {
        const name = event.target.name;
        setProduct({
            ...product,
            [name]: event.target.value,
        });
    };

    const callBackInventories = (inventories) => {
        console.log("inv", inventories)
        setComplexInventory(inventories)
    }

    const handleSpecialFeature1 = (event) => {
        const name = event.target.name;
        setSpecialFeature1({
            ...specialFeature1,
            [name]: event.target.value,
        });
    };

    const handleSpecialFeature2 = (event) => {
        const name = event.target.name;
        setSpecialFeature2({
            ...specialFeature2,
            [name]: event.target.value,
        });
    };

    const handleSpecialFeature3 = (event) => {
        const name = event.target.name;
        setSpecialFeature3({
            ...specialFeature3,
            [name]: event.target.value,
        });
    };

    const handleChangeDimensions = (event) => {
        const name = event.target.name;
        setDimensions({
            ...dimensions,
            [name]: event.target.value,
        });
    };

    const handleChangeCheckBox = (event) => {
        const name = event.target.name;
        setProduct({
            ...product,
            [name]: event.target.checked
        });
    };


    const callBackSuccessGetBranches = (branches) => {
        setBranch(branches)
        setStep(step + 1)
    }

    const callBackErrorGetBranches = (error) => {
        if (error === 404) {
            setErrorMessage({ "Error": "No tiene asociada sucursales, por favor crear al menos una" })
        } else {
            setErrorMessage({ "Error": "Error cargando sucursales" })
        }
    }

    const processInformation = () => {
        if (step === 1) {
            processInformationStepOne()
        }
        if (step === 2 && !showCustomFields) {
            processInformationStepTwo()
        }
        if (step === 2 && showCustomFields) {
            processInformationCustomFields()
        }
        if (step === 3 && !showCustomFields) {
            processInformationStepThree()

        }
        if (step === 3 && showCustomFields) {
            processStepThreeCustomFields()

        }
    }

    const processInformationCustomFields = () => {
        setInfoMessage("")
        setErrorMessage({})
        if ((specialFeature1.nameFeature && specialFeature1.valuesFeature) ||
            (specialFeature2.nameFeature && specialFeature2.valuesFeature) ||
            (specialFeature3.nameFeature && specialFeature3.valuesFeature)) {
            getBranches()
            consolidateSpecialFeatures()

        } else {
            setErrorMessage({ 'Error': 'Debes crear al menos una característica' })
        }
    }

    const consolidateSpecialFeatures = () => {
        let totalSpecialFeatures = 0
        let finalSpecialFeatures = []
        if (specialFeature1.nameFeature && specialFeature1.valuesFeature) {
            finalSpecialFeatures.push(specialFeature1.valuesFeature.split(','))
            totalSpecialFeatures++
        }
        if (specialFeature2.nameFeature && specialFeature2.valuesFeature) {
            finalSpecialFeatures.push(specialFeature2.valuesFeature.split(','))
            totalSpecialFeatures++
        }
        if (specialFeature3.nameFeature && specialFeature3.valuesFeature) {
            finalSpecialFeatures.push(specialFeature3.valuesFeature.split(','))
            totalSpecialFeatures++
        }

        let finalCombinations = []
        if (totalSpecialFeatures == 1) {
            finalCombinations = finalSpecialFeatures[0].map(
                function (sp) {
                    return `'${specialFeature1.nameFeature}':'${sp}'`
                }
            )
        }
        if (totalSpecialFeatures == 2) {
            finalSpecialFeatures[0].forEach(
                function (sp1) {
                    finalSpecialFeatures[1].forEach(
                        function (sp2) {
                            finalCombinations.push(
                                `'${specialFeature1.nameFeature}':'${sp1}','${specialFeature2.nameFeature}':'${sp2}'`
                            )
                        }
                    )
                }
            )
        }
        if (totalSpecialFeatures == 3) {
            let initialCombination = []
            finalSpecialFeatures[0].forEach(
                function (sp1) {
                    finalSpecialFeatures[1].forEach(
                        function (sp2) {
                            initialCombination.push(
                                {
                                    fe1: sp1,
                                    fe2: sp2
                                }
                            )
                        }
                    )
                }
            )

            initialCombination.forEach(
                function (comb) {
                    finalSpecialFeatures[2].forEach(
                        function (fe3) {
                            finalCombinations.push(
                                `'${specialFeature1.nameFeature}':'${comb.fe1}','${specialFeature2.nameFeature}':'${comb.fe2}','${specialFeature3.nameFeature}':'${fe3}'`
                            )
                        }
                    )
                }
            )
        }
        console.log("combinations", finalCombinations)
        setCombinations(finalCombinations)
    }

    const processInformationStepTwo = () => {
        setInfoMessage("")
        if (product.amount > 0 && ((product.dropshipping && product.dropshippingPrice > 0)
            || (!product.dropshipping)) && product.category &&
            product.warranty && product.sku && dimensions.long > 0 && dimensions.width > 0
            && dimensions.height > 0 && product.weight > 0) {
            if (product.specialFeatures && product.variants.length == 0) {
                setShowCustomFields(true)
                console.log("adding custom features")
            } else {
                setShowCustomFields(false)
                getBranches()
            }
        } else {
            setErrorMessage({ 'Error': 'Falta uno o más campos obligatorios' })
        }
    }

    const getBranches = () => {
        setErrorMessage({})
        let merchantId = getMerchantId()
        const url = `${CORE_BASEURL}/branch/merchant/${merchantId}`
        consumeServiceGet(callBackErrorGetBranches, callBackSuccessGetBranches, url)
    }
    const callBack = (error) => {
        if (error != null && typeof error === 'object') {
            setErrorMessage(error)
        } else if (error != null && typeof error === 'String') {
            setErrorMessage({ 'Error': error })
        }
        else {
            setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
        }
        setIsLoading(false)
    }

    const callBackCreateProducSuccess = (product) => {
        console.log("product", product)
        setStoredProduct(product)
        let finalInventoryRequest = {}
        if (showCustomFields) {
            finalInventoryRequest = createInventoryRequest(product)
        } else {
            finalInventoryRequest = {
                'requests': [{
                    productId: product.id,
                    inventories: inventories
                }]
            }
        }

        consumeServicePost(finalInventoryRequest, callBack, callBackCreateInventorySuccess, `${CORE_BASEURL}/inventory`)

    }

    const createInventoryRequest = (product) => {
        console.log("creating request for inventory", complexInventory)
        let attrs = new Set(complexInventory.map((element) => element.attr));
        let finalInventoryRequest = []
        attrs.forEach((attr) => {
            console.log("attr", attr)
            finalInventoryRequest.push({
                'productId': product.variants.filter((variant) =>
                    variant.attributes.replace('{', '').replace('}', '') === attr
                )[0].id,
                'inventories': complexInventory.filter((inv) => inv.attr === attr)
            })
        });
        console.log("request created", finalInventoryRequest)
        return {
            'requests': finalInventoryRequest
        }
    }

    const callBackCreateInventorySuccess = (inventory) => {
        setIsLoading(false)
        document.getElementById("createProduct").reset()
        setImgs([])
        setproductPhotos([])
        setInfoMessage("Producto creado correctamente")
        setStep(1)       
        setProductImage(emptyImage)
        setShowCustomFields(false)
        setProduct(
            {
                name: '',
                description: '',
                dropshipping: false,
                amount: 0,
                dropshippingPrice: 0,
                specialFeatures: false,
                category: 0,
                inventory: 0,
                dimensions: [],
                weight: 0,
                warranty: '',
                variants: [],
                sku: ''
            }
        )
        setDimensions({
            long: 0,
            width: 0,
            height: 0
        })
        setCombinations([])
        setInventories([])
        setComplexInventory([])
        setProductImage(emptyImage)
        setSpecialFeature1(
            {
                nameFeature: '',
                valuesFeature: ''
            }
        )
        setSpecialFeature2(
            {
                nameFeature: '',
                valuesFeature: ''
            }
        )
        setSpecialFeature3(
            {
                nameFeature: '',
                valuesFeature: ''
            }
        )
        setStoredProduct({})
        setBranch([])
    }


    const processStepThreeCustomFields = () => {
        if (storedProduct && storedProduct.id) {
            callBackCreateProducSuccess()
            return
        }
        setInfoMessage("")
        setErrorMessage({})
        if (isLoading) {
            return
        }
        setErrorMessage({})
        let inventoryItem = groupInventoriesPerAttr()
        let requestForm = {
            amount: product.amount,
            name: product.name,
            inventory: inventoryItem.total,
            dropshipping: product.dropshipping,
            description: product.description,
            merchantId: getMerchantId(),
            specialFeatures: product.specialFeatures,
            dropshippingPrice: product.dropshippingPrice,
            category: product.category,
            sku: product.sku,
            weight: product.weight,
            warranty: product.warranty,
            dimensions: [dimensions.long, dimensions.width, dimensions.height],
            isMaster: true
        }
        const json = JSON.stringify(requestForm);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        const data = new FormData();
        data.append("data", blob);
        productPhotos.forEach(
            (pphoto)=>{
                data.append("image", pphoto);
            }
        )   
        data.append("variants", JSON.stringify(inventoryItem.inventory));
        setIsLoading(true)
        consumeServicePost(data, callBack, callBackCreateProducSuccess, `${CORE_BASEURL}/product`)
    }

    const groupInventoriesPerAttr = () => {
        const inventoriesMap = new Map();
        const finalInventories = []
        complexInventory.map((row, index) => {
            if (!inventoriesMap.has(row.attr)) {
                inventoriesMap.set(row.attr, row.quantity)
            } else {
                const finalInventory = inventoriesMap.get(row.attr) + row.quantity
                inventoriesMap.set(row.attr, finalInventory)
            }
        })

        let totalInventory = 0
        for (const [key, value] of inventoriesMap) {
            totalInventory = totalInventory + value
            finalInventories.push(
                {
                    'attributes': `{${key}}`,
                    'quantity': value
                }
            )

        }
        console.log('keys', finalInventories)
        return {
            'inventory': finalInventories,
            'total': totalInventory
        }
    }

    const processInformationStepThree = () => {
        setInfoMessage("")
        setErrorMessage({})
        if (isLoading) {
            return
        }
        if (branch.length > 0) {
            setErrorMessage({})
            let inventory = calculateInventory()

            let requestForm = {
                amount: product.amount,
                name: product.name,
                inventory: inventory,
                dropshipping: product.dropshipping,
                description: product.description,
                merchantId: getMerchantId(),
                specialFeatures: product.specialFeatures,
                dropshippingPrice: product.dropshippingPrice,
                category: product.category,
                sku: product.sku,
                weight: product.weight,
                warranty: product.warranty,
                dimensions: [dimensions.long, dimensions.width, dimensions.height],
                isMaster: true
            }
            const json = JSON.stringify(requestForm);
            const blob = new Blob([json], {
                type: 'application/json'
            });
            const data = new FormData();
            data.append("data", blob);
            productPhotos.forEach(
                (pphoto)=>{
                    data.append("image", pphoto);
                }
            )            
            setIsLoading(true)
            consumeServicePost(data, callBack, callBackCreateProducSuccess, `${CORE_BASEURL}/product`)

        } else {
            setErrorMessage({ 'Error': 'Falta uno o más campos obligatorios' })
        }
    }

    const calculateInventory = () => {
        let inventory = 0
        branch.forEach(
            branch => {
                inventory = inventory + Number(document.getElementById(branch.id).value)
                if (document.getElementById(branch.id).value > 0) {
                    inventories.push({
                        branchId: branch.id,
                        quantity: document.getElementById(branch.id).value
                    })
                }
            }
        )
        console.log("inventory total", inventories)
        return inventory
    }

    const processInformationStepOne = () => {
        setInfoMessage("")
        if (product.name && product.description && imgs.length>0) {
            setStep(step + 1)
            setErrorMessage({})
        } else {
            setErrorMessage({ 'Error': 'Falta uno o más campos obligatorios' })
        }
    }
    const backStep = () => {
        if (step > 1) {
            if (step === 2 && showCustomFields) {
                setShowCustomFields(false)
            } else {
                setStep(step - 1)
                setErrorMessage({})
            }
        }
        if ((step - 1) === 1) {
            setStep(step - 1)            
        }
    }

    return (
        <div>
            <ResponsiveDrawe />
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                        <Card className={classes[cardAnimaton]}>

                            <CardHeader className={classes.cardHeader}>
                                <h3 style={{ fontWeight: "600" }}><ArrowBackIcon style={{
                                    color: "#9c27b0", textDecoration: "none",
                                    backgroundColor: "transparent", cursor: "pointer"
                                }} onClick={() => props.history.push('/product')} /> Crear producto nuevo</h3>
                            </CardHeader>
                            <CardBody>
                                <form className={classes.form} validated="true" name="createProduct" id="createProduct">
                                    {isLoading
                                        ? <center> <CircularProgress /></center>
                                        : <span></span>
                                    }
                                    {step === 1 ?
                                        <CreateProductStepOne setproductPhotos={setproductPhotos} imgs={imgs} setImgs={setImgs} handleChangeProduct={handleChangeProduct} setErrorMessage={setErrorMessage} product={product} productImage={productImage} />
                                        : <span></span>}
                                    {!showCustomFields && step === 2 ?
                                        <CreateProductStepTwo handleChangeDimensions={handleChangeDimensions} dimensions={dimensions} handleChangeCheckBox={handleChangeCheckBox} product={product} handleChangeProduct={handleChangeProduct} />
                                        : <span></span>}
                                    {showCustomFields && step === 2 ?
                                        <CustomField product={product} handleSpecialFeature1={handleSpecialFeature1} handleSpecialFeature2={handleSpecialFeature2} handleSpecialFeature3={handleSpecialFeature3} specialFeature1={specialFeature1} specialFeature2={specialFeature2} specialFeature3={specialFeature3} />
                                        : <span></span>}
                                    {!showCustomFields && step === 3 ?
                                        branch.map((row) => (
                                            <GridContainer>
                                                <GridItem xs={12} sm={12} md={12}>
                                                    <h5>Ingresa el inventario para cada bodega</h5>
                                                </GridItem>
                                                <GridItem xs={6} sm={6} md={6} style={{ "textAlign": "center", "paddingTop": "10px" }}>
                                                    <label style={{ "font-size": "1.5em", "font-weight": "bold" }}>{row.name}:</label>
                                                </GridItem>
                                                <GridItem xs={6} sm={6} md={6}>
                                                    <TextField inputProps={{ min: 0, id: row.id }} type="number" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Inventario" variant="outlined" required />
                                                </GridItem>
                                            </GridContainer>
                                        ))
                                        : <span></span>}
                                    {showCustomFields && step === 3 ?
                                        <InventoryPerBranch callBack={callBackInventories} branch={branch} combinations={combinations} />
                                        : <span></span>}
                                    {step > 1 ?
                                        <IconButton onClick={backStep} color="primary" aria-label="upload picture" component="span">
                                            <ArrowBackIcon />
                                        </IconButton>
                                        : <span></span>}
                                    {Object.keys(errorMessage).map((keyName, i) => (
                                        <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                                    ))}
                                    {infoMessage
                                        ? <Alert severity="success">{infoMessage}</Alert>
                                        : <span></span>
                                    }
                                </form>
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button color="primary" size="lg" onClick={processInformation}>
                                    {step === 3 ? "Crear Producto" : "Siguiente"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>


                </GridContainer>
            </div>
        </div>
    )

}