import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import { setUpdateMerchant } from 'actions/actions'
import { connect } from 'react-redux'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Button from "components/CustomButtons/Button.js";

import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";
import { getMerchantId } from 'service/AuthenticationService';
import { getLegibleDate } from 'util/DateUtil'

import { consumeServiceGet } from 'service/ConsumeService'
import { CORE_BASEURL } from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import consumeServicePost from '../../service/ConsumeService'

const useStyles = makeStyles(styles);



function WithDrawal(props) {

  const [withdrawal, setWithdrawal] = React.useState([]);  
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [mustChange, setMustChange] = React.useState(false);

  const getWithdrawalsForMerchant = (filter, value) => {
    const merchantId = getMerchantId()
    console.log('getting withdrawals ')
    let url = `${CORE_BASEURL}/withdrawal/merchant/${merchantId}`
    consumeServiceGet(callBack, callBackSuccess, url)        
  }

  React.useEffect(() => getWithdrawalsForMerchant(), [mustChange]);

  const callBackSuccess = (withdrawals) => {
    setWithdrawal(withdrawals)    
  }

  const callBackSuccessCreate = (withdrawals) => {
    setIsLoading(false)
    setUpdateMerchant(!props.updateMerchant)
    setMustChange(!mustChange)
    setSuccessMessage("Tu solicitud de retiro fue creada. En 2 días hábiles tus fondos serán transferidos a tu cuenta bancaria.")
  }

  const requestWithdrawal = () => {
    if (isLoading) {
      return
    }
    setErrorMessage("")
    setIsLoading(true)
    consumeServicePost({}, callBackPost, callBackSuccessCreate,
      CORE_BASEURL + "/withdrawal")
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const callBack = (msg) => {
    setWithdrawal([])
    if (msg == 404) {
      setErrorMessage("No hay retiros para mostrar")
    } else {
      setErrorMessage("Error Cargando retiros")
    }
  }
  const callBackPost = (error) => {
    setIsLoading(false)
    if (error != null && typeof error === 'object') {
      setErrorMessage(JSON.stringify(error))
    } else if (error != null && typeof error === 'String') {
      setErrorMessage(error)
    }
    else {
      setErrorMessage('Ha ocurrido un error inesperado por favor contactar al administrador')
    }
  }

  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>

      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
          | <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12} sm={12} md={12} >
                Utiliza el siguiente botón para solicitar retiro del saldo de tu cuenta de EIKOOS. Tu retiro no tiene ningún costo:
                {isLoading
                    ? <><br/><center> <CircularProgress /></center></>
                    : <span></span>
                  }                
                <br /> <br /> <center><Button color="primary" onClick={requestWithdrawal}>Solicitar retiro</Button></center>
              </Grid>              
            </Grid>
          </GridItem>
          {errorMessage != ""
            ?
            <Alert severity="error">{errorMessage}</Alert>
            : <span>	&nbsp;</span>
          }
          {successMessage != ""
            ?
            <Alert severity="success">{successMessage}</Alert>
            : <span>	&nbsp;</span>
          }

          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12}><h2 style={{fontWeight: "500", textAlign: "center"}} className={classes.title}>Retiros</h2></Grid>
              <Grid item xs={12} >
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Valor </TableCell>
                        <TableCell align="right">Fecha de Retiro </TableCell>
                        <TableCell align="right">Comisión</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {withdrawal.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell align="right"><a target="_blank" href={`/withdrawal-detail/${row.id}`} style={{ cursor: "pointer" }}>{formatter.format(row.amount)}</a></TableCell>
                          <TableCell align="right">{
                            getLegibleDate(row.applicationDate)
                          }</TableCell>
                          <TableCell align="right">{formatter.format(row.comision)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(WithDrawal);