import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import Logo from "assets/img/icon_logo.png"
import Button from "@material-ui/core/Button";
import styles from "assets/jss/material-kit-react/components/leftMenu";



export default function PublicMenu(props) {

    const theme = useTheme();
    const useStyles = makeStyles(styles(theme));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const brandComponent = <div><img src={Logo} alt='EIKOOS venta por catálogo' style={{ width: "50px" }} /><Button className={classes.title}>EIKOOS</Button></div>;


    return (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >

                <Toolbar>
                    {brandComponent}
                </Toolbar>
            </AppBar>
        </div>
    );
}