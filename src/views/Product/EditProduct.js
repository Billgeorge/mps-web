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
import {consumeServiceGet} from 'service/ConsumeService'
import {getQueyParamFromUrl} from 'util/UrlUtil'


import styles from "assets/jss/material-kit-react/views/createPayment.js";

import InputAdornment from '@material-ui/core/InputAdornment';
import {consumeServicePatch} from '../../service/ConsumeService'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import {CORE_BASEURL} from 'constant/index'

const useStyles = makeStyles(styles);

export default function EditProduct(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");  

  const [errorMessage, setErrorMessage] = React.useState({});

  const [successMessage, setSuccessMessage] = React.useState(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const [editForm, setEditForm] = React.useState({
      amount:"",
      dropshipping:false,
      inventory: "",
      name:"",
      description:"",
      dropshippingPrice:0
  });
  const handleChange = (event) => {    
    const name = event.target.name;
    setEditForm({
      ...editForm,
      [name]: event.target.value,
    });
  };

  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  React.useEffect(() => {     
    changeMessageValidation()
  }, []);
  const changeMessageValidation = () =>{
    const callBack = (error) => {
        if(error!=null){
        setErrorMessage(error)
        }else{
          setErrorMessage({'Error':'Ha ocurrido un error inesperado por favor contactar al administrador'})
        }
        setIsLoading(false)
    }
    const callBackGetSucess = (response) =>{
        setIsLoading(false)
        setEditForm(response)
    }
    let idp = getQueyParamFromUrl('idp')
    let url=`${CORE_BASEURL}/product/public/${idp}`
    consumeServiceGet(callBack,callBackGetSucess,url)
    document.editProduct.onsubmit = function(event){
      setErrorMessage({})
      event.preventDefault()
      setSuccessMessage(null)
      
      const callBackSucess = () =>{
        setSuccessMessage("Producto editado satisfactoriamente.")
        setIsLoading(false)        
      }

      let inventory="0"
      let dropshippingPrice=null
      if(document.getElementById('inventory').value!=""){
        inventory = document.getElementById('inventory').value
      }
      if(document.getElementById('dropshipping').value=="true" && document.getElementById("dropshippingPrice").value<1){
        setErrorMessage({'Error':'Para un producto dropshipping es obligatorio el precio a distribuidor'})
        return
      }
      if(document.getElementById('dropshipping').value=="true"){
        dropshippingPrice = document.getElementById('dropshippingPrice').value
      }
      
      setIsLoading(true)
       
      consumeServicePatch({
        amount: document.getElementById('valor').value,
        inventory: inventory,
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        dropshipping: document.getElementById('dropshipping').value,
        dropshippingPrice:dropshippingPrice,
        shortId: idp
      },callBack,callBackSucess,`${CORE_BASEURL}/product`)
         
    }
    const loadMessagesInput = () =>{
        let htmlInputs = document.forms["editProduct"].getElementsByTagName("input");
        let htmlTextArea = document.forms["editProduct"].getElementsByTagName("textarea");
        console.log(htmlInputs)

        for(let input of htmlTextArea){
            console.log(input.item)
            input.oninvalid = function(e) {
                e.target.setCustomValidity("Este campo es obligatorio o invalido");
            }
        }
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
    loadMessagesInput()        
  }
  return (
    
    <div>
      <ResponsiveDrawe />
      <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                  <form className={classes.form} validated="true" name="editProduct" id="editProduct">
                        <CardHeader className={classes.cardHeader}>
                            <h3 style={{fontWeight:"600"}}><a href="/product"><ArrowBackIcon /></a> Editar producto</h3>
                        </CardHeader>                 
                        <CardBody>
                        {isLoading
                                    ? <center> <CircularProgress/></center>
                                    : <span></span>
                        }
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <InputLabel htmlFor="name">Nombre del producto</InputLabel>
                              <OutlinedInput
                                  id="name"
                                  name="name"
                                  placeholder="Nombre producto"                            
                                  labelWidth={60}
                                  value={editForm.name || ""}
                                  onChange={handleChange}                               
                              />
                        </FormControl>
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <TextField
                            id="description"
                            name="description"
                            label="Descripción"
                            multiline
                            rows={4}
                            placeholder="Características, beneficios y demás del producto"
                            variant="outlined"
                            inputProps={{ maxLength: 1000 }}
                            value={editForm.description || ""}
                            onChange={handleChange}
                            required
                          />
                        </FormControl>
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <InputLabel htmlFor="inventory">Inventario del producto</InputLabel>
                              <OutlinedInput
                                  id="inventory"
                                  name="inventory"
                                  placeholder="Número de unidades"                            
                                  labelWidth={60}                                  
                                  type="number"
                                  value={editForm.inventory || ""}
                                  min="-1"
                                  onChange={handleChange}                                 
                              />
                        </FormControl>
                        <FormControl variant="outlined"  style={{width:"100%",paddingBottom:"10px"}}>
                          <InputLabel htmlFor="dropshipping">¿Disponible para que otros lo vendan?</InputLabel>
                          <Select
                            native
                            value= {editForm.dropshipping || false}
                            onChange={handleChange}
                            inputProps={{
                              name: 'dropshipping',
                              id: 'dropshipping'
                            }}                            
                          >
                            <option value={"true"}>Si</option>
                            <option value={"false"}>No</option>                             
                          </Select>
                        </FormControl>
                        {editForm.dropshipping=="true" || editForm.dropshipping==true
                          ? <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <InputLabel htmlFor="valor">Precio a distribuidor</InputLabel>
                          <OutlinedInput
                              id="dropshippingPrice"
                              name="dropshippingPrice"
                              placeholder="Precio para vendedor dropshipping"
                              startAdornment={<InputAdornment position="start">$</InputAdornment>}
                              labelWidth={60}                                                          
                              type="number"
                              value={editForm.dropshippingPrice || ""}
                              onChange={handleChange}
                          />
                          </FormControl>
                          :<span></span>
                        }
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                            <InputLabel htmlFor="valor">Precio a consumidor</InputLabel>
                            <OutlinedInput
                                id="valor"
                                name="amount"
                                placeholder="Recuerda tener en cuenta nuestra comisión"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={60}
                                required
                                type="number"
                                value={editForm.amount || ""}
                                onChange={handleChange} 
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
                          Editar Producto
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