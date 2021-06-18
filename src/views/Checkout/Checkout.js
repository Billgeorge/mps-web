import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import styles from "assets/jss/material-kit-react/views/checkout.js";
import Button from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import {getQueyParamFromUrl} from 'util/UrlUtil'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import GroupedButtons from 'views/Components/Numeric'
import Alert from '@material-ui/lab/Alert';
import {consumeServiceGet} from 'service/ConsumeService'
import consumeServicePost from 'service/ConsumeService'
import {CORE_BASEURL,PULL_BASEURL} from 'constant/index'
import { useHistory } from "react-router-dom";
import {getFirstLetters} from 'util/NameUtils'
import CircularProgress from '@material-ui/core/CircularProgress';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';




const useStyles = makeStyles(styles);
export default function Checkout() {

    const classes = useStyles();
    const history = useHistory();
    const [citiesResponse, SetCitiesResponse] = React.useState([]);
    const [cities, SetCities] = React.useState([]);
    const [paymentMethod, setPaymentMethod] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [states, SetStates] = React.useState([]);
    const [product, setProduct] = React.useState({
        productName:"",
        productDescription:"",
        sellerMerchantName:"",
        imageURL:"",
        amount:0
    });
    const [order, setOrder] = React.useState({
        state:"",
        city:"",
        name:"",
        address:"",
        email:"",
        contactNumber:"",
        quantity:1,        
        productId:"",
        amount:"",
        neighborhood:""
    });
    const [errorMessage, setErrorMessage] = React.useState("");


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

    const handleChangeQuantity = (quantity) => {
        setErrorMessage("")        
        setOrder({
          ...order,
          quantity:quantity
        });
    };

    const createOrder = (paymentMethod) => {
        setErrorMessage("") 
        setPaymentMethod(paymentMethod)
        
        if(!order.name){
            setErrorMessage("Nombre es obligatorio")
            return
        }

        if(!order.neighborhood){
            setErrorMessage("Barrio es obligatorio")
            return
        }

        if(!order.city){
            setErrorMessage("Ciudad es obligatorio")
            return
        }

        if(!order.state){
            setErrorMessage("Departamento es obligatorio")
            return
        }

        if(!order.contactNumber){
            setErrorMessage("Número celular es obligatorio")
            return
        }

        if(!order.address){
            setErrorMessage("Dirección es obligatorio")
            return
        }
        setIsLoading(true)
        const url = `${CORE_BASEURL}/checkout/order`            
        let request = {
            productId: getQueyParamFromUrl("idc"),
            paymentMethod:paymentMethod,
            quantity: order.quantity,
            amount:order.quantity*product.amount,
            customer : {
                name:order.name,
                email:order.email,
                contactNumber:order.contactNumber,
                address:order.address,
                city:order.city,
                neighborhood: order.neighborhood,
                department:order.state
            },
            isDrop: true
        }
        consumeServicePost(request,callBackErrorCreateOrder, callBackSuccess,url)
    }

    const callBackErrorCreateOrder = () => {
        setIsLoading(false)
        setErrorMessage("Error creando orden")        
    }

    const createOrderCOD= () => {       
        createOrder("COD")
    }

    const callBackSuccess=(order)=>{
        if(order.paymentMethod=="COD"){
            history.push("/thanks-page")
        }else{
            const url = `${PULL_BASEURL}/cashin/redirect`
            consumeServicePost({id:order},callBackErrorCreateOrder,callBackSuccessGetPaymentInformation,url)
        }
    }

    const callBackSuccessGetPaymentInformation = (paymentInformation) => {   
        history.push("/methods?id="+paymentInformation.id)
      }

    const createOrderMPS= () => {       
        createOrder("MPS")
    }

    const handleChangeState = (event) => {
        let value = event.target.value
        let newCities = citiesResponse.filter(record=> record.state == value)
        setOrder({
            ...order,
            city: "",
          })
        SetCities(newCities)        
        setErrorMessage("")
        const name = event.target.name;
        setOrder({
          ...order,
          city: "",
          [name]: event.target.value,
        });       
    }

    const callBackSuccessGetCities = (cities) => {
        SetCities(cities)
        SetCitiesResponse(cities)
        let states = []
        cities.forEach(record=>{
            {
                let actualState = record.state
                let exist= false
                states.forEach(state=>{
                    if(state==actualState){
                        exist=true
                    }
                })
                if(!exist){
                    states.push(actualState)
                }
            }
        })
        SetStates(states)
    }

    const callBackSuccessGetProductInfo = (product) => {
        setProduct(product)
        getCities()
    }

    const getCities = () => {
        const url = `${CORE_BASEURL}/logistic/cities`
        consumeServiceGet(callBackErrorGetCities,callBackSuccessGetCities,url)
    }

    const getProductInformation = () => {
        const id = getQueyParamFromUrl("idc")
        const url = `${CORE_BASEURL}/dropshippingsale/public/view/checkout/${id}`
        consumeServiceGet(callBackErrorGetProduct,callBackSuccessGetProductInfo,url)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      })

    React.useEffect(() => { getProductInformation()  }, []);


    return(
    <GridContainer className={classes.container} >
        <GridItem className={classes.sideSection} xs={12} sm={12} md={6}>
            <GridItem xs={12} sm={12} md={12} style={{display: "flex"}} >
                <Button
                href=""
                color="transparent"
                target="_blank"
                style={{padding:"0"}}
                className={classes.navLink}          
                >          
                    <Avatar style={{backgroundColor: "rgb(29 143 210)"}} >
                                {getFirstLetters(product.sellerMerchantName)}
                    </Avatar>
                                        
                </Button>
            <h3 className={classes.shopName}>{product.sellerMerchantName}</h3>    
            </GridItem> 
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
            <h3 className={classes.shopName}>{product.productName}</h3>
            <div className={classes.totalPrice}><span>{formatter.format(product.amount)} domicilio gratis</span></div><br/>
                <img src={product.imageURL} className={classes.imgProduct} />                                
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                <div className={classes.productDescription}> {product.productDescription}</div>                

            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <div className={classes.detailTitle}><span>Detalle de compra</span></div>
                <br/>
                <div><span>Item 1 ...........................$25.000</span></div>
                <div><span>Item 2 ...........................$25.000</span></div>
                <div><span>Valor Transporte..........$5.000</span></div>
                <br/>
                <div className={classes.totalPrice}><span>$35.000</span></div><br/>
            </GridItem >
            <Divider/>
            <GridContainer>
            <h3 className={classes.shopName}>Información de contacto</h3>    
            <br/>   
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField id="outlined-basic" label="Correo Electrónico" variant="outlined" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField id="outlined-basic" label="Nombre Completo" variant="outlined" />
                    </GridItem>
                </GridContainer>
                <GridContainer style={{marginTop:"10px"}}>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField id="outlined-basic" label="Dirección Completa" variant="outlined" />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField id="outlined-basic" label="Número de contacto" variant="outlined" />
                </GridItem>                
                </GridContainer>
                <GridContainer style={{marginTop:"10px"}}>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField id="outlined-basic" label="Departamento" variant="outlined" />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <TextField id="outlined-basic" label="Municipío" variant="outlined" />
                </GridItem>                
                </GridContainer>

            </GridContainer>
            
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

            <Button onClick={createOrderCOD} className={classes.buttonText}  color="success" size="lg">
                      Pagar {formatter.format(product.amount*order.quantity)} con contraentrega
            </Button>
            <Button onClick={createOrderMPS} className={classes.buttonText} color="success" size="lg">
                      Pagar {formatter.format(product.amount*order.quantity)} con pse

            </Button>    
        </GridItem>        
    </GridContainer>
    )

}