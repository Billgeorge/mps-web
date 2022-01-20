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
import SplitButton from 'components/SplitButton/SplitButton';
import Pagination from "@material-ui/lab/Pagination";
import {categories} from 'constant/index'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);



export default function ProductDropBoard() {

  const [products, setProductsl] = React.useState({
    content: []
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [category, setCategory] = React.useState(-1);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchText, setSearchText] = React.useState("");
  const [totalPages, setTotalPages] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => getProductsForMerchant("", 0, 0), []);

  const callBackSuccess = (products) => {
    setProductsl(products)
    setIsLoading(false)
    setTotalPages(products.totalPages)
    if (products.length == 0) {
      setErrorMessage("No hay productos para mostrar")
    }
  }

  const copyUrl = (id) => {
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
    navigator.clipboard.writeText(baseUrl + "checkout?idc=" + id);
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
              <Grid item xs={12}><h2 className={classes.title}>Tus Productos Dropshipping</h2></Grid>
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
              <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>
                  <Grid item xs={12} sm={12} md={12} >
                    A continuación ves los productos dropshiṕping que vinculaste:
                  </Grid>
                </Grid>
              </GridItem>
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
              <Grid item xs={12} >
                {isLoading
                  ? <center> <CircularProgress /></center>
                  : <span></span>
                }
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Precio de compra</TableCell>
                        <TableCell align="center">Precio de venta</TableCell>
                        <TableCell align="center">Inventario</TableCell>
                        <TableCell align="center">Url checkout</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.content.map((row) => (
                        <TableRow>
                          <TableCell align="center"><Link to={"productDetail?idp=" + row.product.id.slice(-6)+"&vw=true"}>{row.product.name}</Link></TableCell>
                          <TableCell align="center">{
                            formatter.format(row.product.dropshippingPrice)
                          }</TableCell>
                          <TableCell align="center">{
                            formatter.format(row.amount)
                          }</TableCell>
                          <TableCell align="center">{row.product.inventory}</TableCell>
                          <TableCell align="right"><center><Button onClick={() => copyUrl(row.id)} color="primary">Copiar Enlace</Button></center></TableCell>
                          <TableCell align="center">
                            <SplitButton options={[
                              { label: "Editar", action: "/edit-checkout?idp=" + row.id },
                              { label: "Ver Promociones", action: "/promotions?idc=" + row.id }
                            ]} ></SplitButton>
                          </TableCell>
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