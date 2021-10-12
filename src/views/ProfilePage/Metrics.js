import React from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FacebookIcon from '@material-ui/icons/Facebook';
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { CORE_BASEURL } from '../../constant/index'
import { consumeServicePatch } from 'service/ConsumeService'
import { getMerchantId } from 'service/AuthenticationService';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import InputAdornment from "@material-ui/core/InputAdornment";


export default function Metrics(props) {

  const [errorMessageIntegration, setErrorMessageIntegration] = React.useState("");
  const [isLoadingSend, setIsLoadingSend] = React.useState(false);
  const [isSendingDone, setIsSendingDone] = React.useState(false);
  const [pixelId, setPixelId] = React.useState(props.pixelId);

  const handlePixelId = (event) => {
    setPixelId(event.target.value);
  };

  const savePixel = () => {
    if (isLoadingSend) {
      return
    }
    setIsLoadingSend(true)
    setIsSendingDone(false)
    setErrorMessageIntegration("")
    const merchantId = getMerchantId()
    let url = `${CORE_BASEURL}/merchant`
    consumeServicePatch({
      id: merchantId,
      fbId: document.getElementById("pixelId").value
    }, callBackSend, callBackSuccessSend, url)
  }

  const callBackSuccessSend = () => {
    setIsLoadingSend(false)
    setIsSendingDone(true)
  }

  const callBackSend = () => {
    setIsLoadingSend(false)
    setErrorMessageIntegration("Error guardando pixel")
  }

  return (<GridContainer justify="center">
    {isLoadingSend
      ? <GridItem xs={12} sm={12} md={12}><CircularProgress /></GridItem>
      : <span></span>
    }
    {errorMessageIntegration != ""
      ?
      <GridItem xs={12} sm={12} md={12}><Alert severity="error">{errorMessageIntegration}</Alert></GridItem>
      : <span>	&nbsp;</span>
    }
    {isSendingDone
      ? <GridItem xs={12} sm={12} md={12}><Alert severity="success">Pixel actualizado</Alert></GridItem>
      : <span></span>
    }
    <GridItem xs={12} sm={12} md={6}>
      <CustomInput
        labelText="Id de Pixel de Facebook"
        id="pixelId"
        formControlProps={{
          fullWidth: true
        }}

        inputProps={{
          type: "number",
          name: "pixelId",
          value: pixelId || "",
          onChange: handlePixelId,
          endAdornment: (
            <InputAdornment position="end">
              <FacebookIcon />
            </InputAdornment>
          )
        }}
      />
    </GridItem>
    <GridItem xs={12} sm={12} md={6}>
      <Button onClick={savePixel} style={{ backgroundColor: '#041492' }} size="lg">
        Guardar
      </Button>
    </GridItem>
  </GridContainer>)
}