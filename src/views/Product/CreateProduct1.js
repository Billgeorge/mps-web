import React from "react";

import AddIcon from '@material-ui/icons/AddAPhoto'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import GridItem from "components/Grid/GridItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/CreateProduct";
import Carousel from "components/Carousel/Carousel";


const useStyles = makeStyles(styles);
export default function CreateProductStepOne(props) {

    const classes = useStyles();

    const [imgs, setImgs] = React.useState(props.imgs);

    const fileSelected = (event) => {
        props.setErrorMessage({})
        if (0 === event.target.files.length) {
            props.setErrorMessage({ 'Error': 'Debes seleccionar al menos una foto.' })
            return
        }
        let file = event.target.files[0]
        let file1 = event.target.files[1]
        let file2 = event.target.files[2]
        const extension = file.name.split('.').pop()
        const extension1 = file1.name.split('.').pop()
        const extension2 = file2.name.split('.').pop()
        if (verifyImageExtension(extension) || verifyImageExtension(extension1) || verifyImageExtension(extension2)) {
            props.setErrorMessage({ 'Error': 'Tu imagén debe ser jpeg, jpg, png o tiff' })
            return
        }
        if ((file && file.size > 1048576) || (file1 && file1.size > 1048576) || (file2 && file2.size > 1048576)) {
            props.setErrorMessage({ 'Error': 'Tu imagén es muy pesada. No debe superar 1Mb' })
            return
        }
        setToImgs(file, file1, file2)
    };

    const verifyImageExtension = (extension) => {
        return (extension !== "jpg" && extension !== "png" && extension !== "jpeg" && extension !== "tiff")
    }

    const setToImgs = (file, file1, file2) => {
        if (!file || !file1 || !file2) {
            return
        }
        let finalFile
        let finalFile1
        let finalFile2
        var fr = new FileReader();
        var fr1 = new FileReader();
        var fr2 = new FileReader();
        fr.onload = function () {
            finalFile = fr.result;
            fr1.readAsDataURL(file1);
        }
        fr1.onload = function () {
            finalFile1 = fr1.result;
            fr2.readAsDataURL(file2);
        }
        fr2.onload = function () {
            finalFile2 = fr2.result;
            setImgs([])
            props.setImgs([])
            setImgs([finalFile, finalFile1, finalFile2])            
            props.setImgs([finalFile, finalFile1, finalFile2])
            props.setproductPhotos([file, file1, file2])
            if(props.isEdit){
                props.setIsEdit(false)
            }
        }
        fr.readAsDataURL(file);
    }

    return (
        <GridItem xs={12} sm={12} md={12}>
            {console.log('props',props)}
            {console.log('imgs',imgs)}
            <GridItem xs={12} sm={12} md={12}>
                {
                    imgs.length > 0 || props.imgs.length>0 ? <Carousel imgs={imgs.length > 0 ? imgs : props.imgs} />
                        : <img type="file" src={props.productImage} name="productImage" alt='Imagen' id="productImage" className={classes.imgProduct} />
                }
                <input onChange={(e) => fileSelected(e)} accept="image/*" style={{ display: 'none' }} id="icon-button-file" type="file" multiple />
                <label className={classes.addImg} htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <AddIcon />
                    </IconButton>
                </label>
            </GridItem>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField onChange={props.handleChangeProduct} value={props.product.name} name="name" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Nombre producto" variant="outlined" required />
            </GridItem>
            <GridItem style={{ marginTop: "10px" }} xs={12} sm={12} md={12}>
                <TextField style={{ width: "100%", paddingBottom: "10px" }}
                    id="description"
                    onChange={props.handleChangeProduct} value={props.product.description} name="description"
                    label="Descripción"
                    multiline
                    rows={4}
                    placeholder="Características, beneficios y demás del producto"
                    variant="outlined"
                    inputProps={{ maxLength: 1000 }}
                    required
                />
            </GridItem>

        </GridItem>
    )
}