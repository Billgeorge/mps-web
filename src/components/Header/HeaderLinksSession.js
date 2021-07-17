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
import ListItemText from '@material-ui/core/ListItemText';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { getMerchantName} from 'service/AuthenticationService'

import {getFirstLetters} from 'util/NameUtils'

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
        <Button
            color="transparent"
            href="dashboard"
            className={classes.navLink}
          >
            Dashboard
        </Button>
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
          <ListItemText primary={getMerchantName()} />
        </StyledMenuItem>
        <StyledMenuItem>
        
        <ListItemIcon>
          
            <Avatar style={{backgroundColor: "rgb(29 143 210)"}}aria-label="recipe">
                            {}
            </Avatar>  
          </ListItemIcon>
          <a href="profile">
          < ListItemText primary="Mi Perfil" />
          </a>
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
