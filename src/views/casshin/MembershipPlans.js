import React from "react";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from "components/CustomButtons/Button.js";
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { consumeServiceGet } from 'service/ConsumeService'
import consumeServicePost from '../../service/ConsumeService'
import { getQueyParamFromUrl } from 'util/UrlUtil'
import { useHistory } from "react-router-dom";
import { CORE_BASEURL,PULL_BASEURL } from 'constant/index'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    container: {
        margin: '20px'
    },
    gridItemCard: {
        marginBottom: '20px'
    },
    media: {
        height: 140,
        backgroundSize: 'auto'
    },
});

export default function MembershipPlans(props) {


    const classes = useStyles();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [plans, setPlans] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    React.useEffect(() =>
        getPlans()
        , []);

    const getPlans = () => {
        const url = `${CORE_BASEURL}/membershipplan`
        consumeServiceGet(callBackErrorGetPlans, callBackSuccessGetPlans, url)
    }

    const createPayment = (amount) => {
        let id = getQueyParamFromUrl('id')
        if (id) {
            const url = `${CORE_BASEURL}/cataloguepayment/inscription`
            consumeServicePost({ amount: amount, merchantId: getQueyParamFromUrl('id') }, callBackErrorGetPlans, callBackSuccessCreatePaymentInformation, url)
        } else {
            setErrorMessage("No hay id de referencia")
        }
    }

    const callBackSuccessCreatePaymentInformation = (paymentInformationId) => {
        const url = `${PULL_BASEURL}/cashin/redirect`
        consumeServicePost({ id: paymentInformationId }, callBack, callbackSuccessMerchantCreation, url)
    }

    const callBack = (error) => {
        if (error != null && typeof error === 'object') {
            setErrorMessage(error)
        } else if (error != null && typeof error === 'string') {
            setErrorMessage({ 'Error': error })
        }
        else {
            setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
        }
        setIsLoading(false)
    }

    const callbackSuccessMerchantCreation = (paymentInformation) => {
        history.push("/methods?id=" + paymentInformation.id)
    }

    const callBackErrorGetPlans = (msg) => {
        if (msg === 404) {
            setErrorMessage("No hay transacciones para mostrar")
        } else {
            setErrorMessage("Error Procesando solicitud")
        }
    }

    const callBackSuccessGetPlans = (plans) => {
        setPlans(plans)
    }


    return (
        <div>
            <GridContainer className={classes.container} justify="center">
                {isLoading
                    ? <GridItem xs={12} sm={12} md={12}><center><CircularProgress /></center></GridItem>
                    : <span></span>
                }
                <GridItem xs={12} sm={12} md={3} className={classes.gridItemCard}>
                    {
                        plans.map(function (plan) {
                            return <Card style={{ marginTop: '20px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        title={plan.membershipName}
                                        image={plan.urlImg}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {plan.membershipName}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {formatter.format(plan.price)}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {plan.membershipDescription}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button onClick={() => { createPayment(plan.price) }} color="primary" size="lg" >
                                        Pagar con PSE
                                    </Button>
                                </CardActions>
                            </Card>;
                        })}
                </GridItem>

                {errorMessage != ""
                    ?
                    <Alert severity="error">{errorMessage}</Alert>
                    : <span>	&nbsp;</span>
                }
            </GridContainer>

        </div>
    )
}