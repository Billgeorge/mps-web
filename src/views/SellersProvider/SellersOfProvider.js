import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Alert from '@material-ui/lab/Alert';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";

import { consumeServiceGet } from 'service/ConsumeService'
import { CORE_BASEURL } from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);



export default function SellersOfProvider(props) {

  const [sellers, setSellers] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [ mustChange, setMustChange] = React.useState(false);

  React.useEffect(() => getPrivateInventoriesForProvider(), [mustChange]);

  const callBackSuccess = (sellers) => {
    setSellers(sellers)
  }

  const history = useHistory();


  const callBack = (error) => {
    setSellers([])
    if (error == 404) {
      setErrorMessage("Ningún vendedor ha asociado tus productos")
    } else {
      setErrorMessage("Error obteniendo vendedores")
    }
  }


  const getPrivateInventoriesForProvider = (filter, value) => {
    console.log('getting sellers ')
    let url = `${CORE_BASEURL}/provider/sellers`
    consumeServiceGet(callBack, callBackSuccess, url)
  }

  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>

      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12}><h2>Tus vendedores</h2></Grid>
              <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>
                  <Grid item xs={12} sm={12} md={12} >
                    A continuación ves los vendedores que han vinculado tus productos
                  </Grid>
                </Grid>
              </GridItem>
              <Grid item xs={12} >
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Correo</TableCell>
                        <TableCell align="center">Número de contacto</TableCell>
                        <TableCell align="center">Productos vinculados</TableCell>                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sellers.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.contactNumber}</TableCell>
                          <TableCell align="center">{row.linkedProduct}</TableCell>                         
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
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
        </GridContainer>
      </div>
      <Footer />
    </div>



  );
}