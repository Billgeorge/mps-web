import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from "components/CustomButtons/Button.js";
import { Link } from 'react-router-dom';

import Alert from '@material-ui/lab/Alert';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";

import { consumeServiceGetFile, consumeServiceGet } from 'service/ConsumeService'
import consumeServicePost from 'service/ConsumeService'
import { CORE_BASEURL } from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import SplitButton from 'components/SplitButton/SplitButton';
import Pagination from "@material-ui/lab/Pagination";

import { useHistory } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { categories } from 'constant/index'

const useStyles = makeStyles(styles);



export default function ProductBoard(props) {

  const [products, setProductsl] = React.useState({
    content: []
  });
  const [isChecked, setIsCHecked] = React.useState(false);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [idsToDelete, setIdsToDelete] = React.useState([]);
  const [mustChange, setMustChange] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [category, setCategory] = React.useState(-1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => searchProductByFilter("", 0, currentPage), [mustChange]);

  const callBackSuccess = (products) => {
    setIsLoading(false)
    setTotalPages(products.totalPages)
    setProductsl(products)
  }

  const history = useHistory();

  const createProduct = () => {
    history.push("create-product")
  }

  const createProductTxt = () => {
    history.push("create-product-batch")
  }

  const updateProductTxt = () => {
    history.push("update-product-batch")
  }

  const deleteProducts = () => {
    let url = `${CORE_BASEURL}/product/delete`
    consumeServicePost({
      ids: idsToDelete
    }, callBackDelete, callBackSucess, url)
  }
  const callBackSucess = () => {
    setMustChange(!mustChange)
    setSuccessMessage("Productos eliminados")
  }

  const handleChange = (event, page) => {
    setCurrentPage(page - 1)
    searchProductByFilter(searchText, category, page - 1)
  }

  const handleChangeCategory = (event) => {
    let value = event.target.value
    setCategory(value)
    setCurrentPage(0)
    searchProductByFilter(searchText, value, currentPage)
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

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const callBackDownload = (msg) => {
    setErrorMessage("Error descargando archivo")
  }

  const callBack = (msg) => {
    setIsLoading(false)
    setProductsl({
      content: []
    })
    if (msg == 404) {
      setErrorMessage("No hay productos para mostrar")
    } else {
      setErrorMessage("Error Cargando productos")
    }
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

  const classes = useStyles();
  const { ...rest } = props;

  const downloadProductFile = () => {
    const url = CORE_BASEURL + "/product/batch"
    consumeServiceGetFile(callBackDownload, url)
  }

  const searchProductByFilter = (searchText, category, currentPage) => {
    if (isLoading) {
      return
    }
    setErrorMessage("")
    let url = `${CORE_BASEURL}/product/filter?size=15&pageNumber=${currentPage}`
    console.log('getting products ')
    if (category > 0) {
      url = `${url}&category=${category}`
    }
    if (searchText) {
      url = `${url}&searchText=${searchText}`
    }
    setIsLoading(true)
    consumeServiceGet(callBack, callBackSuccess, url)
  }

  return (
    <div>

      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12}><h2>Productos</h2></Grid>
              <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>
                  <Grid item xs={12} sm={12} md={12} >
                    A continuación ves los productos que has creado, cada producto siempre tendrá la misma url.
                  </Grid>
                </Grid>
              </GridItem>
              <GridItem xs={12} sm={12} md={6} className={classes.grid}>
                <SearchBar
                  value={searchText}
                  placeholder="Qué buscas?"
                  onChange={(newValue) => setSearchText(newValue)}
                  onCancelSearch={() => { setSearchText(''); searchProductByFilter("", category, 0) }}
                  onRequestSearch={(event) => { setCurrentPage(0); searchProductByFilter(searchText, category, 0) }}
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
                <Button style={{ marginLeft: "10px" }} color="primary" onClick={createProductTxt}> Crear productos desde archivo</Button>
                <Button style={{ marginLeft: "10px" }} color="primary" onClick={createProduct}> Crear producto</Button>
                <Button style={{ marginLeft: "10px" }} color="primary" disabled={!isEnabled} onClick={deleteProducts} > Eliminar seleccionados</Button>
              </Grid>
              <Grid item xs={12}>
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
                        <TableCell align="center">Sku</TableCell>
                        <TableCell align="center">Valor</TableCell>
                        <TableCell align="center">Inventario</TableCell>                        
                        <TableCell align="center">Acciones</TableCell>
                        <TableCell align="center">DropShipping</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.content.map((row) => (
                        <TableRow key={row.shortId}>
                          <TableCell align="center">
                            <center>
                              <input
                                type="checkbox"
                                className="productCheck"
                                id={row.shortId}
                                value={row.shortId}
                                defaultChecked={isChecked}
                                color="primary"
                                onChange={validatedChecked}
                              />
                            </center>
                          </TableCell>
                          <TableCell align="center"><Link to={"productDetail?idp=" + row.id.slice(-6) + "&vw=true"}>{row.name}</Link></TableCell>
                          <TableCell align="center">{row.sku ? row.sku : 'Vacío'}</TableCell>
                          <TableCell align="center">{
                            formatter.format(row.amount)
                          }</TableCell>
                          <TableCell align="center">{row.inventory}</TableCell>                          
                          <TableCell align="center">
                            <SplitButton options={[
                              { label: "Editar Inventario", action: "/edit-product-inventory?idp=" + row.id },
                              { label: "Editar Producto", action: "/edit-product?idp=" + row.shortId }
                            ]} ></SplitButton>
                          </TableCell>
                          <TableCell align="center">{row.dropshipping ? "Si" : "No"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  count={totalPages}
                  size="large"
                  page={currentPage + 1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChange}
                />
                <br />
                <Grid item xs={12} className={classes.grid}>
                  <Button style={{ marginLeft: "10px" }} onClick={downloadProductFile} color="primary">
                    Descargar productos
                  </Button>
                  <Button style={{ marginLeft: "10px" }} color="primary" onClick={updateProductTxt}>
                    Actualizar productos desde archivo
                  </Button>
                </Grid>
              </Grid>
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