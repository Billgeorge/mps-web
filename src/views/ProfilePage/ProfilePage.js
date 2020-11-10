import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles,withStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinksSession from "components/Header/HeaderLinksSession.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Avatar from '@material-ui/core/Avatar';

import InputAdornment from "@material-ui/core/InputAdornment";
import CustomInput from "components/CustomInput/CustomInput.js";
import AccountBalance from "@material-ui/icons/AccountBalance";

import ContactPhone from "@material-ui/icons/ContactPhone";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Edit from "@material-ui/icons/Edit";

import CircularProgress from '@material-ui/core/CircularProgress';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import {CORE_BASEURL} from '../../constant/index'

import Alert from '@material-ui/lab/Alert';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import {consumeServiceGet,consumeServicePut} from 'service/ConsumeService'
import { getMerchantId,getMerchantName } from 'service/AuthenticationService';
import {getFirstLetters} from 'util/NameUtils'



/*const StyledRating = withStyles({
  iconFilled: {
    color: '#ff3d47',
  },
  iconHover: {
    color: '#ff2d25',
  },
})(Rating);*/


const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [profile, setProfile] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);
  const [isModificationDone, setIsModificationDone] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({});    

  const [isEditEnabled, setIsEditEnabled] = React.useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    console.log("changing "+name)
    setProfile({
      ...profile,
      [name]: event.target.value,
    });
  };

  const callBack = (msg) => {
    setProfile({})
    if(msg==404){
      setErrorMessage({"Error":"No existe tu perfil"})        
    }else{
      setErrorMessage({"Error":"Error Cargando perfil"})
    }      
  }

  const callBackSuccess = (profile) =>{
    setProfile(profile)    
  }

  const editEnable = (event) =>{
    let htmlInputs = document.forms["profileForm"].getElementsByTagName("input");
    console.log(htmlInputs)
    for(let input of htmlInputs){
      input.readOnly=false;
    }    
    document.getElementById("bankAccount").removeAttribute('readOnly');
    setIsEditEnabled(true)
  }
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  React.useEffect(() => {
    getInformationProfile();
    changeMessageValidation();
  }, []);

  const getInformationProfile = () => {
    const merchantId = getMerchantId()
    let url=`${CORE_BASEURL}/merchant/${merchantId}`
    consumeServiceGet(callBack,callBackSuccess,url)
  }
  const changeMessageValidation = () =>{
    document.profileForm.onsubmit = function(event){
      setIsModificationDone(false)
      const callBack = (error) => {
        let errorObjects = {"Error":"Error Modificando Información de perfil"}
        if(error !== null){
          errorObjects = error
        }
        setErrorMessage(errorObjects)
        setIsLoading(false)
      }
      const callBackSucess = () =>{
        document.getElementById("profileForm").reset();
        setIsLoading(false)
        setIsModificationDone(true)
      }
      setIsLoading(true)
      console.log("Editing Profile")
      event.preventDefault()
      setErrorMessage({})
      const form = event.currentTarget;      
      consumeServicePut({    
        nit: document.getElementById("id").value,
        name: document.getElementById("merchantName").value,
        email:document.getElementById("email").value,
        contactNumber: document.getElementById("contactNumber").value,
        password: document.getElementById("pass").value
      },callBack,callBackSucess,
      CORE_BASEURL+"/merchant")
    }
    let htmlInputs = document.forms["profileForm"].getElementsByTagName("input");
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
      <Header
        color="transparent"
        brand="MiPagoSeguro"
        rightLinks={<HeaderLinksSession />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>                  
                       <Avatar aria-label="profile name" className={classes.avatar}>
                         {getFirstLetters(getMerchantName())}
                       </Avatar>
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{getMerchantName()}</h3>
                    {/*<h6>Venta de cosméticos</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>*/}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            {/*<div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>*/}
            <GridContainer justify="center">            
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color={'blue'}
                  tabs={[
                    {
                      tabButton: "Perfil",
                      tabIcon: Person,
                      tabContent: (
                        <form name="profileForm" id="profileForm">
                        <GridContainer justify="center"> 
                        {profile.accountNumber==""|| profile.accountNumber==null
                                          ? <Alert severity="warning">Es indispensable que completes tu información de perfil con el siguiente formulario. </Alert>    
                                          : <span></span>
                                          }                         
                          <GridItem xs={12} sm={12} md={12}>
                            <Button style={{backgroundColor:'#041492'}} onClick={editEnable}>
                              <Edit className={classes.inputIconsColor} />  Editar información                                  
                            </Button>
                            {isLoading
                                ? <CircularProgress/>
                                : <span></span>
                            }    
                          </GridItem>
                          
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput                    
                                labelText="Nit o Cédula"
                                id="nit"
                                name="nit"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                                                                           
                                inputProps={{
                                  type: "number",
                                  required: true,
                                  readOnly:true,
                                  value: profile.nit || "",                                  
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Fingerprint className={classes.inputIconsColor} />
                                    </InputAdornment>
                                  )
                                }}
                            />
                            <CustomInput                    
                                labelText="Número Cuenta Bancaria"
                                id="accountNumber"
                                name="accountNumber"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                onChange={handleChange}                                
                                inputProps={{
                                  type: "number",
                                  required: true,
                                  readOnly:true,
                                  value:profile.accountNumber,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <AccountBalance className={classes.inputIconsColor} />
                                    </InputAdornment>
                                  )
                                }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4} style={{paddingTop:'11px'}}>
                            <FormControl style={{margin: '0 0 17px 0', width: '100%'}}>
                                <InputLabel htmlFor="age-native-simple">Banco</InputLabel>
                                <Select
                                  native
                                  value={profile.accountBank}
                                  disabled = {!isEditEnabled}
                                  onChange={handleChange}
                                  inputProps={{
                                    name: 'accountBank',
                                    id:'bankAccount'
                                  }}
                                >
                                  <option value={0}>Selecciona un banco</option>
                                  <option value={1}>BANCO AV VILLAS</option>
                                  <option value={2}>BANCO BBVA COLOMBIA S.A.</option>
                                  <option value={3}>BANCO CAJA SOCIAL</option>
                                  <option value={4}>BANCO DAVIVIENDA</option>
                                  <option value={5}>BANCO DE BOGOTA</option>
                                  <option value={6}>BANCO DE OCCIDENTE</option>
                                  <option value={7}>BANCO ITAU</option>
                                  <option value={8}>BANCOLOMBIA</option>
                                  <option value={9}>SCOTIABANK COLPATRIA</option>
                                </Select>                               
                              </FormControl>
                              <CustomInput                    
                                  labelText="Número de contacto"
                                  id="contactNumber"                                  
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                                                    
                                  inputProps={{
                                    type: "number",
                                    name:"contactNumber",
                                    required: true,
                                    readOnly:true,
                                    value:profile.contactNumber || "",
                                    onChange:handleChange,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <ContactPhone className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                              />
                          </GridItem>
                          {Object.keys(errorMessage).map((keyName, i) => (
                            <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>    
                          ))}
                          {isModificationDone
                                          ? <Alert severity="success">Información de perfil modificada. </Alert>    
                                          : <span></span>
                                          }
                          <br/>
                          <GridItem xs={12} sm={12} md={12}>
                            <Button id="saveProfile" style={{backgroundColor:'#041492'}} size="lg" type="submit" disabled={!isEditEnabled}>
                              Guardar
                            </Button>    
                          </GridItem>
                          
                        </GridContainer>
                        </form>
                      )
                    }/*,
                    {
                      tabButton: "Redes Sociales",
                      tabIcon: Share,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                              <CustomInput                    
                                    labelText="Perfil de Facebook"
                                    id="fabebookProfile"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "text",
                                      required: true,
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Facebook className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      )
                                    }}
                                />
                                <CustomInput                    
                                  labelText="Perfil Twitter"
                                  id="twitterProfile"
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "text",
                                    required: true,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Twitter className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                                <CustomInput                    
                                    labelText="Perfil de instagram"
                                    id="instagramProfile"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "text",
                                      required: true,
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Instagram className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      )
                                    }}
                                />
                                <CustomInput                    
                                    labelText="Canal de Youtube"
                                    id="youtubeChannel"
                                    formControlProps={{
                                      fullWidth: true
                                    }}
                                    inputProps={{
                                      type: "text",
                                      required: true,
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <YouTube className={classes.inputIconsColor} />
                                        </InputAdornment>
                                      )
                                    }}
                                />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <Button color="primary" size="lg" type="submit" disabled>
                              Guardar
                            </Button>    
                          </GridItem>                          
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Calificación",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                              <Typography component="legend"><a>Jorge Leonardo Espinosa:</a> El Servicio es bueno</Typography>
                              <StyledRating
                                name="size-large"
                                defaultValue={2}
                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                precision={0.5}
                                icon={<Favorite fontSize="inherit" />}
                                size="large"
                                readOnly
                              />
                            </Box>
                            <Box component="fieldset" mb={3} borderColor="transparent">
                              <Typography component="legend"><a>Jorge Leonardo Espinosa:</a> El Servicio es bueno</Typography>
                              <StyledRating
                                name="size-large"
                                defaultValue={2}
                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                precision={0.5}
                                icon={<Favorite fontSize="inherit" />}
                                size="large"
                                readOnly
                              />
                            </Box>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                           
                          </GridItem>
                        </GridContainer>
                      )
                    }*/
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
