/*eslint-disable*/
import React from "react";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { SentimentVerySatisfied, Accessibility } from "@material-ui/icons";

// core components

import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
            href="/registro"
            color="transparent"          
            className={classes.navLink}
          >
            <SentimentVerySatisfied className={classes.icons} /> Registrarse
        </Button>
        <Button
            href="/login"
            color="transparent"          
            className={classes.navLink}
          >
            <Accessibility className={classes.icons} /> Iniciar Sesión
        </Button>
      </ListItem>      
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Siguenos en facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/Mipagoseguro-100633465045107/?ref=py_c"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Siguenos en instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/mipagoseguro.col/?hl=es-la"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
