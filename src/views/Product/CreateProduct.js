import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {getMerchantId} from 'service/AuthenticationService'

import styles from "assets/jss/material-kit-react/views/createPayment.js";

import InputAdornment from '@material-ui/core/InputAdornment';
import consumeServicePost from '../../service/ConsumeService'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import {CORE_BASEURL} from 'constant/index'

const useStyles = makeStyles(styles);

export default function CreateProduct(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");  

  const [errorMessage, setErrorMessage] = React.useState({});

  const [successMessage, setSuccessMessage] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const [dropshipping, setDropshipping] = React.useState(false);
  
  const handleChange = (event) => {
    setDropshipping(event.target.value);
  };

  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  React.useEffect(() => {     
    changeMessageValidation()
  }, []);
  const changeMessageValidation = () =>{
    let file = null
    const imageInput = document.getElementById("imageProfile");

    imageInput.addEventListener('change', (event) => {
      console.log("previous",event.target.files[0])
      file =event.target.files[0]
      console.log("changing",file)
          
    });    
    document.createProduct.onsubmit = function(event){
      setErrorMessage({})
      event.preventDefault()
      const callBack = (error) => {
        if(error!=null){
        setErrorMessage(error)
        }else{
          setErrorMessage({'Error':'Ha ocurrido un error inesperado por favor contactar al administrador'})
        }
        setIsLoading(false)
      }
      const callBackSucess = (response) =>{
        document.getElementById("createProduct").reset();
        setDropshipping(false)
        setSuccessMessage("Producto creado satisfactoriamente.")
        setIsLoading(false)        
      }
      if(file == null || (file!=null && document.getElementById('name').value 
        && document.getElementById('inventory').value
        && document.getElementById('dropshipping').value!=""
      )){
        
        if(document.getElementById('dropshipping').value !="true" || (document.getElementById('dropshipping').value=="true" && document.getElementById('dropshippingPrice').value>0)){
          setSuccessMessage(null)
          setIsLoading(true)
          const imageForm = new FormData()      
          event.preventDefault()
          setErrorMessage({})      
          const form = event.currentTarget;
          let inventory="0"
          if(document.getElementById('inventory').value!=""){
            inventory = document.getElementById('inventory').value
          }
          let dropshippingPrice = null
          if(document.getElementById('dropshippingPrice')!==null){
            dropshippingPrice = document.getElementById('dropshippingPrice').value
          }
          let requestForm = {    
            amount: document.getElementById("valor").value,
            name: document.getElementById('name').value,
            inventory: inventory,
            dropshipping:document.getElementById('dropshipping').value,
            description: document.getElementById("description").value,
            merchantId: getMerchantId(),
            dropshippingPrice: dropshippingPrice
          }
          const json = JSON.stringify(requestForm);
          const blob = new Blob([json], {
          type: 'application/json'
          });
          const data = new FormData();
          data.append("data", blob);
          data.append("image", file);
          consumeServicePost(data,callBack,callBackSucess,`${CORE_BASEURL}/product`)
        }else{
          setErrorMessage(
            {'error':'Si es un producto dropshipping, es obligatorio colocar precio a distribuidor'}
          )
        }
      }else{
        setErrorMessage(
          {'error':'Si seleccionas una imagen, es necesario llenar todas las entradas'}
        )
      }      
    }
    let htmlInputs = document.forms["createProduct"].getElementsByTagName("input");
    console.log(htmlInputs)
    for(let input of htmlInputs){
      console.log(input.item)
     input.oninvalid = function(e) {
        e.target.setCustomValidity("Este campo es obligatorio o invalido");
    }
    input.oninput = function(e) {
      e.target.setCustomValidity("");
  };
    }    
  }
  return (
    
    <div>
      <ResponsiveDrawe />
      <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                  <form className={classes.form} validated="true" name="createProduct" id="createProduct">
                        <CardHeader className={classes.cardHeader}>
                            <h3 style={{fontWeight:"600"}}><a href="/product"><ArrowBackIcon /></a> Crear producto nuevo</h3>
                        </CardHeader>                 
                        <CardBody>
                        {isLoading
                                    ? <center> <CircularProgress/></center>
                                    : <span></span>
                        }
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <span >Imagen del producto (al menos 500x500)</span>
                          <Button
                           id="image"
                           color="success"
                            variant="contained"
                            component="label"
                          >
                            Seleccionar imagen
                            <input
                              accept="image/*"
                              type="file"
                              id="imageProfile"                                                            
                              hidden
                            />
                          </Button>
                        </FormControl>
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <InputLabel htmlFor="name">Nombre del producto</InputLabel>
                              <OutlinedInput
                                  id="name"
                                  placeholder="Nombre producto"                            
                                  labelWidth={60}                                  
                              />
                        </FormControl>
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <TextField
                            id="description"
                            label="Descripción"
                            multiline
                            rows={4}
                            placeholder="Características, beneficios y demás del producto"
                            variant="outlined"
                            inputProps={{ maxLength: 1000 }}
                            required
                          />
                        </FormControl>
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <InputLabel htmlFor="inventory">Inventario del producto</InputLabel>
                              <OutlinedInput
                                  id="inventory"
                                  placeholder="Número de unidades"                            
                                  labelWidth={60}                                  
                                  type="number"
                                  min="0"                                 
                              />
                        </FormControl>
                        <FormControl variant="outlined"  style={{width:"100%",paddingBottom:"10px"}}>
                          <InputLabel htmlFor="dropshipping">¿Disponible para que otros lo vendan?</InputLabel>
                          <Select
                            native
                            value= {dropshipping || false}
                            onChange={handleChange}
                            inputProps={{
                              name: 'dropshipping',
                              id: 'dropshipping'
                            }}                            
                          >                           
                            <option value={true}>Si</option>
                            <option value={false}>No</option>                            
                          </Select>
                        </FormControl>
                        {dropshipping=="true"
                          ? <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <InputLabel htmlFor="valor">Precio a distribuidor</InputLabel>
                          <OutlinedInput
                              id="dropshippingPrice"
                              placeholder="Precio para vendedor dropshipping"
                              startAdornment={<InputAdornment position="start">$</InputAdornment>}
                              labelWidth={60}                              
                              type="number"
                          />
                          </FormControl>
                          :<span></span>
                        }
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                            <InputLabel htmlFor="valor">Precio a consumidor</InputLabel>
                            <OutlinedInput
                                id="valor"
                                placeholder="Recuerda tener en cuenta nuestra comisión"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={60}
                                required
                                type="number"
                            />
                        </FormControl>
                        
                      
                    {Object.keys(errorMessage).map((keyName, i) => (
                      <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>    
                    ))}
                    {successMessage
                      ?<Alert severity="success">{successMessage}</Alert> 
                      :<span></span>
                    }
                    
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button color="primary" size="lg" type="submit">
                          Crear Producto
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