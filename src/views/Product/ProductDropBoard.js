import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Select from '@material-ui/core/Select';

import Button from "components/CustomButtons/Button.js";

import Alert from '@material-ui/lab/Alert';

import Table from '@material-ui/core/Table';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";
import SearchBar from "material-ui-search-bar";

import consumeServicePost from 'service/ConsumeService'
import { CORE_BASEURL } from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import Pagination from "@material-ui/lab/Pagination";
import { categories } from 'constant/index'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);



export default function ProductDropBoard() {

  const [products, setProductsl] = React.useState({
    content: []
  });
  const [isChecked, setIsChecked] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [category, setCategory] = React.useState(-1);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [idsToDelete, setIdsToDelete] = React.useState([]);
  const [mustChange, setMustChange] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isEnabled, setIsEnabled] = React.useState(false);

  React.useEffect(() => getProductsForMerchant("", 0, 0), [mustChange]);

  const callBackSuccess = (products) => {
    setProductsl(products)
    setIsLoading(false)
    setTotalPages(products.totalPages)
    if (products.length == 0) {
      setErrorMessage("No hay productos para mostrar")
    }
  }

  const validatedChecked = (event) => {

    let cont = 0
    if (event.target.checked) {
      if (idsToDelete.indexOf(event.target.value) === -1) {
        cont++
        idsToDelete.push(event.target.value)
      }
    } else {
      if (idsToDelete.indexOf(event.target.value) !== -1) {
        cont--
        idsToDelete.splice(idsToDelete.indexOf(event.target.value), 1)
      }
    }
    if (cont > 0) {
      setIsEnabled(true)
    } else {
      setIsEnabled(false)
    }
    console.log("array", idsToDelete)
  }

  const handleChangeCategory = (event) => {
    let value = event.target.value
    setCategory(value)
    setCurrentPage(0)
    getProductsForMerchant(searchText, value, 0)
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const callBack = (msg) => {
    setProductsl({
      content: []
    })
    setIsLoading(false)
    if (msg == 404) {
      setErrorMessage("No hay productos para mostrar")
    } else {
      setErrorMessage("Error Cargando productos")
    }
  }

  const deleteProducts = () => {
    let url = `${CORE_BASEURL}/dropshippingsale/delete`
    consumeServicePost(
      idsToDelete,
     callBackDelete, callBackSucess, url)
  }
  const callBackSucess = () => {
    setMustChange(!mustChange)
    setSuccessMessage("Productos eliminados")
  }

  const callBackDelete = (error) => {
    if (error != null && typeof error === 'object') {
      setErrorMessage(error)
    } else if (error != null && typeof error === 'string') {
      setErrorMessage({ 'Error': error })
    }
    else {
      setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
    }
  }

  const getProductsForMerchant = (localSearchText, localCategory, localCurrentPage) => {

    console.log('getting drop products ')
    if (isLoading) {
      return
    }
    const criteriaRequest = [
      {
        key: "disabled",
        value: true,
        operation: "NOT_EQUAL"
      }
    ]
    if (localCategory > 0) {
      criteriaRequest.push(
        {
          key: "product",
          value: localCategory,
          operation: "PRODUCT_CATEGORY_EQUAL"
        }
      )
    }
    if (localSearchText) {
      criteriaRequest.push(
        {
          key: "product",
          value: localSearchText,
          operation: "PRODUCT_NAME_MATCH"
        }
      )
    }
    let url = `${CORE_BASEURL}/dropshippingsale/criteria?size=15&pageNumber=${localCurrentPage}`
    setIsLoading(true)
    setErrorMessage("")
    consumeServicePost(criteriaRequest, callBack, callBackSuccess, url)
  }

  const handleChange = (event, page) => {
    setCurrentPage(page - 1)
    getProductsForMerchant(searchText, category, page - 1)
  }

  const classes = useStyles();

  return (
    <div>

      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12}><h2 className={classes.title}>Los productos de tu catálogo</h2></Grid>
              <GridItem xs={12} sm={12} md={6} className={classes.grid}>
                <SearchBar
                  value={searchText}
                  placeholder="Qué buscas?"
                  onChange={(newValue) => setSearchText(newValue)}
                  onCancelSearch={() => { setSearchText(''); getProductsForMerchant("", category, 0) }}
                  onRequestSearch={(event) => { setCurrentPage(0); getProductsForMerchant(searchText, category, 0) }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6} style={{ marginTop: '15px' }} className={classes.grid}>
                <Select native
                  value={category}
                  onChange={handleChangeCategory}
                  label="Categoría"
                  inputProps={{
                    name: 'category',
                    id: 'category',
                  }}
                >
                  <option value={0}>Categorías</option>
                  {

                    categories.map(function (category) {
                      return <option value={category.category}>{category.name}</option>;
                    })

                  }
                </Select>
              </GridItem>
              <Grid item xs={12}>
                <Button style={{ marginLeft: "10px" }} color="primary" disabled={!isEnabled} onClick={deleteProducts} > Eliminar seleccionados</Button>
              </Grid>
              <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>
                  <Grid item xs={12} sm={12} md={12} >
                    A continuación ves los productos que vinculaste para vender:
                  </Grid>
                </Grid>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} >
                {successMessage != ""
                  ?
                  <Alert severity="success">{successMessage}</Alert>
                  : <span>	&nbsp;</span>
                }
                <Pagination
                  count={totalPages}
                  size="large"
                  page={currentPage + 1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChange}
                />
              </GridItem>
              <Grid item xs={12} >
                {isLoading
                  ? <center> <CircularProgress /></center>
                  : <span></span>
                }
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Precio de compra</TableCell>
                        <TableCell align="center">Precio de venta</TableCell>
                        <TableCell align="center">Inventario</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.content.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align="center">
                            <center>
                              <input
                                type="checkbox"
                                className="productCheck"
                                id={row.id}
                                value={row.id}
                                defaultChecked={isChecked}
                                color="primary"
                                onChange={validatedChecked}
                              />
                            </center>
                          </TableCell>
                          <TableCell align="center"><Link to={"productDetail?idp=" + row.productId.slice(-6) + "&vw=true"}>{row.name}</Link></TableCell>
                          <TableCell align="center">{
                            formatter.format(row.distributionPrice)
                          }</TableCell>
                          <TableCell align="center">{
                            formatter.format(row.consumerPrice)
                          }</TableCell>
                          <TableCell align="center">{row.inventory}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <GridItem xs={12} sm={12} md={12} >
                <Pagination
                  count={totalPages}
                  size="large"
                  page={currentPage + 1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChange}
                />
              </GridItem>
            </Grid>
          </GridItem>
          {errorMessage != ""
            ?
            <Alert severity="error">{errorMessage}</Alert>
            : <span>	&nbsp;</span>
          }
        </GridContainer>
      </div>
      <Footer />
    </div>



  );
}