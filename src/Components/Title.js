import React from 'react';
import injectStyles from "react-jss"

const styles= {
  default:{
    fontFamily:"helvetica",
    fontSize:"30px",
    fontWeight:"800",
    margin:"8px",
  }
}

const Title = ({classes,text}) => {
  return ( 
    <h2 className={classes.default}>
      {text}
    </h2>
   );
}
 
export default injectStyles(styles)(Title);