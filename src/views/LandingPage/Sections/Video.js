import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import ReactPlayer from 'react-player'

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

const useStyles = makeStyles(styles);

export default function Video() {
  const classes = useStyles();
  return (
    <GridContainer justify="center">
    <GridItem cs={12} sm={12} md={8}>
        <h2 className={classes.title}>¿Estas pensando en usar Contra Entrega?</h2>      
    </GridItem>
    <GridItem cs={12} sm={12} md={8}>
    <div className={classes.reactPlayerWrap}>
        <ReactPlayer
          className={classes.reactPlayer}
          url='https://www.youtube.com/watch?v=pt7oTQIjh40'
          width='100%'
          height='500px'
        />
    </div>
    </GridItem>
    </GridContainer>
  );
}
