import React from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FacebookIcon from '@material-ui/icons/Facebook';
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import InputAdornment from "@material-ui/core/InputAdornment";


export default function Metrics(props) {

    const [pixelId, setPixelId] = React.useState(props.pixelId);

    return ( <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
             <CustomInput                    
                                labelText="Id de Pixel de Facebook"
                                id="pixelId"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                                                
                                inputProps={{
                                  type: "number",
                                  name:"pixelId",                                  
                                  value:props.pixelId || "",
                                  onChange:setPixelId,
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <FacebookIcon />
                                    </InputAdornment>
                                  )
                                }}
                            />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                            <Button  style={{backgroundColor:'#041492'}} size="lg">
                             Guardar
                        </Button> 
                        </GridItem>  
    </GridContainer>)
}