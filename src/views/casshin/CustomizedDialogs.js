import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Iframe from 'react-iframe'
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));


export default function CustomizedDialogs(props) {

  const {paymentPartnerId} = props
  const classes = useStyles();
   
  const [open, setOpen] = React.useState(props.open);
  const [urlIframe, setUrlIframe] = React.useState(`/paymentForm/${paymentPartnerId}`);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>     
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Seleccione Medio de pago
            </Typography>            
          </Toolbar>
        </AppBar>
        <Iframe url={urlIframe} name="pzframe" width="auto" height="100%"></Iframe>
      </Dialog>
    </div>
  );
}