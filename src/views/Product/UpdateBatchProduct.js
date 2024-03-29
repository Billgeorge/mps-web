import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/views/CreateProduct";
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CardFooter from "components/Card/CardFooter.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { styled } from '@mui/material/styles';
import Button from "components/CustomButtons/Button.js";
import { AttachFile } from "@material-ui/icons";
import IconButton from '@mui/material/IconButton';
import Alert from '@material-ui/lab/Alert';
import {consumeServicePatch} from '../../service/ConsumeService'
import { CORE_BASEURL } from 'constant/index'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(styles);
export default function UpdateBatchProduct(props) {

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const classes = useStyles();
    const Input = styled('input')({
        display: 'none',
    });
    const [errorMessage, setErrorMessage] = React.useState({});
    const [productFile, setProductFile] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [infoMessage, setInfoMessage] = React.useState("");

    const fileSelected = (event) => {
        setErrorMessage({})
        setInfoMessage("")
        let file = event.target.files[0]
        const extension = file.name.split('.').pop()
        if (extension !== "xlsx" ) {
            setErrorMessage({ 'Error': 'Tu archivo debe ser xlsx' })
            return
        }
        if (file && file.size > 1048576) {
            setErrorMessage({ 'Error': 'Tu archivo es muy pesado. No debe superar 1Mb' })
            return
        }
        setProductFile(file)
    };

    const createProducts = () => {

        if (!productFile) {
            setErrorMessage({ 'Error': 'Debe seleccionar un archivo' })
            return
        }
        if (isLoading) {
            return
        }
        const data = new FormData();
        data.append("file", productFile);
        setIsLoading(true)
        consumeServicePatch(data, callBack, callBackCreateProducSuccess, `${CORE_BASEURL}/product/batch`)
    }

    const callBackCreateProducSuccess = () => {
        setInfoMessage("La actualización de tus productos esta en proceso. A tu correo llegará el resultado de la creación")
        setIsLoading(false)
    }

    const callBack = (error) => {
        if (error != null && typeof error === 'object') {
            setErrorMessage(error)
        } else if (error != null && typeof error === 'string') {
            setErrorMessage({ 'Error': error })
        }
        else {
            setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
        }
        setIsLoading(false)
    }

    return (
        <div>
            <ResponsiveDrawe />
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                        <Card className={classes[cardAnimaton]}>

                            <CardHeader className={classes.cardHeader}>
                                <h3 style={{ fontWeight: "600" }}><ArrowBackIcon style={{
                                    color: "#9c27b0", textDecoration: "none",
                                    backgroundColor: "transparent", cursor: "pointer"
                                }} onClick={() => props.history.push('/product')} /> Actualizar varios productos al tiempo</h3>
                            </CardHeader>

                            <CardBody>
                                {isLoading
                                    ? <center> <CircularProgress /></center>
                                    : <span></span>
                                }
                                <GridItem xs={12} sm={12} md={12} style={{ textAlign: "left" }}>
                                    <h5>Aprende como editar mutiples productos al tiempo usando un archivo <a  href="https://youtu.be/ZOPUyAATVaM" target="_blank">Clic acá</a>. Selecciona el archivo con la información de tus productos:</h5>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>

                                    <label htmlFor="contained-button-file">
                                        <Input onChange={fileSelected} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" id="contained-button-file" type="file" />
                                        <IconButton className={classes.addFile} color="primary" aria-label="upload file" component="span">
                                            <AttachFile />
                                        </IconButton>
                                    </label>

                                </GridItem>

                                {productFile ?
                                    <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                                        {productFile.name}
                                    </GridItem> : <></>}

                                {Object.keys(errorMessage).map((keyName, i) => (
                                    <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                                ))}
                                {infoMessage
                                    ? <Alert severity="success">{infoMessage}</Alert>
                                    : <span></span>
                                }
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button onClick={createProducts} color="primary" size="lg">
                                    Actualizar productos
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div >
    )

}