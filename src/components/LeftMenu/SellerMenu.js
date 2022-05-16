import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from "assets/jss/material-kit-react/components/leftMenu";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import ReceiptIcon from '@material-ui/icons/Receipt';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PeopleIcon from '@material-ui/icons/People';



export default function SellerMenu(props) {

    const theme = useTheme();
    const useStyles = makeStyles(styles(theme));
    const classes = useStyles();

    return (

        <List component="div" style={{ paddingLeft: props.paddingLeft ? props.paddingLeft : '15px' }}>

            <Link to="/orders-seller" >
                <ListItem button className={classes.menuItem}>

                    <ListItemIcon ><ReceiptIcon style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Tus ordenes" />

                </ListItem>
            </Link>           
            <Link to="/dashboard" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><PaymentIcon style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Pagos" />
                </ListItem>
            </Link>
            <Link to="/product-drop" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><LocalConvenienceStoreIcon style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Tus productos" />
                </ListItem>
            </Link>
            <Link to="/search-product" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><ImageSearchIcon style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Buscar producto" />
                </ListItem>
            </Link>
            <Link to="/withdrawal" >
                <ListItem button key="withdrawal">
                    <ListItemIcon><AccountBalanceIcon style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Retiros" />
                </ListItem>
            </Link> 
            <Link to="/referral" >
                <ListItem button key="referral">
                    <ListItemIcon><PeopleIcon style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Referidos" />
                </ListItem>
            </Link>              
        </List>

    );

}