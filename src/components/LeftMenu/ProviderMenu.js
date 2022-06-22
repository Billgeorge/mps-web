import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from "assets/jss/material-kit-react/components/leftMenu";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';

import ReceiptIcon from '@material-ui/icons/Receipt';
import EditIcon from '@material-ui/icons/Edit';
import HomeWork from '@material-ui/icons/HomeWork';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


export default function ProviderMenu(props) {

    const theme = useTheme();
    const useStyles = makeStyles(styles(theme));
    const classes = useStyles();

    return (
        <List component="div" style={{ paddingLeft: props.paddingLeft ? props.paddingLeft : '15px' }}>

            <Link to="/dashboard-dropprovider" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><ReceiptIcon style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Ordenes de corte" />
                </ListItem>
            </Link>
            <Link to="/product" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><EditIcon style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Tus productos" />
                </ListItem>
            </Link>
            <Link to="/branch" >
                <ListItem button key="branch">
                    <ListItemIcon><HomeWork style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Bodegas" />
                </ListItem>
            </Link>           
            <Link to="/withdrawal" >
                <ListItem button key="withdrawal">
                    <ListItemIcon><AccountBalanceIcon style={{ color: '#44169E' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#44169E' }} primary="Retiros" />
                </ListItem>
            </Link>
        </List>
    );

}