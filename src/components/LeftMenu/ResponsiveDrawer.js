import React from 'react';

import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import Fab from '@material-ui/core/Fab';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import { getFirstLetters } from 'util/NameUtils'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import Logo from "assets/img/icon_logo.png"
import Button from "@material-ui/core/Button";
import SellIcon from '@material-ui/icons/Store';
import Collapse from '@material-ui/core/Collapse';



import GroupIcon from '@material-ui/icons/Group';
import { consumeServiceGet } from 'service/ConsumeService'
import { getMerchantName, getMerchantId, getBalanceMerchant, setBalanceMerchant,getRole } from 'service/AuthenticationService'
import { CORE_BASEURL } from 'constant/index'
import styles from "assets/jss/material-kit-react/components/leftMenu";

import SellerMenu from './SellerMenu';
import ProviderMenu from './ProviderMenu';



function ResponsiveDrawer(props) {

  const theme = useTheme();
  const useStyles = makeStyles(styles(theme));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openProviderMenu, setOpenProviderMenu] = React.useState(false);
  const [openSellerMenu, setOpenSellerMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [balance, setBalance] = React.useState(0);
  const [userRole, setUserRole] = React.useState(null);
  const [mustChange, setMustChange] = React.useState(false);

  const history = useHistory();

  function handleClickProv() {
    setOpenProviderMenu(!openProviderMenu)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClickSell() {
    setOpenSellerMenu(!openSellerMenu);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  const logout = () => {
    localStorage.removeItem('currentUser');
    history.push("/login")
  }

  const handleClose = () => {
    setAnchorEl(null);
  };


  const brandComponent = <div><img src={Logo} alt='Mi pago seguro' style={{ width: "50px" }} /><Button className={classes.title}>mipagoseguro</Button></div>;

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: '#2097F3' }} /> : <ChevronLeftIcon style={{ color: '#2097F3' }} />}
        </IconButton>
      </div>
      <Divider />
      <List>
        { !userRole  ?
          <>
            <ListItem button onClick={handleClickSell} key="seller">
              <ListItemIcon><SellIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Vendedor" />
              {openSellerMenu ? <IconExpandLess style={{ color: '#2097F3' }} /> : <IconExpandMore style={{ color: '#2097F3' }} />}
            </ListItem>
            <Collapse in={openSellerMenu} timeout="auto" unmountOnExit>
              <Divider />
              <SellerMenu />
            </Collapse>
            <ListItem button onClick={handleClickProv} key="provider">
              <ListItemIcon><GroupIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Proveedor" />
              {openProviderMenu ? <IconExpandLess style={{ color: '#2097F3' }} /> : <IconExpandMore style={{ color: '#2097F3' }} />}
            </ListItem>
            <Collapse in={openProviderMenu} timeout="auto" unmountOnExit>
              <Divider />
              <ProviderMenu />
            </Collapse>
          </>
          : userRole==="provider"?<ProviderMenu paddingLeft="0"/>:<SellerMenu paddingLeft="0"/>}
        <Divider />
        <ListItem style={{ padding: '0' }}>
          <Button
            href=""
            target="_blank"
            style={{ padding: "0" }}
            className={classes.navLink}
            onClick={handleClickProfile}
          >
            <IconButton aria-label="Perfil"><Avatar style={{ backgroundColor: "rgb(29 143 210)" }} aria-label="recipe">
              {getFirstLetters(getMerchantName())}
            </Avatar>
            </IconButton>
            <ListItemText style={{ color: '#2097F3' }} primary={getMerchantName()} />
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

                <Avatar style={{ backgroundColor: "rgb(29 143 210)" }} aria-label="recipe">
                  { }
                </Avatar>
              </ListItemIcon>              
              <Link to="/profile" >
                < ListItemText primary="Mi Perfil" />
              </Link>
            </StyledMenuItem>
            <StyledMenuItem onClick={logout}>

              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />

            </StyledMenuItem>
          </StyledMenu>
        </ListItem>
        <ListItem>
          {props.updateMerchant ?
            setMustChange(!mustChange) : <></>
          }

          {open
          ?<ListItemText style={{ color: '#2097F3', textAlign: 'center' }} primary={`Tu saldo: ${balance}`} />
          :<ListItemText style={{ color: '#2097F3', textAlign: 'center' }} primary={`${balance}`} /> }
        </ListItem>
      </List>
    </div>
  );

  React.useEffect(() => {
    setBalance(getBalanceMerchant());
    setUserRole(getRole());
    if (localStorage.getItem('isMerchantUpdated')) {
      let url = `${CORE_BASEURL}/merchant/${getMerchantId()}`
      consumeServiceGet(callBack, callBackSuccess, url)
    }
  }, [mustChange])

  const callBack = () => {

  }

  const callBackSuccess = (merchant) => {
    setBalance(merchant.balance)
    setBalanceMerchant(merchant.balance)
    setUserRole(merchant.role)
    localStorage.removeItem("isMerchantUpdated")
  }

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          {brandComponent}
        </Toolbar>

     

        

      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {drawer}
        {open
        ? <Fab onClick={() => history.push('/charge')} style={{ background: '#2097F3', color: 'white' }} variant="extended">
        Recargar
      </Fab>
        :<MonetizationOnOutlinedIcon color="white" onClick={() => history.push('/charge')} style={{cursor: 'pointer',background: '#2097F3', margin: '0 auto', width: '100%', height: '30px', color: 'white' }} />}
        
      </Drawer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    updateMerchant: state.fbReducer.updateMerchant
  }
};

export default connect(mapStateToProps, null)(ResponsiveDrawer);