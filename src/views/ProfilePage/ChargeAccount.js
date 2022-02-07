import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux'
import { setUpdateMerchant } from 'actions/actions'
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { PULL_BASEURL } from 'constant/index'
import consumeServicePost from 'service/ConsumeService'
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from "assets/jss/material-kit-react/views/createPayment.js";

import InputAdornment from '@material-ui/core/InputAdornment';
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { getMerchantId } from "service/AuthenticationService";


const useStyles = makeStyles(styles);

function ChargeAccount(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  const history = useHistory();

  const chargeAccount = () => {
    if (!document.getElementById("valor").value) {
      setErrorMessage("Valor es obligatorio")
    } else {
      if (isLoading) {
        return
      }
      setErrorMessage("")
      setIsLoading(true)
      const amount = document.getElementById("valor").value
      const url = `${PULL_BASEURL}/cashin/redirect`
      consumeServicePost({ id: getMerchantId(), isMerchantPayment: true, amount: amount }, callBackError, callBackSucessCreateRedirect, url)
    }
  }

  const callBackError = () => {
    setIsLoading(false)
    setErrorMessage("Error generando pago")
  }

  const callBackSucessCreateRedirect = (paymentInformation) => {
    setIsLoading(false)
    setUpdateMerchant(!props.updateMerchant)
    localStorage.setItem("isMerchantUpdated", true)
    history.push("/methods?id=" + paymentInformation.id)
  }



  return (

    <div>
      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card className={classes[cardAnimaton]}>
              <form className={classes.form} validated="true" name="createPayment" id="createPayment">
                <CardHeader className={classes.cardHeader}>
                <div style={{display: 'flex', flexDirection: 'row-reverse', marginTop: '2rem', alignItems: 'center',justifyContent: 'space-evenly'}}>
                    <h3 style={{ fontWeight: "600"}}>
                    Crear Promoción</h3>
                    <ArrowBackIcon className={classes.arrow}  onClick={()=>props.history.push(`/dashboard`)} />
                </div>
                </CardHeader>
                {isLoading
                  ? <GridItem xs={12} sm={12} md={12}><center><CircularProgress /></center></GridItem>
                  : <span></span>
                }
                <CardBody>
                  <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                    <InputLabel htmlFor="valor">Valor</InputLabel>
                    <OutlinedInput
                      id="valor"
                      placeholder="Ingresa el valor sin puntos o comas"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      labelWidth={60}
                      required
                      type="number"
                    />
                  </FormControl>
                  {errorMessage
                    ? <Alert severity="error">{errorMessage}</Alert> : <span></span>
                  }
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button color="primary" size="lg" type="button" onClick={chargeAccount}>
                    Recargar
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

const mapDispatchToProps = {
  setUpdateMerchant
}

const mapStateToProps = (state) => {
  return {
      updateMerchant: state.fbReducer.updateMerchant
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChargeAccount);