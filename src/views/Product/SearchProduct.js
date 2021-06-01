import React from 'react';

import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { makeStyles } from '@material-ui/core/styles';
import styles from "assets/jss/material-kit-react/views/SearchProduct";
import Button from "components/CustomButtons/Button.js";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';


const useStylesJss = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
      fontWeight:'bold'
    },
}));

export default function SearchProduct(props) {
    const classes = useStyles();
    const jssclasses = useStylesJss();
    const [products, setProducts] = React.useState([{
        name:'Linterna militar led',
        quantity:'200',
        description:'Con esta increible linterna podrás alumbrar lo que desees. Cargala mediante puerto usb y usala en la oscuridad'
    },{
        name:'Linterna militar led',
        quantity:'200',
        description:'Con esta increible linterna podrás alumbrar lo que desees. Cargala mediante puerto usb y usala en la oscuridad'
    },{
        name:'Linterna militar led',
        quantity:'200',
        description:'Con esta increible linterna podrás alumbrar lo que desees. Cargala mediante puerto usb y usala en la oscuridad'
    },{
        name:'Linterna militar led',
        quantity:'200',
        description:'Con esta increible linterna podrás alumbrar lo que desees. Cargala mediante puerto usb y usala en la oscuridad'
    }]);

    return (
    <div>       
       
        <ResponsiveDrawe />       
        <div className={jssclasses.container}>        
            <GridContainer>            
                <GridItem xs={12} sm={12} md={12} >
                <h2 style={{color:"#000"}} >Productos disponibles</h2>
                    <GridContainer>
                        {products.map((row) => (    
                            <GridItem style={{paddingBottom:'5vh'}} xs={12} sm={6} md={4} >
                                <Card className={classes.root}>
                                    <CardHeader                                                                       
                                        title={row.name}
                                        subheader={row.quantity+" unidades disponibles"}
                                    />                              
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {row.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing style={{textAlign:"center"}}>
                                        <Button style={{left:"20%"}} color="primary" >
                                            Ver producto
                                        </Button>                                    
                                    </CardActions>                                
                                </Card>
                            </GridItem>                            
                        ))}
                    </GridContainer>
                </GridItem>
            </GridContainer>
        </div>
    </div>    
    )
}