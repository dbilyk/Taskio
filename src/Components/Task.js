import React from 'react';
import FooterButton from "./FooterButton"
import URLs from "../Utilities/URLs"

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
    
  },
  footerRow:{
    display:"flex",
    alignItems:"center",
    
  },
  pointsField:{
    flex:"0 0 auto",
    boxShadow:"none",
    width:"30px",
    borderRadius:"8px",
    border:"1px solid #eee",
    textAlign:"center",
    marginRight:'20px'
  },
  grabberIcon:{
    width:'16px',
    height:'8px',
    opacity:"0.2",
    margin: "0 22px 0 12px"
  },
  hide:{
    display:"none"
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
    id,
    isComplete,
    footerIsShowing,
    actionMenuIsOpen,
    zenEnabled,
    tags
  }) => {


  let root = window.location.origin
  let timeIconURL = root + URLs.iconURL.time
  let tagIconURL = root + URLs.iconURL.tag
  let completedIconURL = root + URLs.iconURL.completeTask
  let grabberIconURL = root + URLs.iconURL.grabber

  let footerClasses = (zenEnabled)?classes.footerRow + " " +classes.hide:classes.footerRow

  return (  
    <div className = {classes.taskContainer} >
      <div className = {classes.taskRow}>

        <div className = {classes.checkmarkDiv}>
          {(isComplete)?(<img className = {classes.completedIcon} src = {completedIconURL} alt =""/>):<i></i>}
        </div>

        <div contentEditable="true" className = {classes.titleField}>{text}</div>

      </div>
      <div className={classes.dividerLine}></div>

      <div className = {footerClasses}>

        <a href="#">
          <img className = {classes.grabberIcon} src={grabberIconURL} alt=""/>
        </a>

        <input 
          className={(points!="")?classes.pointsField: classes.pointsField + " "+ classes.hide} 
          type="text" 
          value={points}
          placeholder="pts"
        />

        <FooterButton 
          text={due} 
          iconURL={timeIconURL}
          isShowing= {due}
          callback={()=>{console.log("date picker")}}
        />

        <FooterButton 
          text="Add Tags" 
          iconURL={tagIconURL}
          isShowing= {tags.length > 1}
          callback={()=>{console.log("tag adder id:"+id)}}
        />

        <FooterButton
          text = {(footerIsShowing)?"Less":"More"}
          iconURL ="#"
          isShowing={true}
          callback={()=>{console.log("more/less clicked")}}
        />
      </div>
    </div>
  );
  

}
  
 
export default injectSheet(styles)(Task);

