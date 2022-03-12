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
import AssistantIcon from '@material-ui/icons/Assistant';
import Group from '@material-ui/icons/GroupWork';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


export default function ProviderMenu(props) {

    const theme = useTheme();
    const useStyles = makeStyles(styles(theme));
    const classes = useStyles();

    return (
        <List component="div" style={{ paddingLeft: props.paddingLeft ? props.paddingLeft : '15px' }}>

            <Link to="/dashboard-dropprovider" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><ReceiptIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Tus ordenes" />
                </ListItem>
            </Link>
            <Link to="/product" >
                <ListItem button className={classes.menuItem}>
                    <ListItemIcon ><EditIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Tus productos" />
                </ListItem>
            </Link>
            <Link to="/branch" >
                <ListItem button key="branch">
                    <ListItemIcon><HomeWork style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Bodegas" />
                </ListItem>
            </Link>
            <Link to="/private-inventory" >
                <ListItem button key="private-inventory">
                    <ListItemIcon><AssistantIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Inventarios exclusivos" />
                </ListItem>
            </Link>
            <Link to="/sellers" >
                <ListItem button key="sellers">
                    <ListItemIcon><Group style={{ color: '#2097F3' }} /></ListItemIcon>
                    <ListItemText style={{ color: '#2097F3' }} primary="Tus vendedores" />
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