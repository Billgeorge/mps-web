/*eslint-disable*/
import React from "react";
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from "react-router-dom";
// react components for routing our app without refresh

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from "@material-ui/core/Tooltip";
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {getEmail, getMerchantName} from 'service/AuthenticationService'

// core components

import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";


const useStyles = makeStyles(styles);


const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const getFirstLetters = (name) =>{
    const splittedName = name.split(' ')
    let finalString = ""
    for (var i = 0; i < splittedName.length; i++) {
      finalString = finalString + splittedName[i].charAt(0).toUpperCase()    
    }
    return finalString
  }

export default function HeaderLinksSession(props) {

  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    history.push("/login")
  }

  return (
    <List className={classes.list}>            
      
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
      <ListItem className={classes.listItem}>
      <Button
          href=""
          color="transparent"
          target="_blank"
          style={{padding:"0"}}
          className={classes.navLink}
          onClick={handleClick}
        >          
            <Avatar style={{backgroundColor: "rgb(29 143 210)"}}aria-label="recipe">
                         {getFirstLetters(getMerchantName())}
            </Avatar>  
            
        </Button>
        <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <Avatar style={{backgroundColor: "rgb(29 143 210)"}}aria-label="recipe">
                            {}
            </Avatar>  
          </ListItemIcon>
          <ListItemText primary={getMerchantName()} />
        </StyledMenuItem>
        <StyledMenuItem>
         <ListItemText primary={getEmail()} />
        </StyledMenuItem>
        <StyledMenuItem onClick={logout}>
          
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
          
        </StyledMenuItem>
      </StyledMenu>
      </ListItem>
    </List>
  );
}
