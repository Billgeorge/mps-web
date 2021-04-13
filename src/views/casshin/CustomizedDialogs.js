import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Iframe from 'react-iframe'
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import {getQueyParamFromUrl} from 'util/UrlUtil'


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

  const classes = useStyles();
   
  const [open, setOpen] = React.useState(true);
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <div>     
      <Dialog fullScreen open={open} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>            
            <Typography variant="h6" className={classes.title}>
              Tu pago estará en custodia, hasta que recibas tu pedido
            </Typography>            
          </Toolbar>
        </AppBar>
        <Iframe url={`/paymentForm/${getQueyParamFromUrl('id')}`} name="pzframe" width="auto" height="100%"></Iframe>
      </Dialog>
    </div>
  );
}