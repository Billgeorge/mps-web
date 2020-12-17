import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme,withStyles } from '@material-ui/core/styles';

import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


import Avatar from '@material-ui/core/Avatar';
import {getMerchantName} from 'service/AuthenticationService'
import {getFirstLetters} from 'util/NameUtils'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";

import Logo from "assets/img/icon_logo.png"
import Button from "@material-ui/core/Button";

const drawerWidth = 60;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'    
  },
  title: {
    lineHeight: "30px",
    fontSize: "1.5em",
    fontFamily: 'Dosis, sans-serif',
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    padding: "8px 16px",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      color: "inherit",
      background: "transparent"
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor:'#2097F3',    
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,      
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

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

export function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem('currentUser');
    history.push("/login")
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const brandComponent =<div><img src={Logo} style={{width:"50px"}}/><Button className={classes.title}>mipagoseguro</Button></div>;

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem>
          <Button href="/dashboard">
            <ListItemIcon> <DashboardIcon style={{color:'#2097F3'}} /></ListItemIcon> 
          </Button>                   
        </ListItem>
        <ListItem>
            <Button href="/withdrawal">
              <ListItemIcon> <AccountBalanceIcon style={{color:'#2097F3'}} /></ListItemIcon>
            </Button>                    
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem style={{padding:'0'}}>
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
              <a href="/profile">
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
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{backgroundColor:'while !important'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {brandComponent}        
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>      
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;