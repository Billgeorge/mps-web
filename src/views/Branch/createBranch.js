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
  
  return (
    
    <div>
      <ResponsiveDrawe />
      <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                  <form className={classes.form} validated="true" name="createProduct" id="createProduct">
                        <CardHeader className={classes.cardHeader}>
                            <h3 style={{fontWeight:"600"}}><a href="/product"><ArrowBackIcon /></a> Crear Sucursal nueva</h3>
                        </CardHeader>                 
                        <CardBody>
                        {isLoading
                                    ? <center> <CircularProgress/></center>
                                    : <span></span>
                        }
                        
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <InputLabel htmlFor="name">Nombre de la sucursal</InputLabel>
                              <OutlinedInput
                                  id="name"
                                  placeholder="Nombre sucursal"                            
                                  labelWidth={60}                                  
                              />
                        </FormControl>
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                          <TextField
                            id="description"
                            label="Dirección"
                            multiline
                            rows={4}
                            placeholder="Dirección"
                            variant="outlined"
                            inputProps={{ maxLength: 1000 }}
                            required
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
                          Crear Sucursal
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
              