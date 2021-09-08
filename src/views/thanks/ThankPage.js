import React, { useState } from 'react';


import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "components/Grid/GridContainer.js";
import styles from "assets/jss/material-kit-react/views/thankPage.js";
import GridItem from 'components/Grid/GridItem';
import { getQueyParamFromUrl } from 'util/UrlUtil'

import Logo from "assets/img/logo_completo.png"
import ReactPixel from 'react-facebook-pixel';



const useStyles = makeStyles(styles);
function ThankPage(props) {

    const classes = useStyles();
    const [isCOD, setIsCOD] = useState(null);

    React.useEffect(() => {
        setIsCOD(getQueyParamFromUrl("cod"))
        ReactPixel.init(props.fbId);
        console.log('fbId ', props.fbId);
        ReactPixel.fbq('track', 'Purchase', { currency: "COP", value: props.value });        
    })

    return (
        <GridContainer justify="center" className={classes.root}>
            <div className={classes.layer}></div>
            {isCOD ?
                <>
                    <GridItem xs={12} sm={12} md={12} className={classes.logo}>
                        <img src={Logo} style={{ width: "300px" }} />
                        <h1 className={classes.title} >Debes confirmar tu pedido</h1>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} className={classes.desc}>
                        <p className={classes.text}>Te hemos enviado un correo electrónico y un mensaje de texto para que confirmes tu pedido.</p>
                        <p className={classes.text}>El correo electrónico contiene un botón con el que puedes confirmar y el mensaje de texto un enlace.
                            Una vez abras el enlace, verifica que tu información es correcta y da clic sobre el botón confirmar pedido.</p>
                    </GridItem>
                </>
                : <>
                    <GridItem xs={12} sm={12} md={12} className={classes.logo}>
                        <img src={Logo} style={{ width: "300px" }} />
                        <h1 className={classes.title} >Gracias por tu compra!</h1>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} className={classes.desc}>
                        <p className={classes.text}>Te hemos enviado un correo electrónico y un mensaje de texto para que hagas seguimiento a tu orden.</p>
                        <p className={classes.text}>Si pagaste por adelantado con nuestro servicio de custodía, mediante el correo que te llegó puedes notificar novedades con el pedido.
                            Tienes 8 días para hacerlo, si no recibimos novedades de tu parte, el dinero será transferido al vendedor.</p>
                    </GridItem>
                </>
            }
        </GridContainer>
    )
}
const mapStateToProps = (state) => {
    return {
        fbId: state.fbReducer.fbId,
        value: state.fbReducer.value
    }
};

export default connect(mapStateToProps, null)(ThankPage);