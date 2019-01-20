import React from 'react';
import FooterButton from "./FooterButton"
import URLs from "../Utilities/URLs"
import TextArea from "./TextArea"

import injectSheet from "react-jss"

const styles = {
  taskContainer:{
    backgroundColor:"#fafafa",
    borderRadius:"8px",
    margin: "8px",
    boxShadow:"1px 4px 20px 0 #ccc"
    
  },
  checkmarkDiv:{
    flex:"0 0 auto",
    justifyContent:"center",
    width:'20px',
    height:'20px',
    border:"1px solid #eee",
    borderRadius:"30px",
    margin:'12px 8px 8px 12px',


  },
  completedIcon:{
    height:"20px",
    transform:"scale(1.3,1.3)",
    alignSelf:"center"

  },
  taskRow:{
    display:"flex",
    flexFlow:"row nowrap",
    justifyContent:"flex-start",
    
  },
  dividerLine:{
    borderBottom:"1px solid #eee",
    
  },
  footerRow:{
    display:"flex",
    alignItems:"center",
    flexFlow:"space-between"
    
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
  deleteIcon:{
    "& img":{
      width:"16px",
      height:'16px'
    },
    flex:"0 0 auto",
    backgroundColor:'#0000',
    border:'none',
    textAlign:"right"
    
  },
  hide:{
    display:"none"
  },
  footerSpacer:{
    flex:'10 1 auto'
  }
  
}


let Task = (
  {
    classes, 
    children, 
    text, 
    description, 
    points, 
    dueDate,
    id,
    isComplete,
    footerIsShowing,
    actionMenuIsOpen,
    zenEnabled,
    tags,
    onToggleActionMenu,
    onComplete,
    onEditDate,
    onEditPoints,
    onEditTags,
    onDrag,
    onEditContent,
    onDeleteTask
  }) => {


  let root = window.location.origin
  let timeIconURL = root + URLs.iconURL.time
  let tagIconURL = root + URLs.iconURL.tag
  let completedIconURL = root + URLs.iconURL.completeTask
  let grabberIconURL = root + URLs.iconURL.grabber
  let deleteIconURL = root + URLs.iconURL.deleteTask

  let footerClasses = (zenEnabled)?classes.footerRow + " " +classes.hide:classes.footerRow

  return (  
    <div className = {classes.taskContainer} >
      <div className = {classes.taskRow}>

        <div className = {classes.checkmarkDiv} onClick={()=>{onComplete(id)}}>
          {(isComplete)?(<img className = {classes.completedIcon} src = {completedIconURL} alt =""/>):<i></i>}
        </div>

        <TextArea
          rows="1"
          onChange={(e)=>{onEditContent(e, id)}}
          value = {text}
        >
          
        </TextArea>

      </div>
      <div className={classes.dividerLine}></div>

      <div className = {footerClasses}>

        <a href="#">
          <img className = {classes.grabberIcon} src={grabberIconURL} alt=""/>
        </a>

        <input 
          className={classes.pointsField + ((points == "" && !actionMenuIsOpen)?" " + classes.hide:"")} 
          type="text"
          value={points}
          onChange={(e)=>{onEditPoints(e, id)}}
          placeholder="pts"
        />

        <FooterButton 
          text={dueDate} 
          iconURL={timeIconURL}
          isShowing = {(dueDate != "Add Date" || actionMenuIsOpen)}
          callback={()=>{onEditDate(id)}}
        />

        <FooterButton 
          text="Add Tags" 
          iconURL={tagIconURL}
          isShowing= {(tags.length > 1 || actionMenuIsOpen)}
          callback={()=>{onEditTags(id)}}
        />

        <FooterButton
          text = {(actionMenuIsOpen)?"Less":"•••"}
          iconURL ="#"
          isShowing={true}
          callback={()=>{onToggleActionMenu(id)}}
        />
        <div className={classes.footerSpacer}></div>
        <button 
        className={classes.deleteIcon} 
        onClick={()=>{onDeleteTask(id)}}>
          <img src={deleteIconURL} alt="delete action" />
        </button>

      </div>
    </div>
  );
  

}
  
 
export default injectSheet(styles)(Task);

