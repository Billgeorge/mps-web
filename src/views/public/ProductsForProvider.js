import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components

import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Avatar from '@material-ui/core/Avatar';


import styles from "assets/jss/material-kit-react/views/profilePage.js";

import consumeServicePost from 'service/ConsumeService'
import { CORE_BASEURL } from 'constant/index'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { getQueyParamFromUrl } from 'util/UrlUtil'
import { getFirstLetters } from 'util/NameUtils'
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import SearchBar from "material-ui-search-bar";
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import { categories } from 'constant/index'
import Pagination from "@material-ui/lab/Pagination";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(styles);
const useStylesJss = makeStyles(styles);

export default function ProductsForProvider(props) {
    const classes = useStyles();
    const jssclasses = useStylesJss();
    const [products, setProducts] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [merchantName, setMerchantname] = React.useState("");
    const [firstLetters, setFirstLetters] = React.useState("");
    const [category, setCategory] = React.useState(-1);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [searchText, setSearchText] = React.useState("");

    const handleChange = (event, page) => {
        setCurrentPage(page - 1)
        loadDropProducts(searchText, category, page - 1)
    }

    const handleChangeCategory = (event) => {
        let value = event.target.value
        setCategory(value)
        setCurrentPage(0)
        loadDropProducts(searchText, value, 0)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const callBack = (msg) => {
        setIsLoading(false)
        setProducts([])
        if (msg == 404) {
            setErrorMessage("No hay productos para mostrar")
        } else {
            setErrorMessage("Error Cargando productos")
        }
    }

    const callBackSucess = (products) => {
        setIsLoading(false)
        setTotalPages(products.totalPages)
        setProducts(products.products)
    }

    const loadDropProducts = (localSearchText, localCategory, localCurrentPage) => {
        if (isLoading) {
            return
        }
        const criteriaRequest = []
        if (localCategory > 0) {
            criteriaRequest.push(
                {
                    key: "category",
                    value: localCategory,
                    operation: "EQUAL"
                }
            )
        }
        if (localSearchText) {
            criteriaRequest.push(
                {
                    key: "name",
                    value: localSearchText,
                    operation: "MATCH"
                }
            )
        }
        let url = `${CORE_BASEURL}/product/public/criteria?pageNumber=${localCurrentPage}&name=${getQueyParamFromUrl("nombre")}`
        setIsLoading(true)
        setErrorMessage("")
        consumeServicePost(criteriaRequest, callBack, callBackSucess, url)
    }


    React.useEffect(() => {
        let name = getQueyParamFromUrl("nombre")
        setFirstLetters(getFirstLetters(name))
        setMerchantname(name)
        loadDropProducts("", 0, 0)
    }, []);

    const handleClose = () => {
        setOpen(false);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Parallax style={{ paddingLeft: '100px' }} small filter image={require("assets/img/profile-bg.jpg")} />
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={6}>
                                <div className={classes.profile}>
                                    <div>
                                        <Avatar aria-label="profile name" className={classes.avatar}>
                                            {firstLetters}
                                        </Avatar>
                                    </div>
                                    <div className={classes.name}>
                                        <h3 className={classes.title}>{merchantName}</h3>
                                    </div>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer justify="center" style={{ marginLeft: '0', marginRight: '0' }}>
                            <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                                <NavPills
                                    alignCenter
                                    color={'blue'}
                                    tabs={[
                                        {
                                            tabButton: "Perfil",
                                            tabIcon: Person,
                                            tabContent: (
                                                <GridContainer>
                                                    <GridItem xs={12} sm={12} md={12} >
                                                        <h2 style={{ color: "#000" }} className={jssclasses.title} >Productos disponibles</h2>
                                                        <GridContainer>
                                                            <GridItem xs={12} sm={12} md={6} className={classes.grid}>
                                                                <SearchBar
                                                                    value={searchText}
                                                                    placeholder="Qué buscas?"
                                                                    onChange={(newValue) => setSearchText(newValue)}
                                                                    onCancelSearch={() => { setSearchText(''); loadDropProducts("", category, 0) }}
                                                                    onRequestSearch={(event) => { setCurrentPage(0); loadDropProducts(searchText, category, 0) }}
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

                                                            <GridItem style={{ marginTop: '15px' }} xs={12} sm={12} md={12} >
                                                                <Pagination
                                                                    count={totalPages}
                                                                    size="large"
                                                                    page={currentPage + 1}
                                                                    variant="outlined"
                                                                    shape="rounded"
                                                                    onChange={handleChange}
                                                                />
                                                            </GridItem>
                                                            {isLoading
                                                                ? <center> <CircularProgress /></center>
                                                                : <span></span>
                                                            }
                                                            {products.map((row) => (
                                                                <GridItem style={{ paddingBottom: '5vh' }} xs={12} sm={6} md={4} >
                                                                    <Card className={classes.root}>
                                                                        <CardHeader
                                                                            title={row.name ? row.name.substring(0, 16) : 'Sin nombre'}
                                                                        />
                                                                        <CardMedia
                                                                            className={classes.media}
                                                                            image={row.imageUrlMin}
                                                                            title={row.name ? row.name : 'Sin nombre'}
                                                                        />
                                                                        <CardContent>
                                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                                {row.description.substring(0, 20)} ...<br />
                                                                                precio distribuidor: {formatter.format(row.dropshippingPrice)}<br />
                                                                                precio sugerido de venta: {formatter.format(row.finalPrice)}
                                                                            </Typography>
                                                                        </CardContent>
                                                                        <CardActions disableSpacing style={{ textAlign: "center" }}>
                                                                            <Button onClick={handleClickOpen} style={{ left: "20%" }} color="primary" >
                                                                                Ver producto
                                                                            </Button>
                                                                        </CardActions>
                                                                    </Card>
                                                                </GridItem>
                                                            ))}
                                                            {errorMessage != ""
                                                                ?
                                                                <Alert severity="error">{errorMessage}</Alert>
                                                                : <span>	&nbsp;</span>
                                                            }
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
                                                        </GridContainer>
                                                    </GridItem>
                                                </GridContainer>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                        </GridContainer>
                    </div>
                </div>
            </div >
            <Footer />
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"¿Deseas ver la información del producto?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Para ver el detalle de los productos es necesario que te registres.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: "0 auto" }}>
                    <Button color="primary" component={Link} to="/registro?rol=seller">Registrarme</Button>
                    <Button onClick={handleClose}>Seguir viendo</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
