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
import { consumeServiceGet } from 'service/ConsumeService'
import { CORE_BASEURL } from 'constant/index'
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

    const callBackErrorGetPlans = (msg) => {
        if (msg === 404) {
            setErrorMessage("No hay transacciones para mostrar")
        } else {
            setErrorMessage("Error Cargando Transacciones")
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
                            return <Card style={{marginTop:'20px'}}>
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
                                    <a name={plan.membershipName} className="button" style={{ display: 'block', cursor: 'pointer', margin: '0 auto', height: '50px', width: 'auto', background: 'blue', color: '#ffffff', textAlign: 'center', fontWeight: 'bold', fontSize: '100%', lineHeight: '30px', fontFamily: 'Arial', borderRadius: '10px', textDecoration: 'none', padding: '10px' }}>Pagar con PSE</a>
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