import React from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import {getQueyParamFromUrl} from 'util/UrlUtil'
import CircularProgress from '@material-ui/core/CircularProgress';

import Pse from "assets/img/payments/pse.png"
import {consumeServicePatch} from "service/ConsumeService";
import {PULL_BASEURL} from 'constant/index'

const useStyles = makeStyles({
    container:{
        margin:'20px'
    },
    gridItemCard: {
      marginBottom: '20px',
    },
    media: {
      height: 140,
      backgroundSize: 'auto'       
    },
  });

export default function PaymentForm(props) {

    
    const classes = useStyles();
    const [errorMessage, setErrorMessage] = React.useState({});
    const [formRedirectFlag, setFormRedirectFlag] = React.useState(false);
    const [paymentInformation, setPayInformation] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => 
         addingClicEvent()
    , []);

    const addingClicEvent = () => {
        var links = document.getElementsByClassName("button");
        for(let input of links){
            console.log(input.item)
            input.onclick = function(e) {
                redirect(e.target.name)
            }
        }               
    }
    const callBackGet = () => {
        setIsLoading(false)
        let errorObjects = {"Error":"Error completando pago, por favor contactar a administrador"}
        setErrorMessage(errorObjects)        
      }

    const redirect = (paymentMethod) => {
        setIsLoading(true)
        const id = getQueyParamFromUrl('id')
        const url = `${PULL_BASEURL}/cashin/redirect/paymentmethod`
        console.log("redirect id"+id)
        consumeServicePatch({paymentPartnerId:id,paymentMethod:paymentMethod},callBackGet,callBackSuccessGetPaymentInformation,url)               
    }

    const callBackSuccessGetPaymentInformation = (paymentInformation) => {   
        setPayInformation(paymentInformation)
        setFormRedirectFlag(true)
        document.payzenForm.submit()
    }
    
    return (    
        <div>
            {
                formRedirectFlag
                ?
            <form method="POST" action="https://secure.payzen.lat/vads-payment/" name="payzenForm" id="payzenForm">
                <input type="hidden" name="vads_action_mode" value={paymentInformation.actionMode || ''} />
                <input type="hidden" name="vads_amount" value={paymentInformation.amount || ''} />
                <input type="hidden" name="vads_ctx_mode" value={paymentInformation.environment || ''} />
                <input type="hidden" name="vads_currency" value={paymentInformation.currency || ''} />					
                <input type="hidden" name="vads_page_action" value={paymentInformation.action || ''} />
                <input type="hidden" name="vads_payment_config" value={paymentInformation.paymentConfig || ''} />
                <input type="hidden" name="vads_site_id" value={paymentInformation.siteId || ''} />
                <input type="hidden" name="vads_trans_date" value={paymentInformation.transactionDate|| ''} />
                <input type="hidden" name="vads_trans_id" value={paymentInformation.id || ''} />
                <input type="hidden" name="vads_version" value={paymentInformation.version || ''} />
                <input type="hidden" name="signature" value={paymentInformation.signature || ''}/>
                <input type="hidden" name="vads_payment_cards" value={paymentInformation.method || ''}/>
                <input type="hidden" name="vads_order_id" value={paymentInformation.orderId || ''}/>
                <input type="hidden" name="vads_url_success" value='https://app.eikoos.com/thanks-page'/>
                <input type="hidden" name="vads_return_mode" value='GET'/>
                <input type="hidden" name="vads_redirect_success_timeout" value="0" />
                                                                      
            </form>
              : <span></span>
            }
             <GridContainer className={classes.container}  justify="center">
             {isLoading
                                ? <GridItem xs={12} sm={12} md={12}><center><CircularProgress/></center></GridItem>
                                : <span></span>
                    }
                <GridItem xs={12} sm={12} md={3} className={classes.gridItemCard}>
                <Card >
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}          
                        image={Pse}
                        title="Pago con PSE"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Cuenta bancaria
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Con la cuenta bancaria de cualquier banco y Nequi.
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <a name="PSE" className="button" style={{display: 'block', cursor:'pointer', margin: '0 auto', height: '50px', width: 'auto', background: 'blue', color: '#ffffff', textAlign: 'center', fontWeight: 'bold', fontSize: '100%', lineHeight: '30px', fontFamily: 'Arial', borderRadius: '10px', textDecoration: 'none', padding:'10px'}}>Pagar con PSE</a>                 
                    </CardActions>
                </Card>
                </GridItem>    
                
                {Object.keys(errorMessage).map((keyName, i) => (
                  <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>    
                ))}                    
             </GridContainer>
            
        </div>
    )
}
/**
 *        
 */