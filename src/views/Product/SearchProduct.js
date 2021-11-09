import React from 'react';

import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { makeStyles } from '@material-ui/core/styles';
import styles from "assets/jss/material-kit-react/views/SearchProduct";
import Button from "components/CustomButtons/Button.js";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import consumeServicePost from 'service/ConsumeService'
import { CORE_BASEURL } from 'constant/index'
import Alert from '@material-ui/lab/Alert';
import CardMedia from '@material-ui/core/CardMedia';
import SearchBar from "material-ui-search-bar";
import Select from '@material-ui/core/Select';
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStylesJss = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
        fontWeight: 'bold'
    },
}));

export default function SearchProduct(props) {
    const classes = useStyles();
    const jssclasses = useStylesJss();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [searchText, setSearchText] = React.useState("");
    const [category, setCategory] = React.useState(-1);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        loadDropProducts("", 0, 0)
    }, []);

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

    const loadDropProducts = (localSearchText, localCategory, localCurrentPage) => {
        if (isLoading) {
            return
        }
        const criteriaRequest = [
            {
                key: "dropshipping",
                value: true,
                operation: "EQUAL"
            },
            {
                key: "disabled",
                value: true,
                operation: "NOT_EQUAL"
            },
            {
                key: "inventory",
                value: 0,
                operation: "GREATER_THAN"
            }

        ]
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
        let url = `${CORE_BASEURL}/product/criteria?size=15&pageNumber=${localCurrentPage}`
        setIsLoading(true)
        setErrorMessage("")
        consumeServicePost(criteriaRequest, callBack, callBackSucess, url)
    }

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


    return (
        <div>

            <ResponsiveDrawe />
            <div className={jssclasses.container}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} >
                        <h2 style={{ color: "#000" }} >Productos disponibles</h2>
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
                                    <option value={1}>Mascotas</option>
                                    <option value={2}>Tecnología</option>
                                    <option value={3}>Hogar</option>
                                    <option value={4}>Niños</option>
                                    <option value={5}>Estilo de vida</option>
                                    <option value={7}>Ropa y Calzado</option>
                                    <option value={6}>Otros</option>
                                </Select>
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
                            {isLoading
                                ? <center> <CircularProgress /></center>
                                : <span></span>
                            }
                            {products.map((row) => (
                                <GridItem style={{ paddingBottom: '5vh' }} xs={12} sm={6} md={4} >
                                    <Card className={classes.root}>
                                        <CardHeader
                                            title={row.name ? row.name.substring(0, 16) : 'Sin nombre'}
                                            subheader={row.inventory + " unidades disponibles"}
                                        />
                                        <CardMedia
                                            className={classes.media}
                                            image={row.imageUrlMin}
                                            title={row.name ? row.name : 'Sin nombre'}
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {row.description.substring(0, 20)} ...
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing style={{ textAlign: "center" }}>
                                            <a
                                                href={"/productDetail?idp=" + row.shortId}
                                                target="blank"
                                            >
                                                <Button style={{ left: "20%" }} color="primary" >
                                                    Ver producto
                                                </Button>
                                            </a>
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
            </div>
        </div>
    )
}