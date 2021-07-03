import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import styles from "assets/jss/material-kit-react/views/CreateProduct";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import { getQueyParamFromUrl } from 'util/UrlUtil'
import CardFooter from "components/Card/CardFooter.js";
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import { CORE_BASEURL, PULL_BASEURL } from 'constant/index'
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import emptyImage from "assets/img/new_product.png"
import AddIcon from '@material-ui/icons/AddAPhoto'
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Card from "components/Card/Card.js";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import consumeServicePost from '../../service/ConsumeService'
import { consumeServiceGet } from '../../service/ConsumeService'
import { getMerchantId } from 'service/AuthenticationService'


const useStyles = makeStyles(styles);
export default function CreateProduct() {

    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [productImage, setProductImage] = React.useState(emptyImage);
    const [infoMessage, setInfoMessage] = React.useState("");
    const [inventories, setInventories] = React.useState([]);

    const [product, setProduct] = React.useState({
        name: '',
        description: '',
        dropshipping: false,
        amount: 0,
        dropshippingPrice: 0,
        specialFeatures: false,
        category: 0,
        inventory: 0
    });
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

    const handleChangeCheckBox = (event) => {
        const name = event.target.name;

        setProduct({
            ...product,
            [name]: event.target.checked
        });
    };


    const callBackSuccessGetBranches = (branches) => {
        setBranch(branches)
    }

    const callBackErrorGetBranches = (error) => {
        if (error == 404) {
            setErrorMessage({ "Error": "No tiene asociada sucursales, por favor crear al menos una" })
        } else {
            setErrorMessage({ "Error": "Error cargando sucursales" })
        }
    }

    const fileSelected = (event) => {
        setErrorMessage({})
        let file = event.target.files[0]
        if (file && file.size > 1048576) {
            setErrorMessage({ 'Error': 'Tu imagén es muy pesada. No debe superar 1Mb' })
            return
        }
        rederImage(file)
        setProductImage(file)
    };

    const rederImage = (file) => {
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById("productImage").src = fr.result;
        }
        fr.readAsDataURL(file);
    }

    const processInformation = () => {
        if (step === 1) {
            processInformationStepOne()
        }
        if (step === 2) {
            processInformationStepTwo()
        }
        if (step == 3) {
            {
                processInformationStepThree()
            }
        }
    }

    const processInformationStepTwo = () => {
        if (product.amount > 0 && ((product.dropshipping && product.dropshippingPrice > 0)
            || (!product.dropshipping)) && product.category) {
            setStep(step + 1)
            setErrorMessage({})
            let merchantId = getMerchantId()
            const url = `${CORE_BASEURL}/branch/merchant/${merchantId}`
            consumeServiceGet(callBackErrorGetBranches, callBackSuccessGetBranches, url)
        } else {
            setErrorMessage({ 'Error': 'Falta uno o más campos obligatorios' })
        }
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
        console.log("product",product)
        let createInventoryRequest = {
            productId:product.id,
            inventories:inventories
        }
        consumeServicePost(createInventoryRequest, callBack, callBackCreateInventorySuccess, `${CORE_BASEURL}/inventory`)

    }

    const callBackCreateInventorySuccess = (inventory) => {
      setInfoMessage("Producto creado correctamente")
    }

    const processInformationStepThree = () => {

        if (branch.length > 0) {
            setErrorMessage({})
            let inventory = calculateInventory()
            if (inventory > 0) {
                let requestForm = {
                    amount: product.amount,
                    name: product.name,
                    inventory: inventory,
                    dropshipping: product.dropshipping,
                    description: product.description,
                    merchantId: getMerchantId(),
                    specialFeatures: product.specialFeatures,
                    dropshippingPrice: product.dropshippingPrice,
                    category:product.category
                }
                const json = JSON.stringify(requestForm);
                const blob = new Blob([json], {
                    type: 'application/json'
                });
                const data = new FormData();
                data.append("data", blob);
                data.append("image", productImage);
                consumeServicePost(data, callBack, callBackCreateProducSuccess, `${CORE_BASEURL}/product`)
            } else {
                setErrorMessage({ 'Error': 'Debe poner inventario en al menos una bodega.' })
            }
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
        if (product.name && product.description && productImage !== emptyImage) {
            setStep(step + 1)
            setErrorMessage({})
        } else {
            setErrorMessage({ 'Error': 'Falta uno o más campos obligatorios' })
        }
    }
    const backStep = () => {
        if (step > 1) {
            setStep(step - 1)
            setErrorMessage({})
        }
        if ((step - 1) === 1) {
            rederImage(productImage)
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
                                <h3 style={{ fontWeight: "600" }}><a href="/product"><ArrowBackIcon /></a> Crear producto nuevo</h3>
                            </CardHeader>
                            <CardBody>
                                {isLoading
                                    ? <center> <CircularProgress /></center>
                                    : <span></span>
                                }
                                {step === 1 ?
                                    <GridItem xs={12} sm={12} md={12}>
                                        <GridItem xs={12} sm={12} md={12}>


                                            <img type="file" src={productImage} name="productImage" id="productImage" className={classes.imgProduct} />
                                            <input onChange={fileSelected} accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" />
                                            <label className={classes.addImg} htmlFor="icon-button-file">
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <AddIcon />
                                                </IconButton>
                                            </label>

                                        </GridItem>
                                        <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                                            <TextField onChange={handleChangeProduct} value={product.name} name="name" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Nombre producto" variant="outlined" required />
                                        </GridItem>
                                        <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                                            <TextField style={{ width: "100%", paddingBottom: "10px" }}
                                                id="description"
                                                onChange={handleChangeProduct} value={product.description} name="description"
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
                                    : <span></span>}
                                {step === 2 ?
                                    <GridItem xs={12} sm={12} md={12}>

                                        <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={handleChangeCheckBox} value={product.dropshipping} name="dropshipping"
                                                        color="primary"
                                                    />
                                                }
                                                label="¿Es producto dropshipping?"
                                            />
                                        </GridItem>
                                        {product.dropshipping ?
                                            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                                                <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                                                    <InputLabel htmlFor="valor">Precio a distribuidor</InputLabel>
                                                    <OutlinedInput
                                                        onChange={handleChangeProduct} value={product.dropshippingPrice} name="dropshippingPrice"
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
                                                    onChange={handleChangeProduct} value={product.amount} name="amount"
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
                                        <GridItem xs={12} sm={12} md={12} >
                                            <FormControl style={{ width: "100%", backgroundColor: "white" }} variant="outlined" className={classes.formControl}>
                                                <InputLabel htmlFor="outlined-age-native-simple">Categoría de producto</InputLabel>
                                                <Select
                                                    native
                                                    onChange={handleChangeProduct} value={product.category} name="category"
                                                    label="Categoría producto"
                                                    inputProps={{
                                                        name: 'category',
                                                        id: 'category'
                                                    }}

                                                >

                                                    <option aria-label="None" value="" />
                                                    <option value="1">Mascotas</option>
                                                    <option value="2">Tecnología</option>
                                                    <option value="3">Hogar</option>
                                                    <option value="4">Niños</option>
                                                    <option value="5">Estilo de vida</option>
                                                    <option value="6">Alimentos</option>
                                                    <option value="7">Belleza</option>
                                                    <option value="8">Otros</option>

                                                </Select>
                                            </FormControl>
                                        </GridItem>
                                        <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={handleChangeCheckBox} value={product.specialFeatures} name="specialFeatures"
                                                        color="primary"
                                                    />
                                                }
                                                label="¿Este producto tiene características especiales (color, talla, etc)?"
                                            />
                                        </GridItem>
                                    </GridItem>
                                    : <span></span>}
                                {step === 3 ?
                                    branch.map((row) => (
                                        <GridContainer>
                                            <GridItem xs={12} sm={12} md={12}>
                                                <h5>Ingresa el inventario para cada bodega</h5>
                                            </GridItem>
                                            <GridItem xs={6} sm={6} md={6} style={{ "text-align": "center", "padding-top": "10px" }}>
                                                <label style={{ "font-size": "1.5em", "font-weight": "bold" }}>{row.name}:</label>
                                            </GridItem>
                                            <GridItem xs={6} sm={6} md={6}>
                                                <TextField inputProps={{ min: 0, id: row.id }} type="number" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Inventario" variant="outlined" required />
                                            </GridItem>
                                        </GridContainer>
                                    ))
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