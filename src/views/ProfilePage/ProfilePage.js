import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

import { CORE_BASEURL } from '../../constant/index'

import Alert from '@material-ui/lab/Alert';


import ExtensionIcon from '@material-ui/icons/Extension';
import styles from "assets/jss/material-kit-react/views/profilePage.js";

import { consumeServiceGet, consumeServicePut } from 'service/ConsumeService'
import consumeServicePost from 'service/ConsumeService'
import { getMerchantId, getMerchantName } from 'service/AuthenticationService';
import { getFirstLetters } from 'util/NameUtils'
import { getBankNumber, getAccountType } from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import AssessmentIcon from '@material-ui/icons/Assessment';
import Metrics from 'views/ProfilePage/Metrics'
import FaceIcon from '@material-ui/icons/Face';


const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const [profile, setProfile] = React.useState({});
  const [bankingInformation, setBankingInformation] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingSend, setIsLoadingSend] = React.useState(false);
  const [isModificationDone, setIsModificationDone] = React.useState(false);
  const [isModificationDoneBank, setIsModificationDoneBank] = React.useState(false);
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

  const handleChangeBank = (event) => {
    const name = event.target.name;
    setBankingInformation({
      ...bankingInformation,
      [name]: event.target.value,
    });
  };

  const callBack = (msg) => {
    setProfile({})
    if (msg === 404) {
      setErrorMessage("No existe tu perfil")
    } else {
      setErrorMessage("Error Cargando perfil")
    }
  }

  const callBackBankInfo = (msg) => {
    setBankingInformation({})
    if (msg === 404) {
      setErrorMessage("No Tienes información bancaría registrada")
    } else {
      setErrorMessage("Error Cargando información bancaría")
    }
  }

  const callBackSuccess = (profile) => {
    profile.accountBank = getBankNumber(profile.accountBank)
    profile.accountType = getAccountType(profile.accountType)
    setProfile(profile)
  }
  const callBackSuccessGetBanking = (bankingInfo) => {
    document.getElementById("bankInfoId").value = bankingInfo.id
    setBankingInformation(bankingInfo)
  }


  const editEnable = (event) => {
    let htmlInputs = document.forms["profileForm"].getElementsByTagName("input");
    for (let input of htmlInputs) {
      input.readOnly = false;
    }
    let htmlInputsBanking = document.forms["bankingInfoForm"].getElementsByTagName("input");
    for (let input of htmlInputsBanking) {
      input.readOnly = false;
    }
    document.getElementById("bankAccount").removeAttribute('readOnly');
    setIsEditEnabled(true)
  }

  React.useEffect(() => {
    getInformationProfile();
    getBankingInformation();
    changeMessageValidation();
  }, []);

  const getInformationProfile = () => {
    const merchantId = getMerchantId()
    let url = `${CORE_BASEURL}/merchant/${merchantId}`
    consumeServiceGet(callBack, callBackSuccess, url)
  }

  const getBankingInformation = () => {
    const merchantId = getMerchantId()
    let url = `${CORE_BASEURL}/banking-info/${merchantId}`
    consumeServiceGet(callBackBankInfo, callBackSuccessGetBanking, url)
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
    let url = `${CORE_BASEURL}/user/integration/${merchantId}`
    consumeServicePost(null, callBackSend, callBackSuccessSend, url)
  }
  const changeMessageValidation = () => {
    document.profileForm.onsubmit = function (event) {
      setErrorMessage("")
      setIsModificationDone(false)
      const callBack = (error) => {
        let errorObjects = "Error Modificando Información de perfil"
        if (error !== null) {
          if (typeof error === 'object') {
            errorObjects = JSON.stringify(error)
          } else {
            errorObjects = error
          }
        }
        setErrorMessage(errorObjects)
        setIsLoading(false)
      }
      const callBackSucess = () => {
        document.getElementById("profileForm").reset();
        setIsLoading(false)
        setIsModificationDone(true)
        setIsEditEnabled(false)
      }

      event.preventDefault()
      if (isLoading) {
        return
      }
      setErrorMessage("")
      setIsLoading(true)
      let profileToSend = {
        id: getMerchantId(),
        contactNumber: document.getElementById("contactNumber").value,
        nit: document.getElementById("nit").value
      }
      consumeServicePut(profileToSend, callBack, callBackSucess,
        CORE_BASEURL + "/merchant")
    }

    document.bankingInfoForm.onsubmit = function (event) {
      setErrorMessage("")
      setIsModificationDoneBank(false)
      const callBack = (error) => {
        let errorObjects = "Error Modificando Información bancaría"
        if (error !== null) {
          if (typeof error === 'object') {
            errorObjects = JSON.stringify(error)
          } else {
            errorObjects = error
          }
        }
        setErrorMessage(errorObjects)
        setIsLoading(false)
      }
      const callBackSucessBank = (bankingInfo) => {
        document.getElementById("bankingInfoForm").reset();
        setIsLoading(false)
        document.getElementById("bankInfoId").value = bankingInfo.id
        setIsModificationDoneBank(true)
        setIsEditEnabled(false)
      }

      event.preventDefault()
      if (document.getElementById('bankAccount').value === '0' || document.getElementById('accountType').value === '0' ||
        document.getElementById('documentType').value === '0') {
        let errorObjects = "Todos los campos son obligatorios"
        setErrorMessage(errorObjects)
        return
      }
      if (isLoading) {
        return
      }
      setErrorMessage("")
      setIsLoading(true)
      let bankInfoToSend = {
        id: document.getElementById("bankInfoId").value,
        merchantId: getMerchantId(),
        accountBank: document.getElementById("bankAccount").value,
        accountNumber: document.getElementById("accountNumber").value,
        accountType: document.getElementById("accountType").value,
        documentType: document.getElementById("documentType").value,
        documentNumber: document.getElementById("documentNumber").value,
        fullName: document.getElementById("fullName").value
      }
      consumeServicePost(bankInfoToSend, callBack, callBackSucessBank,
        CORE_BASEURL + "/banking-info")
    }
    let htmlInputs = document.forms["profileForm"].getElementsByTagName("input");
    for (let input of htmlInputs) {

      input.oninvalid = function (e) {
        e.target.setCustomValidity("Este campo es obligatorio o invalido");
      }
      input.oninput = function (e) {
        e.target.setCustomValidity("");
      };
    }
    let htmlInputsBank = document.forms["bankingInfoForm"].getElementsByTagName("input");
    for (let input of htmlInputsBank) {

      input.oninvalid = function (e) {
        e.target.setCustomValidity("Este campo es obligatorio o invalido");
      }
      input.oninput = function (e) {
        e.target.setCustomValidity("");
      };
    }
  }
  return (
    <div>
      <ResponsiveDrawe />
      <Parallax style={{ paddingLeft: '100px' }} small filter image={require("assets/img/profile-bg.jpg")} />
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
                  </div>
                </div>
              </GridItem>
            </GridContainer>
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
                        <GridContainer justify="center" className={classes.formContainer}>
                          <form name="profileForm" id="profileForm">
                            <GridContainer justify="center">
                              {profile.nit === "" || profile.nit === null
                                ? <Alert severity="warning">Es indispensable que completes tu información de perfil con el siguiente formulario. </Alert>
                                : <span></span>
                              }
                              <GridItem xs={12} sm={12} md={12}>
                                <Button style={{ backgroundColor: '#041492' }} onClick={editEnable}>
                                  <Edit className={classes.inputIconsColor} />  Editar información
                                </Button>
                              </GridItem>
                              {isLoading
                                ? <GridItem xs={12} sm={12} md={12}><CircularProgress /></GridItem>
                                : <span></span>
                              }
                              <GridItem xs={12} sm={12} md={12}><h3>Información del negocio</h3></GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Nit o Cédula"
                                  id="nit"
                                  formControlProps={{
                                    fullWidth: true
                                  }}

                                  inputProps={{
                                    type: "number",
                                    name: "nit",
                                    required: true,
                                    readOnly: true,
                                    value: profile.nit || "",
                                    onChange: handleChange,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Fingerprint className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                                />
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
                                    name: "contactNumber",
                                    required: true,
                                    readOnly: true,
                                    value: profile.contactNumber || "",
                                    onChange: handleChange,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <ContactPhone className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              </GridItem>
                              {errorMessage !== ""
                                ?
                                <GridItem xs={12} sm={12} md={12}><Alert severity="error">{errorMessage}</Alert></GridItem>
                                : <span>	&nbsp;</span>
                              }
                              {isModificationDone
                                ? <GridItem xs={12} sm={12} md={12}><Alert severity="success">Información de perfil modificada. </Alert></GridItem>
                                : <span></span>
                              }
                              <GridItem xs={12} sm={12} md={12}>
                                <Button id="saveProfile" style={{ backgroundColor: '#041492' }} size="lg" type="submit" disabled={!isEditEnabled}>
                                  Guardar
                                </Button>
                              </GridItem>
                            </GridContainer>
                          </form>
                          <form name="bankingInfoForm" id="bankingInfoForm">
                            <GridContainer justify="center">
                              {bankingInformation.accountNumber === "" || bankingInformation.accountNumber === null
                                ? <Alert severity="warning">Es indispensable que completes tu información bancaría con el siguiente formulario. </Alert>
                                : <span></span>
                              }
                              <GridItem xs={12} sm={12} md={12}><h3>Información bancaría</h3></GridItem>
                              <GridItem xs={12} sm={12} md={6} style={{ paddingTop: '11px' }}>
                                <FormControl style={{ margin: '0 0 25px 0', width: '100%' }}>
                                  <InputLabel htmlFor="accountBank">Banco</InputLabel>
                                  <Select
                                    native
                                    value={bankingInformation.accountBank || '0'}
                                    disabled={!isEditEnabled}
                                    onChange={handleChangeBank}
                                    inputProps={{
                                      name: 'accountBank',
                                      id: 'bankAccount'
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
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6} style={{ paddingTop: '11px' }}>
                                <FormControl style={{ margin: '0 0 0 0', width: '100%' }}>
                                  <InputLabel htmlFor="accountType">Tipo de cuenta</InputLabel>
                                  <Select
                                    native
                                    value={bankingInformation.accountType || '0'}
                                    disabled={!isEditEnabled}
                                    onChange={handleChangeBank}
                                    inputProps={{
                                      name: 'accountType',
                                      id: 'accountType'
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
                                  labelText="Número Cuenta Bancaria"
                                  id="accountNumber"
                                  formControlProps={{
                                    fullWidth: true
                                  }}

                                  inputProps={{
                                    type: "number",
                                    required: true,
                                    name: "accountNumber",
                                    readOnly: true,
                                    value: bankingInformation.accountNumber || "",
                                    onChange: handleChangeBank,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <AccountBalance className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              </GridItem>

                              <GridItem xs={12} sm={12} md={6} style={{ paddingTop: '11px' }}>
                                <FormControl style={{ margin: '0 0 0 0', width: '100%' }}>
                                  <InputLabel htmlFor="documentType">Tipo de documento titular</InputLabel>
                                  <Select
                                    native
                                    value={bankingInformation.documentType || '0'}
                                    disabled={!isEditEnabled}
                                    onChange={handleChangeBank}
                                    inputProps={{
                                      name: 'documentType',
                                      id: 'documentType'
                                    }}
                                  >
                                    <option value={0}>Selecciona tipo de documento</option>
                                    <option value={1}>Cédula</option>
                                    <option value={2}>Nit</option>
                                  </Select>
                                </FormControl>

                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Número de documento del titular de cuenta"
                                  id="documentNumberAccount"
                                  formControlProps={{
                                    fullWidth: true
                                  }}

                                  inputProps={{
                                    type: "number",
                                    required: true,
                                    name: "documentNumber",
                                    id: "documentNumber",
                                    readOnly: true,
                                    value: bankingInformation.documentNumber || "",
                                    onChange: handleChangeBank,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Fingerprint className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <CustomInput
                                  labelText="Nombre Completo del titular de cuenta"
                                  formControlProps={{
                                    fullWidth: true
                                  }}

                                  inputProps={{
                                    type: "text",
                                    required: true,
                                    name: "fullName",
                                    id: "fullName",
                                    readOnly: true,
                                    value: bankingInformation.fullName || "",
                                    onChange: handleChangeBank,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <FaceIcon className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                                <input type="hidden" name="bankInfoId" id="bankInfoId" />

                              </GridItem>
                              {errorMessage !== ""
                                ?
                                <GridItem xs={12} sm={12} md={12}><Alert severity="error">{errorMessage}</Alert></GridItem>
                                : <span>	&nbsp;</span>
                              }
                              {isModificationDoneBank
                                ? <GridItem xs={12} sm={12} md={12}><Alert severity="success">Información de bancaría modificada. </Alert></GridItem>
                                : <span></span>
                              }
                              <br />
                              <GridItem xs={12} sm={12} md={12}>
                                <Button id="saveBankingInformation" style={{ backgroundColor: '#041492' }} size="lg" type="submit" disabled={!isEditEnabled}>
                                  Guardar Información Bancaría
                                </Button>
                              </GridItem>
                            </GridContainer>

                          </form>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Integración",
                      tabIcon: ExtensionIcon,
                      tabContent: (<GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className={classes.description} style={{ color: 'black' }}>
                            <p>
                              Utiliza el siguiente botón para recibir al correo la información de integración. Esto te será útil si deseas usar Mipagoseguro con el plugin de woocommerce o mediante API.
                            </p>
                          </div>
                          {isLoadingSend
                            ? <GridItem xs={12} sm={12} md={12}><CircularProgress /></GridItem>
                            : <span></span>
                          }
                          {errorMessageIntegration !== ""
                            ?
                            <GridItem xs={12} sm={12} md={12}><Alert severity="error">{errorMessageIntegration}</Alert></GridItem>
                            : <span>	&nbsp;</span>
                          }
                          {isSendingDone
                            ? <GridItem xs={12} sm={12} md={12}><Alert severity="success">Información enviada al correo Electrónico </Alert></GridItem>
                            : <span></span>
                          }
                          <Button onClick={sendIntegrationInformation} style={{ backgroundColor: '#041492' }} size="lg">
                            Solicitar llaves
                          </Button>
                        </GridItem>
                      </GridContainer>)
                    },
                    {
                      tabButton: "Sequimiento",
                      tabIcon: AssessmentIcon,
                      tabContent: (<div>

                        <div className={classes.description} style={{ color: 'black' }}>
                          <p>
                            Tu actual pixel es {!(profile.fbPixel) ? 'Pixel vacio' : `${profile.fbPixel}`}. Si deseas actualizarlo ingresa el nuevo valor y da clic en el botón guardar:
                          </p>
                        </div>
                        <Metrics />
                      </div>)
                    }


                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div >
      <Footer />
    </div >
  );
}
