import React from 'react';
import injectSheet from "react-jss"

const styles = {
  
  footerBtnContainer:{
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    height:"30px",
    width: "90px",
    backgroundColor:"#FFF0",
    border:"none",
  },
  footerBtnIcon:{
    width:"12px",
    height:"12px",
    flex:"0 1 auto",
    alignSelf:"flex-start",
    marginRight:"4px",
  },
  footerBtnText:{
    color:"#929292",
    textAlign:"middle",
    fontSize:"12px"
  },
  hide:{
    display:"none"
  }
  
}


let FooterButton = (
  {
    classes, 
    children, 
    text,
    iconURL, 
    isShowing,
    callback
  }) => {
  
  return (  
    <button 
      className={classes.footerBtnContainer+ " " + ((!isShowing)?classes.hide:"")}
      onClick={callback}
    >
      <img className={classes.footerBtnIcon} src = {iconURL} alt="" />
      <span className={classes.footerBtnText}>{text}</span>
    </button>   
  );
  

}
  
 
export default injectSheet(styles)(FooterButton);

