import React from 'react';
import injectStyles from "react-jss"

let styles={
  projectButton:{
    flex:"0.5 0 100px",
    font:"Arial",
    fontSize:"12px",
    fontWeight:"800",
    alignContent:"center",
    margin:"8px 8px",
    padding:"0",
    display:'flex',
    alignItems:"center",
    outline:"none",
    "& img":{
      width:"30px",
      height:"30px",
      transform:"scale(1,1)",
      transition:"transform 0.1s ease-in-out",
    },
    "&:active":{
      border:"1px solid #777",
      transition:"border 0.1s ease-in-out",
      "& img":{
        transform:"scale(1.3,1.3)",
        transition:"transform 0.1s ease-in-out",
      }
    },
    backgroundColor:"none",
    border:"1px solid #eee",
    borderRadius:"100px",
    transition:"border 0.1s ease-in-out",
  },
  enabled:{
    backgroundColor:"#0f53"
  },
  
}

const ProjectButton = ({
  classes,
  text,
  iconURL,
  callback,
  isActive
}) => {
  let currentStyle = ((isActive)?classes.projectButton + " " + classes.enabled:classes.projectButton)
  return ( 
    <button
      className={currentStyle}
      onClick = {()=>{callback()}}
    >
      <img
        src={iconURL} 
        alt={text + " icon"} 
      />
      {text}
    </button>
  );
}
 
export default injectStyles(styles)(ProjectButton);