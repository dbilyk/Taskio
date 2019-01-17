import React from 'react';
import FooterButton from "./FooterButton"
import strings from "../Utilities/strings"

import injectSheet from "react-jss"

const styles = {
  taskContainer:{
    backgroundColor:"#fafafa",
    borderRadius:"8px",
    margin: "8px",
    boxShadow:"1px 4px 20px 0 #ccc"
    
  },
  titleField:{
    color:"#555",
    fontFamily:"Arial",
    fontSize:"16px",
    fontWeight:"800",
    margin:"14px 12px 8px 12px",
    flex:'0.9 1 auto',
    border:"none",
    maxWidth:"80%",
    "& span": {
      maxWidth:"9vw"
    }




  },
  checkmarkDiv:{
    display:"flex",
    justifyContent:"center",
    width:'20px',
    height:'20px',
    border:"1px solid #eee",
    borderRadius:"30px",
    margin:'12px 8px 8px 12px',


  },
  completedIcon:{
    height:"24px",
    alignSelf:"center"

  },
  taskRow:{
    display:"flex",
    flexFlow:"row wrap",
    justifyContent:"flex-start",
    
  },
  dividerLine:{
    borderBottom:"1px solid #eee",
    marginTop:'4px',
    marginBottom:'4px',
    
  },
  footerRow:{
    display:"flex",
    alignItems:"center",
    padding:"4px",
    paddingBottom:'8px'
  },
  pointsField:{
    flex:"0 0 auto",
    width:"30px",
    borderRadius:"8px",
    textAlign:"center",
    margin:'0 20px'
  },
  grabberIcon:{
    width:'24px',
    height:'12px',
    opacity:"0.2",
    margin: "0 22px 0 8px"
  }
  
  
}


let Task = (
  {
    classes, 
    children, 
    text, 
    description, 
    points, 
    due,
    ID,
    isComplete, 
    isExpanded, 
    isShowing,
    zenEnabled,
    tags
  }) => {


  let root = window.location.origin
  let timeIconURL = root + strings.iconURL.time
  let tagIconURL = root + strings.iconURL.tag
  let completedIconURL = root + strings.iconURL.completeTask
  let grabberIconURL = root + strings.iconURL.grabber

  return (  
    <div className = {classes.taskContainer} >
      <div className = {classes.taskRow}>

        <div className = {classes.checkmarkDiv}>
          <img className = {classes.completedIcon} src = {completedIconURL} alt =""/>
        </div>

        <div contentEditable="true" className = {classes.titleField}>{text}</div>

      </div>
      <div className={classes.dividerLine}></div>

      <div className = {classes.footerRow}>

        <a href="#">
          <img className = {classes.grabberIcon} src={grabberIconURL} alt=""/>
        </a>

        <FooterButton 
          text="Add Tags" 
          iconURL={tagIconURL}
          isShowing= {!zenEnabled && due}
          callback={()=>{console.log("tag adder")}}
        />

        <FooterButton 
          text={due} 
          iconURL={timeIconURL}
          isShowing= {!zenEnabled && due}
          callback={()=>{console.log("date picker")}}
        />

        <input className={classes.pointsField} type="text" placeholder="pts"></input>
        
      </div>
    </div>
  );
  

}
  
 
export default injectSheet(styles)(Task);

