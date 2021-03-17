import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles,withStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components

import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

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


import ExtensionIcon from '@material-ui/icons/Extension';
import styles from "assets/jss/material-kit-react/views/profilePage.js";

import {consumeServiceGet,consumeServicePut} from 'service/ConsumeService'
import consumeServicePost from 'service/ConsumeService'
import { getMerchantId,getMerchantName } from 'service/AuthenticationService';
import {getFirstLetters} from 'util/NameUtils'
import {getBankNumber,getAccountType} from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import AssessmentIcon from '@material-ui/icons/Assessment';
import Metrics from 'views/ProfilePage/Metrics'


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
  const [isLoadingSend, setIsLoadingSend] = React.useState(false);
  const [isModificationDone, setIsModificationDone] = React.useState(false);
  const [isSendingDone, setIsSendingDone] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [errorMessageIntegration, setErrorMessageIntegration] = React.useState("");    

  const [isEditEnabled, setIsEditEnabled] = React.useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    setProfile({
      ...profile,
      [name]: event.target.value,
    });
  };

  const callBack = (msg) => {
    setProfile({})
    if(msg==404){
      setErrorMessage("No existe tu perfil")        
    }else{
      setErrorMessage("Error Cargando perfil")
    }      
  }

  const callBackSuccess = (profile) =>{
    profile.accountBank = getBankNumber(profile.accountBank)
    profile.accountType = getAccountType(profile.accountType)
    setProfile(profile)    
  }

  const editEnable = (event) =>{
    let htmlInputs = document.forms["profileForm"].getElementsByTagName("input");
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

  const callBackSuccessSend = () => {
    setIsLoadingSend(false)
    setIsSendingDone(true)
  }

  const callBackSend = () => {
    setIsLoadingSend(false)
    setErrorMessageIntegration("Error enviando información")          
  }

  const sendIntegrationInformation = () => {
    setIsLoadingSend(true)
    setIsSendingDone(false)
    setErrorMessageIntegration("")
    const merchantId = getMerchantId()
    let url=`${CORE_BASEURL}/user/integration/${merchantId}`
    consumeServicePost(null,callBackSend,callBackSuccessSend,url)
  }
  const changeMessageValidation = () =>{
    document.profileForm.onsubmit = function(event){
      setErrorMessage("")
      setIsModificationDone(false)
      const callBack = (error) => {
        let errorObjects = "Error Modificando Información de perfil"
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
      
      event.preventDefault()
      if(document.getElementById('bankAccount').value=='0'){
        let errorObjects = "Debes seleccionar un banco"
        setErrorMessage(errorObjects)
        return
      }
      setErrorMessage("")
      const form = event.currentTarget;
      setIsLoading(true)
      let profileToSend =  {    
        id: getMerchantId(),
        accountBank: document.getElementById("bankAccount").value,
        accountNumber:document.getElementById("accountNumber").value,
        contactNumber: document.getElementById("contactNumber").value,
        nit: document.getElementById("nit").value,
        accountType: document.getElementById("accountType").value
      }
      consumeServicePut(profileToSend,callBack,callBackSucess,
      CORE_BASEURL+"/merchant")
    }
    let htmlInputs = document.forms["profileForm"].getElementsByTagName("input");
    for(let input of htmlInputs){
    
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
      <Parallax style={{paddingLeft:'100px'}} small filter image={require("assets/img/profile-bg.jpg")} />
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
                          </GridItem>
                          {isLoading
                                ? <GridItem xs={12} sm={12} md={12}><CircularProgress/></GridItem>
                                : <span></span>
                            }
                          
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput                    
                                labelText="Nit o Cédula"
                                id="nit"                                
                                formControlProps={{
                                  fullWidth: true
                                }}
                                                                                           
                                inputProps={{
                                  type: "number",
                                  name:"nit",
                                  required: true,
                                  readOnly:true,
                                  value: profile.nit || "",                                  
                                  onChange:handleChange,
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
                                formControlProps={{
                                  fullWidth: true
                                }}
                                                                
                                inputProps={{
                                  type: "number",
                                  required: true,
                                  name:"accountNumber",
                                  readOnly:true,
                                  value:profile.accountNumber || "",
                                  onChange:handleChange,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <AccountBalance className={classes.inputIconsColor} />
                                    </InputAdornment>
                                  )
                                }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4} style={{paddingTop:'11px'}}>
                            <FormControl style={{margin: '0 0 25px 0', width: '100%'}}>
                                <InputLabel htmlFor="accountBank">Banco</InputLabel>
                                <Select
                                  native
                                  value={profile.accountBank || '0'}
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

                              <FormControl style={{margin: '0 0 0 0', width: '100%'}}>
                                <InputLabel htmlFor="accountType">Tipo de cuenta</InputLabel>
                                <Select
                                  native
                                  value={profile.accountType || '0'}
                                  disabled = {!isEditEnabled}
                                  onChange={handleChange}
                                  inputProps={{
                                    name: 'accountType',
                                    id:'accountType'
                                  }}
                                >
                                  <option value={0}>Selecciona tipo de cuenta</option>
                                  <option value={1}>Cuenta de ahorros</option>
                                  <option value={2}>Cuenta corriente</option>                                 
                                </Select>                               
                              </FormControl>                              
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
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
                          {errorMessage != ""
                            ?
                            <GridItem xs={12} sm={12} md={12}><Alert severity="error">{errorMessage}</Alert></GridItem>
                            : <span>	&nbsp;</span>   
                          }
                          {isModificationDone
                                          ?  <GridItem xs={12} sm={12} md={12}><Alert severity="success">Información de perfil modificada. </Alert></GridItem>    
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
                    },
                    {
                      tabButton: "Integración",
                      tabIcon: ExtensionIcon,
                      tabContent: (<GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                        <div className={classes.description} style={{color:'black'}}>
                          <p>
                           Utiliza el siguiente botón para recibir al correo la información de integración. Esto te será útil si deseas usar Mipagoseguro con el plugin de woocommerce o mediante API.
                          </p>
                        </div>
                        {isLoadingSend
                                ? <GridItem xs={12} sm={12} md={12}><CircularProgress/></GridItem>
                                : <span></span>
                            }
                        {errorMessageIntegration != ""
                            ?
                            <GridItem xs={12} sm={12} md={12}><Alert severity="error">{errorMessageIntegration}</Alert></GridItem>
                            : <span>	&nbsp;</span>   
                          }
                          {isSendingDone
                            ?  <GridItem xs={12} sm={12} md={12}><Alert severity="success">Información enviada al correo Electrónico </Alert></GridItem>    
                            : <span></span>
                          }                                          
                        <Button onClick={sendIntegrationInformation} style={{backgroundColor:'#041492'}} size="lg">
                              Solicitar llaves
                        </Button>   
                        </GridItem>
                      </GridContainer>)
                    },
                    {
                      tabButton: "Sequimiento",
                      tabIcon: AssessmentIcon,
                      tabContent: (<div>
                        
                       <div className={classes.description} style={{color:'black'}}>
                          <p>
                           Tu actual pixel es {!(profile.fbPixel)?'Pixel vacio':`${profile.fbPixel}`}. Si deseas actualizarlo ingresa el nuevo valor y da clic en el botón guardar:
                          </p>
                        </div>
                        <Metrics/>
                      </div>)
                    }
                        
                      
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
