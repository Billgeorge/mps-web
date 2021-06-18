import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import styles from "assets/jss/material-kit-react/views/groupedButtons.js";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles(styles);
export default function GroupedButtons(props) {

  const state = { counter: 1 };
  const [counter, setCounter] = React.useState(1);

  const { ...inputState } = props;

  const handleIncrement = () => {
    setCounter(counter+1)
    props.callback(counter+1)
  };

  const handleDecrement = () => {
    if(counter>1){
        setCounter(counter-1)
        props.callback(counter-1)
    }else{
        setCounter(1)
        props.callback(1)
    }
  };
  
  const displayCounter = counter > 0;
  const classes = useStyles();

  return (
    <ButtonGroup size="lg" aria-label="small outlined button group">
      <Button className={classes.buttonIndicator} onClick={handleIncrement}>+</Button>
      {displayCounter && <Button className={classes.buttonDisplay} disabled>{counter}</Button>}
      {displayCounter && <Button className={classes.buttonIndicator} onClick={handleDecrement}>-</Button>}
    </ButtonGroup>
  );
  
}