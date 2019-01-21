import React from 'react';
import URLs from "../Utilities/URLs"
import injectStyles from "react-jss"

const styles = {
  projectButtonRow:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    "@media (min-width: 700px)":{
      justifyContent:"flex-start",
      width:"500px"
    }
  }
}

const ProjectButtonRow = ({
  children,
  classes
}) => {
  return (
    <div
      className = {classes.projectButtonRow}
    >
      {children}
    </div>
    
  );
}
 
export default injectStyles(styles)(ProjectButtonRow);