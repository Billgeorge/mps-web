import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import styles from "assets/jss/material-kit-react/views/checkout.js";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import {getQueyParamFromUrl} from 'util/UrlUtil'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import {consumeServiceGet,consumeServicePut} from 'service/ConsumeService'
import {CORE_BASEURL} from 'constant/index'
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles(styles);
export default function EditCustomer(props) {

    const classes = useStyles();
    const history = useHistory();
    const [citiesResponse, SetCitiesResponse] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [states, setStates] = React.useState([]);    
       
    const [customer, setCustomer] = React.useState({
        department:"",
        city:"",
        name:"",
        address:"",
        email:"",
        contactNumber:"",        
        neighborhood:""
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [infoMessage, setInfoMessage] = React.useState("");


    const callBackErrorGetCities = () => {
        setErrorMessage("Error obteniendo ciudades")        
    }

    const callBackErrorGetCustomer = () => {
        setErrorMessage("Error obteniendo información de cliente")        
    }

    const handleChange = (event) => {
        setErrorMessage("")
        const name = event.target.name;
        setCustomer({
          ...customer,
          [name]: event.target.value,
        });
    };

    const confirmOrder = () => {
        setErrorMessage("")         
        
        if(!customer.name){
            setErrorMessage("Nombre es obligatorio")
            return
        }

        if(!customer.neighborhood){
            setErrorMessage("Barrio es obligatorio")
            return
        }

        if(!customer.city){
            setErrorMessage("Ciudad es obligatorio")
            return
        }

        if(!customer.department){
            setErrorMessage("Departamento es obligatorio")
            return
        }

        if(!customer.contactNumber){
            setErrorMessage("Número celular es obligatorio")
            return
        }

        if(!customer.address){
            setErrorMessage("Dirección es obligatorio")
            return
        }
        setIsLoading(true)
        const url = `${CORE_BASEURL}/order/public`
                   
        let request = {
            id: getQueyParamFromUrl("id"),            
            customer : {
                name:customer.name,
                email:customer.email,
                contactNumber:customer.contactNumber,
                address:customer.address,
                city:customer.city,
                neighborhood: customer.neighborhood,
                department:customer.department
            }
        }
        consumeServicePut(request,callBackErrorCreateOrder, callBackSuccess,url)
    }

    const callBackErrorCreateOrder = () => {
        setIsLoading(false)
        setErrorMessage("Error creando orden")        
    }

    const callBackSuccess=()=>{
        history.push("/thanks-page")        
    }

 
    const handleChangeState = (event) => {
        var sel = document.getElementById("deparment-select");
        let value = sel.options[sel.selectedIndex].text
        console.log("value",event.target.name)
        let newCities = citiesResponse.filter(record=> record.state == value)
        setCustomer({
            ...customer,
            city: ""
          })
        setCities(newCities)        
        setErrorMessage("")
        const name = event.target.name;
        setCustomer({
          ...customer,          
          [name]: event.target.value          
        });       
    }

    const handleChangeCity = (event) => {
        const name = event.target.name;        
        setCustomer({
          ...customer,
          [name]: event.target.value,
        });       
    }

    const callBackSuccessGetCities = (cities) => {
        setCities(cities)
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
        setStates(states)
        getCustomerInfo()
    }

    const callBackSuccessGetCustomerInfo = (customer) => {
        console.log("deparment",customer.department)        
        setCustomer(customer)        
    }

    const getCities = () => {
        const url = `${CORE_BASEURL}/logistic/cities`
        consumeServiceGet(callBackErrorGetCities,callBackSuccessGetCities,url)
    }

    const getCustomerInfo = () => {
        const id = getQueyParamFromUrl("id")
        const url = `${CORE_BASEURL}/customer/order/${id}`
        consumeServiceGet(callBackErrorGetCustomer,callBackSuccessGetCustomerInfo,url)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      })

    React.useEffect(() => { getCities()  }, []);

    return(
    <GridContainer className={classes.container} >                
        <GridItem xs={12} sm={12} md={12} className= {classes.rightSide}>
        <h3 className={classes.shopName}>Información de entrega</h3>
        <h6>Por favor revisa la información que ingresaste en tu pedido. Si todo esta correcto presiona el botón confirmar pedido. Si ingresaste algún dato mal,
            corrigelo y después presiona el botón confirmar pedido
        </h6>
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
                    <TextField onChange={handleChange} value={customer.name} name="name" style={{width:"98%", backgroundColor:"white"}}  id="outlined-basic" label="Nombre completo" variant="outlined" required />                    
                </GridItem>                    
            </GridContainer>

            <GridContainer justify="center" style={{marginTop:"10px"}}>                                             
                <GridItem xs={12} sm={12} md={12} >
                <FormControl style={{width:"50%", backgroundColor:"white"}} variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="deparment-select">Departamento</InputLabel>
                    <Select
                    native
                    value={customer.department}
                    onChange={handleChangeState}
                    label="Departamento"
                    inputProps={{
                        name: 'department',
                        id: 'deparment-select',
                    }}
                    
                    >
                        
                    <option aria-label="None" value="" />
                    {
                            states.map(function (state) {
                                return <option key={state} value={state.toLowerCase()}>{state}</option>;
                            })
                    }
                    </Select>
                    </FormControl>
                    
                    <FormControl style={{width:"48%", backgroundColor:"white"}} variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Ciudad</InputLabel>
                    <Select
                    native
                    value={customer.city}
                    onChange={handleChangeCity}
                    label="Ciudad"
                    inputProps={{
                        name: 'city',
                        id: 'outlined-age-native-simple',
                    }}
                    >
                        <option aria-label="None" value="" />
                        {
                            cities.map(function (item) {
                                return <option key={item.code} value={item.code }>{item.city}</option>;
                            })
                        }
                    </Select>
                    </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:"10px"}}>
                    <TextField onChange={handleChange} name="address" value={customer.address} style={{width:"98%", backgroundColor:"white"}} placeholder="Ejemplo: calle 34 # 1w-88 conjunto glacial torre 4 apto 303" id="outlined-basic" label="Dirección completa" variant="outlined" required/>                
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:"10px"}}>
                    <TextField onChange={handleChange} name="neighborhood" value={customer.neighborhood} style={{width:"98%", backgroundColor:"white"}} placeholder="Barrio" id="outlined-basic" label="Barrio" variant="outlined" required/>                
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:"10px"}}>
                    <TextField  onChange={handleChange} type="email" name="email" value={customer.email} style={{width:"98%", backgroundColor:"white"}}  id="outlined-basic" placeholder="tuemail@email.com" label="Correo electrónico" variant="outlined" required />
                </GridItem>
                <GridItem xs={12} sm={12} md={12} style={{marginTop:"10px"}}>
                    <TextField  onChange={handleChange} type ="number" name="contactNumber" value={customer.contactNumber} style={{width:"98%", backgroundColor:"white"}}  id="outlined-basic" label="Número de celular" variant="outlined" required/>
                </GridItem>                   
                { infoMessage!=""
                ?<GridItem xs={12} sm={12} md={12} ><Alert severity="success">{infoMessage}</Alert></GridItem>:<span></span>   
                }                
            </GridContainer>
            
            <br/>
            
            <Button onClick={confirmOrder} className={classes.buttonText}  color="success" size="lg">
                      Confirmar Pedido
            </Button>            
        </GridItem>          
    </GridContainer>
    )

}