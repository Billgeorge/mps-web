import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import styles from "assets/jss/material-kit-react/views/checkout.js";
import Button from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Example from "assets/img/examples/product-1.png"
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import GroupedButtons from 'views/Components/Numeric'
import Alert from '@material-ui/lab/Alert';
import {consumeServiceGet} from 'service/ConsumeService'
import consumeServicePost from 'service/ConsumeService'
import {CORE_BASEURL,PULL_BASEURL} from 'constant/index'
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(styles);
export default function Checkout() {

    const classes = useStyles();
    const history = useHistory();
    const [citiesResponse, SetCitiesResponse] = React.useState([]);
    const [cities, SetCities] = React.useState([]);
    const [paymentMethod, setPaymentMethod] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [states, SetStates] = React.useState([]);
    const [order, setOrder] = React.useState({
        state:"",
        city:"",
        name:"",
        address:"",
        email:"",
        contactNumber:"",
        quantity:1,        
        productId:"fa37ef",
        amount:"50000",
        neighborhood:""
    });
    const [errorMessage, setErrorMessage] = React.useState("");


    const callBackErrorGetCities = () => {
        setErrorMessage("Error obteniendo ciudades")        
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
            productId: order.productId,
            paymentMethod:paymentMethod,
            quantity: order.quantity,
            amount:order.amount,
            customer : {
                name:order.name,
                email:order.email,
                contactNumber:order.contactNumber,
                address:order.address,
                city:order.city,
                neighborhood: order.neighborhood,
                department:order.state
            }
        }
        consumeServicePost(request,callBackErrorCreateOrder, callBackSuccess,url)
    }

    const callBackErrorCreateOrder = () => {
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

    const getCities = () => {
        const url = `${CORE_BASEURL}/logistic/cities`
        consumeServiceGet(callBackErrorGetCities,callBackSuccessGetCities,url)
    }

    React.useEffect(() => { getCities()  }, []);

    return(
    <GridContainer className={classes.container} >
        <GridItem className={classes.sideSection} xs={12} sm={12} md={6} style={{backgroundColor: "rgb(204 204 204 / 22%)"}}>
            <GridItem xs={12} sm={12} md={12} style={{display: "flex"}} >
                <Button
                href=""
                color="transparent"
                target="_blank"
                style={{padding:"0"}}
                className={classes.navLink}          
                >          
                    <Avatar style={{backgroundColor: "rgb(29 143 210)"}} >
                                TP
                    </Avatar>
                                        
                </Button>
                <h3 className={classes.shopName}>Tu Tienda</h3>    
            </GridItem> 
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
            <h3 className={classes.shopName}>Zapatos Aquiles línea</h3>
            <div className={classes.totalPrice}><span>$35.000</span></div><br/>
                <img src={Example} className={classes.imgProduct} />                                
            </GridItem>
            <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                <div className={classes.productDescription}> descripcion de prueba para ver como se ve esta inscripcion a</div>                
            </GridItem>
            <GridContainer justify="center" style={{marginTop:"30px",marginBottom:"30px"}}>
                <GridItem justify="center" xs={6} sm={6} md={6} className={classes.detailText}> Cantidad </GridItem> 
                <GridItem justify="center" style={{ margin:"0 auto"}} xs={6} sm={6} md={6}> <GroupedButtons callback={handleChangeQuantity} counter={1}></GroupedButtons></GridItem>                                        
            </GridContainer>
        </GridItem>             
        <GridItem xs={12} sm={12} md={6} className= {classes.rightSide}>
        <h3 className={classes.shopName}>Información de entrega</h3>
            { errorMessage!=""
                ?<GridItem xs={12} sm={12} md={12} ><Alert severity="error">{errorMessage}</Alert></GridItem>:<span></span>   
            }            
            <br/>
            {isLoading
                                ? <GridItem xs={12} sm={12} md={12}><center><CircularProgress/></center></GridItem>
                                : <span></span>
                    }
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <TextField onChange={handleChange} value={order.name} name="name" style={{width:"98%", backgroundColor:"white"}}  id="outlined-basic" label="Nombre completo" variant="outlined" />                    
                </GridItem>                    
            </GridContainer>

            <GridContainer justify="center" style={{marginTop:"10px"}}>                                             
                <GridItem xs={12} sm={12} md={12} >
                <FormControl style={{width:"50%", backgroundColor:"white"}} variant="outlined" className={classes.formControl}>
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
                            states.map(function (state) {
                                return <option value={state }>{state}</option>;
                            })
                    }
                    </Select>
                    </FormControl>
                    
                    <FormControl style={{width:"48%", backgroundColor:"white"}} variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Ciudad</InputLabel>
                    <Select
                    native
                    value={order.city}
                    onChange={handleChange}
                    label="Ciudad"
                    inputProps={{
                        name: 'city',
                        id: 'outlined-age-native-simple',
                    }}
                    >
                        <option aria-label="None" value="" />
                        {
                            cities.map(function (item) {
                                return <option value={item.code }>{item.city}</option>;
                            })
                        }
                    </Select>
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:"10px"}}>
                    <TextField onChange={handleChange} name="address" value={order.address} style={{width:"98%", backgroundColor:"white"}} placeholder="Ejemplo: calle 34 # 1w-88 conjunto glacial torre 4 apto 303" id="outlined-basic" label="Dirección completa" variant="outlined" />                
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:"10px"}}>
                    <TextField onChange={handleChange} name="neighborhood" value={order.neighborhood} style={{width:"98%", backgroundColor:"white"}} placeholder="Barrio" id="outlined-basic" label="Barrio" variant="outlined" />                
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:"10px"}}>
                    <TextField  onChange={handleChange} type="email" name="email" value={order.email} style={{width:"98%", backgroundColor:"white"}}  id="outlined-basic" placeholder="tuemail@email.com" label="Correo electrónico" variant="outlined" />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:"10px"}}>
                    <TextField  onChange={handleChange} type ="number" name="contactNumber" value={order.contactNumber} style={{width:"98%", backgroundColor:"white"}}  id="outlined-basic" label="Número de celular" variant="outlined" />
                </GridItem>                    
            </GridContainer>
            
            <br/>
            <Button onClick={createOrderCOD} className={classes.buttonText}  color="success" size="lg">
                      Pagar $35.000 con contraentrega
            </Button>
            <Button onClick={createOrderMPS} className={classes.buttonText} color="success" size="lg">
                      Pagar $35.000 con pse
            </Button>    
        </GridItem>          
    </GridContainer>
    )

}