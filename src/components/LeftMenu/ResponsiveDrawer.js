import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import LocalConvenienceStoreIcon from '@material-ui/icons/LocalConvenienceStore';
import Fab from '@material-ui/core/Fab';

import StarsIcon from '@material-ui/icons/Stars';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeWork from '@material-ui/icons/HomeWork';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import DashboardIcon from '@material-ui/icons/Dashboard';
import StoreIcon from '@material-ui/icons/Storefront';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import clsx from 'clsx';


import Avatar from '@material-ui/core/Avatar';
import { getFirstLetters } from 'util/NameUtils'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";

import Logo from "assets/img/icon_logo.png"
import Button from "@material-ui/core/Button";
import ReceiptIcon from '@material-ui/icons/Receipt';
import PaymentIcon from '@material-ui/icons/Payment';
import EditIcon from '@material-ui/icons/Edit';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Collapse from '@material-ui/core/Collapse'
import AssistantIcon from '@material-ui/icons/Assistant';
import PieChartIcon from '@material-ui/icons/PieChart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { consumeServiceGet } from 'service/ConsumeService'
import { getMerchantName,getMerchantId,getBalanceMerchant,setBalanceMerchant} from 'service/AuthenticationService'
import {CORE_BASEURL} from 'constant/index'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#2097F3',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



export function ResponsiveDrawer(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openProductMenu, setOpenProductMenu] = React.useState(false);
  const [openBranchMenu, setOpenBranchMenu] = React.useState(false);
  const [openDashMenu, setOpenDashMenu] = React.useState(false);
  const [openDashDropMenu, setOpenDashDropMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [balance, setBalance] = React.useState(getBalanceMerchant());
  const history = useHistory();

  function handleClick() {
    setOpenProductMenu(!openProductMenu)
  }

  function handleClickBranch() {
    setOpenBranchMenu(!openBranchMenu)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClickProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClickDash() {
    setOpenDashMenu(!openDashMenu);
  };

  function handleClickDashDrop() {
    setOpenDashDropMenu(!openDashDropMenu);
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


  const brandComponent = <div><img src={Logo} style={{ width: "50px" }} /><Button className={classes.title}>mipagoseguro</Button></div>;

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: '#2097F3' }} /> : <ChevronLeftIcon style={{ color: '#2097F3' }} />}
        </IconButton>
      </div>
      <Divider />
      <List>

        <ListItem button onClick={handleClickDash} key="dashboard">
          <ListItemIcon><DashboardIcon style={{ color: '#2097F3' }} /></ListItemIcon>
          <ListItemText style={{ color: '#2097F3' }} primary="Consolidado" />
          {openDashMenu ? <IconExpandLess style={{ color: '#2097F3' }} /> : <IconExpandMore style={{ color: '#2097F3' }} />}
        </ListItem>
        <Collapse in={openDashMenu} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" style={{ paddingLeft: '15px' }}>
            <ListItem button onClick={handleClickDashDrop} key="dashboard">
              <ListItemIcon><ShoppingCartIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Dropshipper" />
              {openDashDropMenu ? <IconExpandLess style={{ color: '#2097F3' }} /> : <IconExpandMore style={{ color: '#2097F3' }} />}
            </ListItem>
            <Collapse in={openDashDropMenu} timeout="auto" unmountOnExit>
              <Divider />
              <List component="div" style={{ paddingLeft: '15px' }}>
                <ListItem button component="a" href="/dashboard-dropseller" className={classes.menuItem}>
                  <ListItemIcon ><ReceiptIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                  <ListItemText style={{ color: '#2097F3' }} primary="Ordenes drop" />
                </ListItem>
                <ListItem button component="a" href="/result" className={classes.menuItem}>
                  <ListItemIcon ><PieChartIcon style={{ color: '#2097F3' }} /></ListItemIcon>
                  <ListItemText style={{ color: '#2097F3' }} primary="Resumen" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button component="a" href="/dashboard-dropprovider" className={classes.menuItem}>
              <ListItemIcon ><ReceiptIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Ordenes proveedor" />
            </ListItem>
            <ListItem button component="a" href="/dashboard" className={classes.menuItem}>
              <ListItemIcon ><PaymentIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Pagos" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleClick} key="product">
          <ListItemIcon><StoreIcon style={{ color: '#2097F3' }} /></ListItemIcon>
          <ListItemText style={{ color: '#2097F3' }} primary="Productos" />
          {openProductMenu ? <IconExpandLess style={{ color: '#2097F3' }} /> : <IconExpandMore style={{ color: '#2097F3' }} />}
        </ListItem>
        <Collapse in={openProductMenu} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" style={{ paddingLeft: '15px' }}>
            <ListItem button component="a" href="/product-drop" className={classes.menuItem}>
              <ListItemIcon ><LocalConvenienceStoreIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Productos drop" />
            </ListItem>
            <ListItem button component="a" href="/product" className={classes.menuItem}>
              <ListItemIcon ><EditIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Productos propios" />
            </ListItem>
            <ListItem button component="a" href="/search-product" className={classes.menuItem}>
              <ListItemIcon ><ImageSearchIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Buscar producto" />
            </ListItem>
            <ListItem button component="a" href="/private-product" className={classes.menuItem}>
              <ListItemIcon ><StarsIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Productos privados" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={handleClickBranch} key="branch">
          <ListItemIcon><HomeWork style={{ color: '#2097F3' }} /></ListItemIcon>
          <ListItemText style={{ color: '#2097F3' }} primary="Sucursales" />
          {openBranchMenu ? <IconExpandLess style={{ color: '#2097F3' }} /> : <IconExpandMore style={{ color: '#2097F3' }} />}
        </ListItem>

        <Collapse in={openBranchMenu} timeout="auto" unmountOnExit>
          <Divider />
          <List component="div" style={{ paddingLeft: '15px' }}>
            <ListItem button component="a" href="/branch" key="branch">
              <ListItemIcon><HomeWork style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Bodegas" />
            </ListItem>

            <ListItem button component="a" href="/private-inventory" key="private-inventory">
              <ListItemIcon><AssistantIcon style={{ color: '#2097F3' }} /></ListItemIcon>
              <ListItemText style={{ color: '#2097F3' }} primary="Inventarios exclusivos" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component="a" href="/withdrawal" key="withdrawal">
          <ListItemIcon><AccountBalanceIcon style={{ color: '#2097F3' }} /></ListItemIcon>
          <ListItemText style={{ color: '#2097F3' }} primary="Retiros" />
        </ListItem>
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
        <ListItem>
          <ListItemText style={{ color: '#2097F3', textAlign: 'center' }} primary={`Tu saldo: ${balance}`} />
        </ListItem>
      </List>
    </div>
  );

  React.useEffect(() => {
    if (localStorage.getItem('isMerchantUpdated')) {
      let url = `${CORE_BASEURL}/merchant/${getMerchantId()}`
      consumeServiceGet(callBack, callBackSuccess, url)

    }
  })

  const callBack = () => {

  }

  const callBackSuccess = (merchant) => {
      setBalance(merchant.balance)
      setBalanceMerchant(merchant.balance)
      localStorage.removeItem("isMerchantUpdated")
  }

  const container = window !== undefined ? () => window().document.body : undefined;

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
        <Fab onClick={() => history.push('/charge')} style={{ background: '#2097F3', color: 'white' }} variant="extended">
          Recargar
        </Fab>
      </Drawer>
    </div>
  );
}



export default ResponsiveDrawer;