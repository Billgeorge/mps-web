import React from 'react';

import GridContainer from 'components/Grid/GridContainer';
import { makeStyles } from '@material-ui/core/styles';
import styles from "assets/jss/material-kit-react/views/PublicProducts";
import CatalogueProducts from './CatalogueProducts';
import CatalogueProductDetail from './CatalogueProductDetail';
import PublicMenu from 'components/LeftMenu/PublicMenu';
import CatalogueCart from './CatalogueCart';
import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined';
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem";

const useStylesJss = makeStyles(styles);

export default function Catalogue(props) {

    const jssclasses = useStylesJss();
    const [view, setView] = React.useState("catalogue");
    const [currentProduct, setCurrentProduct] = React.useState({});
    const [catalogueContent, setCatalogueContent] = React.useState({
        products: []
    });
    const [orderProducts, setOrderProducts] = React.useState([]);

    const viewProduct = (product) => {
        setCurrentProduct(product)
        setView("product")
    };

    const viewCatalogue = (product) => {
        console.log("orderProducts", orderProducts)
        setView("catalogue")
    };

    const viewCart = () => {
        setView("cart")
    };

    return (
        <div>
            <PublicMenu />
            <div className={jssclasses.container}>

                <h2 style={{ color: "#000" }} className={jssclasses.title} >Catálogo vendedor: {catalogueContent.sellerName}</h2>
                <GridContainer>

                    <GridItem xs={12} sm={12} md={12} style={{ textAlign: "left" }} >
                        <Button onClick={viewCart} style={{backgroundColor:"#3f51b5"}} variant="outlined" startIcon={<ShoppingCart />}>
                            Ver pedido
                        </Button>
                    </GridItem>
                    <br />
                    {view === "catalogue" ?
                        <CatalogueProducts viewProduct={viewProduct} catalogueContent={catalogueContent} setCatalogueContent={setCatalogueContent} />
                        : <></>}
                    {view === "product" ?
                        <CatalogueProductDetail viewCart={viewCart} viewCatalogue={viewCatalogue} setOrderProducts={setOrderProducts} product={currentProduct} />
                        : <></>}
                    {view === "summaryOrder" ?
                        <CatalogueProducts />
                        : <></>}
                    {view === "cart" ?
                        <CatalogueCart setOrderProducts={setOrderProducts} viewCatalogue={viewCatalogue} orderProducts={orderProducts} />
                        : <></>}
                </GridContainer>
            </div>
        </div>
    )
}