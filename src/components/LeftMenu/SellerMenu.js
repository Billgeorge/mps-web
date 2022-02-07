import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from "assets/jss/material-kit-react/components/leftMenu";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import ReceiptIcon from '@material-ui/icons/Receipt';
import PieChartIcon from '@material-ui/icons/PieChart';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import StarsIcon from '@material-ui/icons/Stars';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';



export default function SellerMenu(props) {

    const theme = useTheme();
    const useStyles = makeStyles(styles(theme));
    const classes = useStyles();

    return (

        <List component="div" style={{ paddingLeft: props.paddingLeft ? props.paddingLeft : '15px' }}>

            <Link to="/dashboard-dropseller" >
                <ListItem button className={classes.menuItem}>

                    <ListItemIcon ><ReceiptIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Tus ordenes" />

                </ListItem>
            </Link>
            <Link to="/result" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><PieChartIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Resumen" />
                </ListItem>
            </Link>
            <Link to="/dashboard" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><PaymentIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Pagos" />
                </ListItem>
            </Link>
            <Link to="/product-drop" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><LocalConvenienceStoreIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Tus productos" />
                </ListItem>
            </Link>
            <Link to="/search-product" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><ImageSearchIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Buscar producto" />
                </ListItem>
            </Link>
            <Link to="/private-product" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><StarsIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Productos privados" />
                </ListItem>
            </Link>
            <Link to="/withdrawal" >
                <ListItem button key="withdrawal">
                    <ListItemIcon><AccountBalanceIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Retiros" />
                </ListItem>
            </Link>
        </List>

    );

}