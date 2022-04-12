import React from "react";

import { connect } from 'react-redux'
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import styles from "assets/jss/material-kit-react/views/checkout.js";
import Button from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { getQueyParamFromUrl } from 'util/UrlUtil'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import GroupedButtons from 'views/Components/Numeric'
import Alert from '@material-ui/lab/Alert';
import { consumeServiceGet } from 'service/ConsumeService'
import { setFbPixel, setValue } from 'actions/actions'
import consumeServicePost from 'service/ConsumeService'
import { CORE_BASEURL, PULL_BASEURL } from 'constant/index'
import { useHistory } from "react-router-dom";
import { getFirstLetters } from 'util/NameUtils'
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactPixel from 'react-facebook-pixel';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'


const useStyles = makeStyles(styles);
function Checkout(props) {

    const classes = useStyles();
    const history = useHistory();
    const [citiesResponse, SetCitiesResponse] = React.useState([]);
    const [cities, SetCities] = React.useState([]);
    const [paymentMethod, setPaymentMethod] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [states, SetStates] = React.useState([]);
    const [totalPrice, setTotalPrice] = React.useState(null);
    const [customFields, setCustomFields] = React.useState([])
    const [customFieldsCols, setCustomFieldsCols] = React.useState(0)
    const [existCOD, setExistCOD] = React.useState(true);


    const [product, setProduct] = React.useState({
        productName: "",
        productDescription: "",
        sellerMerchantName: "",
        imageURL: "",
        amount: 0,
        specialConditions: false,
        discounts: [],
        variants: []

    });


    const [order, setOrder] = React.useState({
        state: "",
        city: "",
        name: "",
        address: "",
        email: "",
        contactNumber: "",
        quantity: 1,
        productId: "",
        amount: "",
        neighborhood: "",
        observations: ""
    });


    const [errorMessage, setErrorMessage] = React.useState("");
    const [infoMessage, setInfoMessage] = React.useState("");
    const [carItems, setCartItems] = React.useState([]);
    const [carQuantity, setCarQuantity] = React.useState(0);


    const callBackErrorGetCities = () => {
        setErrorMessage("Error obteniendo ciudades")
    }

    const callBackErrorGetProduct = () => {
        setErrorMessage("Error obteniendo información de producto")
    }

    const handleChange = (event) => {
        setErrorMessage("")
        const name = event.target.name;
        setOrder({
            ...order,
            [name]: event.target.value,
        });
    };

    const handleChangeQuantity = (quantity, isInternal) => {
        setErrorMessage("")
        if (isInternal) {
            setCarQuantity(quantity)
        } else {
            setOrder({
                ...order,
                quantity: quantity
            });
        }
        validateDiscount(quantity)
    };

    const validateDiscount = (quantity) => {
        let discountRule = product.discounts.filter(function (el) {
            return el.quantity === quantity;
        });
        if (discountRule.length > 0) {
            setTotalPrice(discountRule[0].finalPrice)
        } else {
            setTotalPrice(null)
        }
    }

    const createOrder = (paymentMethod) => {

        setErrorMessage("")
        let products = null
        setPaymentMethod(paymentMethod)
        let totalOrderPrice = totalPrice ? totalPrice : product.amount * order.quantity
        let finalQuantity = order.quantity

        if (product.isMaster && product.variants && product.variants.length > 0) {

            if (carItems.length === 0) {
                setErrorMessage("Debe agregar productos")
                return
            }
            totalOrderPrice = carItems.reduce(
                function (prev, curr, index, vec) {
                    return prev + curr.price
                }, 0
            )
            finalQuantity = carQuantity
            products = getProductList()
        }

        if (isLoading) {
            return
        }

        if (!order.name) {
            setErrorMessage("Nombre es obligatorio")
            return
        }

        if (!order.neighborhood) {
            setErrorMessage("Barrio es obligatorio")
            return
        }

        if (!order.city) {
            setErrorMessage("Ciudad es obligatorio")
            return
        }

        if (product.specialConditions && !order.observations) {
            setErrorMessage("Tu producto requiere que indiques color, talla o alguna condición especial. Colocalo en observaciones")
            return
        }

        if (!order.state) {
            setErrorMessage("Departamento es obligatorio")
            return
        }

        if (!order.contactNumber) {
            setErrorMessage("Número celular es obligatorio")
            return
        }

        if (!order.address) {
            setErrorMessage("Dirección es obligatorio")
            return
        }
        setIsLoading(true)
        const url = `${CORE_BASEURL}/checkout/order`

        props.setValue(totalOrderPrice)
        let request = {
            productId: getQueyParamFromUrl("idc"),
            paymentMethod: paymentMethod,
            quantity: finalQuantity,
            amount: totalOrderPrice,
            customer: {
                name: order.name,
                email: order.email,
                contactNumber: order.contactNumber,
                address: order.address,
                city: order.city,
                neighborhood: order.neighborhood,
                department: order.state
            },
            isDrop: true,
            observations: order.observations,
            orderItems: { items: products }
        }
        consumeServicePost(request, callBackErrorCreateOrder, callBackSuccess, url)
    }

    const getProductList = () => {
        let products = []
        let carItemsJson = carItems.map(
            (item) => {
                return {
                    ...item,
                    attributes: JSON.parse("{" + item.attr + "}")
                }
            }
        )
        let variants = product.variants.map(
            (item) => {
                return {
                    ...item,
                    attributes: JSON.parse(item.attributes.replaceAll("'", '"'))
                }
            }
        )

        carItemsJson.forEach(
            (item) => {
                let product = variants.find(variant => _.isEqual(item.attributes, variant.attributes))
                products.push({
                    quantity: item.quantity,
                    productId: product.productId
                })
            }
        )


        console.log(carItemsJson)
        console.log(variants)
        console.log(products)
        return products
    }

    const callBackErrorCreateOrder = () => {
        setIsLoading(false)
        setErrorMessage("Error creando orden")
    }

    const createOrderCOD = () => {
        createOrder("COD")
    }

    const callBackSuccess = (order) => {
        if (order.paymentMethod == "COD") {
            history.push("/thanks-page?cod=true")
        } else {
            const url = `${PULL_BASEURL}/cashin/redirect`
            consumeServicePost({ id: order }, callBackErrorCreateOrder, callBackSuccessGetPaymentInformation, url)
        }
    }

    const callBackSuccessGetPaymentInformation = (paymentInformation) => {
        history.push("/methods?id=" + paymentInformation.id)
    }

    const createOrderMPS = () => {
        createOrder("MPS")
    }

    const handleChangeState = (event) => {
        let value = event.target.value
        let newCities = citiesResponse.filter(record => record.state.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() == value)
        setOrder({
            ...order,
            city: "",
        })
        console.log("cities ", newCities)
        SetCities(newCities)
        setErrorMessage("")
        const name = event.target.name;
        setOrder({
            ...order,
            city: "",
            [name]: event.target.value,
        });
    }

    const handleChangeCity = (event) => {
        let value = event.target.value
        let selectedCity = citiesResponse.filter(record => record.code == value)
        if (selectedCity[0].againstDelivery === 'INACTIVE') {
            setExistCOD(false)
            setInfoMessage("Aunque no hay contraentrega en tu destino. Puedes pagar con nuestro servicio de custodía de pagos y el dinero no será entregado al vendedor hasta que recibas tu pedido. Usar el botón: Pagar Online con custodía digital.")
        } else {
            setInfoMessage("")
            setExistCOD(true)
        }
        const name = event.target.name;
        setOrder({
            ...order,
            [name]: event.target.value,
        });
    }

    const callBackSuccessGetCities = (cities) => {
        SetCities(cities)
        SetCitiesResponse(cities)
        let states = new Set()
        cities.forEach(record => {
            {
                let actualState = record.state.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                let exist = false
                states.forEach(state => {
                    if (state == actualState) {
                        exist = true
                    }
                })
                if (!exist) {
                    states.add(actualState)
                }
            }
        })
        SetStates(Array.from(states))
    }

    const callBackSuccessGetProductInfo = (product) => {
        if (product.fbId) {
            ReactPixel.init(product.fbId);
            props.setFbPixel(product.fbId)
            ReactPixel.fbq('track', 'InitiateCheckout');
        }
        setProduct(product)
        renderVariants(product.variants)
        getCities()
    }

    const renderVariants = (variants) => {
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

    const getCities = () => {
        const url = `${CORE_BASEURL}/logistic/cities`
        consumeServiceGet(callBackErrorGetCities, callBackSuccessGetCities, url)
    }

    const getProductInformation = () => {
        const id = getQueyParamFromUrl("idc")
        const url = `${CORE_BASEURL}/dropshippingsale/public/view/checkout/${id}`
        consumeServiceGet(callBackErrorGetProduct, callBackSuccessGetProductInfo, url)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const addCartItem = () => {
        let len = customFields.length
        let label = order.quantity
        let attr = ""
        for (let i = 0; i < len; i++) {
            if (attr) {
                attr = `${attr}, "${document.getElementById(i).name}":"${document.getElementById(i).value}" `
            } else {
                attr = `"${document.getElementById(i).name}":"${document.getElementById(i).value}"`
            }

            label = `${label} ${document.getElementById(i).name}: ${document.getElementById(i).value}`
        }
        let finalPrice = product.amount * order.quantity
        let finalItems = newOrExistingCartItem(attr, label, finalPrice)
        updateQuantity(finalItems)
        console.log(finalItems)
    }

    const updateQuantity = (localItems) => {
        const totalQuantity = localItems.reduce(
            function (prev, curr, index, vec) {
                return prev + curr.quantity
            }, 0
        )
        handleChangeQuantity(totalQuantity, true)
    }

    const deleteItem = (attr) => {
        let index = -1
        for (var i = 0; i < carItems.length; i++) {
            if (carItems[i].attr === attr) {
                index = i
            }
        }
        let localItems = carItems
        localItems.splice(index, 1)
        updateQuantity(localItems)
        setCartItems(localItems)
    }

    const newOrExistingCartItem = (attr, newLabel, finalPrice) => {

        let existingItem = false
        const localItems = carItems
        for (var i = 0; i < localItems.length; i++) {
            if (localItems[i].attr === attr) {
                existingItem = true
                localItems[i].label = newLabel
                localItems[i].price = finalPrice
                localItems[i].quantity = order.quantity
            }
        }
        if (!existingItem) {
            setCartItems([...carItems, {
                label: newLabel,
                attr: attr,
                price: finalPrice,
                quantity: order.quantity
            }])
            localItems.push({
                label: newLabel,
                attr: attr,
                price: finalPrice,
                quantity: order.quantity
            })
        } else {
            setCartItems(localItems)
        }
        return localItems

    }

    React.useEffect(() => { getProductInformation() }, []);

    return (
        <GridContainer className={classes.container} >
            <GridItem className={classes.sideSection} xs={12} sm={12} md={6} style={{ backgroundColor: "rgb(204 204 204 / 22%)" }}>
                <GridItem xs={12} sm={12} md={12} style={{ display: "flex" }} >
                    <Button
                        href=""
                        color="transparent"
                        target="_blank"
                        style={{ padding: "0" }}
                        className={classes.navLink}
                    >
                        <Avatar style={{ backgroundColor: "rgb(29 143 210)" }} >
                            {getFirstLetters(product.sellerMerchantName)}
                        </Avatar>

                    </Button>
                    <h3 className={classes.shopName}>{product.sellerMerchantName}</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                    <h3 className={classes.shopName}>{product.productName}</h3>
                    <div className={classes.totalPrice}><span>{formatter.format(product.amount)} domicilio gratis</span></div><br />
                    <img src={product.imageURL} alt={product.productName} className={classes.imgProduct} />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                    <div className={classes.productDescription}> {product.productDescription}</div>
                </GridItem>
                {product.warranty && product.warranty !== "" ?
                    <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                        <div className={classes.productDescription}> {product.warranty}</div>
                    </GridItem> : <></>
                }

            </GridItem>
            <GridItem xs={12} sm={12} md={6} className={classes.rightSide}>
                <h3 className={classes.shopName}>Información de entrega</h3>
                <br />
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <TextField onChange={handleChange} value={order.name} name="name" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Nombre completo" variant="outlined" required />
                    </GridItem>
                </GridContainer>

                <GridContainer justify="center" style={{ marginTop: "10px" }}>
                    <GridItem xs={12} sm={12} md={12} >
                        <FormControl style={{ width: "50%", backgroundColor: "white" }} variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Departamento</InputLabel>
                            <Select
                                native
                                value={order.state}
                                onChange={handleChangeState}
                                label="Departamento"
                                inputProps={{
                                    name: 'state',
                                    id: 'outlined-age-native-simple',
                                }}

                            >

                                <option aria-label="None" value="" />
                                {
                                    states.sort(
                                        function (a, b) {
                                            if (a < b) {
                                                return -1;
                                            }
                                            if (b < a) {
                                                return 1;
                                            }
                                            return 0;
                                        }
                                    ).map(function (state) {
                                        return <option value={state}>{state.replace(/^./, (str) => {
                                            return str.toUpperCase();
                                        })}</option>;
                                    })
                                }
                            </Select>
                        </FormControl>

                        <FormControl style={{ width: "48%", backgroundColor: "white" }} variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">Ciudad</InputLabel>
                            <Select
                                native
                                value={order.city}
                                onChange={handleChangeCity}
                                label="Ciudad"
                                inputProps={{
                                    name: 'city',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {
                                    cities.sort(
                                        function (a, b) {
                                            if (a.city < b.city) {
                                                return -1;
                                            }
                                            if (b.city < a.city) {
                                                return 1;
                                            }
                                            return 0;
                                        }
                                    ).map(function (item) {
                                        return <option value={item.code}>{item.city.toLowerCase().replace(/^./, (str) => {
                                            return str.toUpperCase();
                                        })}</option>;
                                    })
                                }
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "10px" }}>
                        <TextField onChange={handleChange} name="address" value={order.address} style={{ width: "98%", backgroundColor: "white" }} placeholder="Ejemplo: calle 34 # 1w-88 conjunto glacial torre 4 apto 303" id="outlined-basic" label="Dirección completa" variant="outlined" required />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "10px" }}>
                        <TextField onChange={handleChange} name="neighborhood" value={order.neighborhood} style={{ width: "98%", backgroundColor: "white" }} placeholder="Barrio" id="outlined-basic" label="Barrio" variant="outlined" required />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "10px" }}>
                        <TextField onChange={handleChange} type="email" name="email" value={order.email} style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" placeholder="tuemail@email.com" label="Correo electrónico" variant="outlined" required />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "10px" }}>
                        <TextField onChange={handleChange} type="number" name="contactNumber" value={order.contactNumber} style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Número de celular" variant="outlined" required />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{ marginTop: "10px" }}>
                        <FormControl style={{ width: "100%" }}>
                            <TextField
                                id="observations"
                                name="observations"
                                label="Observaciones del pedido"
                                multiline
                                rows={4}
                                placeholder="Por favor usa este espacio para cualquier información adicional requerida"
                                variant="outlined"
                                inputProps={{ maxLength: 1000 }}
                                onChange={handleChange} value={order.observations}
                            />
                        </FormControl>
                    </GridItem>
                    {infoMessage != ""
                        ? <GridItem xs={12} sm={12} md={12} ><Alert severity="success">{infoMessage}</Alert></GridItem> : <span></span>
                    }
                    {errorMessage != ""
                        ? <GridItem xs={12} sm={12} md={12} ><Alert severity="error">{errorMessage}</Alert></GridItem> : <span></span>
                    }
                    {isLoading
                        ? <GridItem xs={12} sm={12} md={12}><center><CircularProgress /></center></GridItem>
                        : <span></span>
                    }
                </GridContainer>

                <br />
                {customFields && customFields.length > 0 ?
                    <GridContainer justify="center">
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
                <GridContainer justify="center" style={{ marginTop: "30px", marginBottom: "30px" }}>
                    <GridItem justify="center" style={{ textAlign: 'center', marginTop: '4px' }} xs={6} sm={6} md={6} className={classes.detailText}> Cantidad </GridItem>
                    <GridItem justify="center" style={{ margin: "0 auto" }} xs={6} sm={6} md={6}>
                        <GroupedButtons callback={handleChangeQuantity} ></GroupedButtons>
                    </GridItem>
                </GridContainer>
                {customFields && customFields.length > 0 ?
                    <GridItem xs={12} sm={12} md={12}>
                        <Button onClick={addCartItem} className={classes.buttonText} color="success" size="sm">Agregar</Button>
                    </GridItem>
                    : <></>
                }
                <br />
                {(product.isMaster && product.variants && product.variants.length > 0) ? <>
                    <h3 className={classes.shopName}>Tu pedido</h3>
                    <GridContainer justify="center">
                        {carItems.map(
                            function (item) {
                                return <>
                                    <GridItem xs={4} sm={4} md={4}>
                                        <h4 className={classes.shopName}>{item.label}</h4>
                                    </GridItem>
                                    <GridItem style={{ "display": "flex", "alignItems": "center" }} xs={4} sm={4} md={4}>
                                        <h4 className={classes.shopName}>{formatter.format(item.price)}</h4>
                                    </GridItem>
                                    <GridItem style={{ "display": "flex", "alignItems": "center" }} xs={4} sm={4} md={4}>
                                        <IconButton onClick={() => { deleteItem(item.attr) }} style={{ "color": "#01015a" }} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </GridItem>
                                </>
                            }
                        )}
                    </GridContainer>
                </> : <></>
                }
                <br /> <br />
                <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                    <span>Al realizar la compra estás aceptando nuestros <a href="https://www.eikoos.com/terminos-y-condiciones/" target="_blank">términos y condiciones</a></span>
                </GridItem>
                <Button onClick={createOrderMPS} style={{ fontSize: "1.07em", fontWeight: "900", backgroundColor: "#3636c3" }} className={classes.buttonText} color="success" size="lg">
                    Pagar Online {formatter.format(totalPrice ? totalPrice : product.amount * (carQuantity > 0 ? carQuantity : order.quantity))} con custodía digital
                </Button>
                <br />
                {existCOD ?
                    <Button onClick={createOrderCOD} className={classes.buttonText} color="success" size="lg">
                        Pagar {formatter.format(totalPrice ? totalPrice : product.amount * (carQuantity > 0 ? carQuantity : order.quantity))} con contraentrega
                    </Button> : <></>}


            </GridItem>
        </GridContainer>
    )

}

const mapDispatchToProps = {
    setFbPixel, setValue
}

export default connect(null, mapDispatchToProps)(Checkout);