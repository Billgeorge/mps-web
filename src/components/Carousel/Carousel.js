import React from "react";

import styles from "assets/jss/material-kit-react/components/carouselStyle";
import GridContainer from "components/Grid/GridContainer";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem";


const style = makeStyles(styles);
export default function Carousel(props) {

    const classes = style();
    const [imgs, setImgs] = React.useState(props.imgs?props.imgs:[]);
    const [mainImg, setMainImg] = React.useState();

    React.useEffect(() => {
        setMainImg(imgs[0])
    }, []);

    const selectImg = (img) => {
        setMainImg(img)
    };

    return (
        <GridContainer className={classes.container}>            
            <GridItem xs={12} sm={2} md={2} className={classes.gridZeroPadding}>
                <GridItem xs={12} sm={12} md={12} className={classes.containerEnableImg}>
                    <img src={mainImg} className={classes.minImg} />
                </GridItem>
                {imgs.map((row) => (
                    row === mainImg?<></>:
                    <GridItem xs={12}  sm={12} md={12} className={classes.containerImg}>
                        <img src={row} onClick={()=>selectImg(row)} className={classes.minImg} />
                    </GridItem>

                ))}
            </GridItem>
            <GridItem xs={12} sm={10} md={10}>
                <img src={mainImg} className={classes.mainImg} />
            </GridItem>
        </GridContainer>
    )

}