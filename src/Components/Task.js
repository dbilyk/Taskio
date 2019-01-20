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
    boxShadow:"1px 4px 20px 0 #ccc",
    transition:"boxShadow 0.2s ease-in-out"
    
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
    flexFlow:"space-between",
    maxHeight:'40px',
    transition:"all 0.2s ease-in-out",
    opacity:"1"
    
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
    maxHeight:'0px',
    opacity:"0",
    transition:"all 0.2s ease-in-out",
    //display:"none"
  },
  footerSpacer:{
    flex:'10 1 auto'
  },
  completedTask:{
    "& textarea":{
      color:'#aaa',
      transition:"color 0.2s ease-in-out"
    },
    boxShadow:"0 0 0 0 #0000",
    transition:"boxShadow 0.2s ease-in-out"
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

  let footerClasses = (zenEnabled || isComplete)?classes.footerRow + " " +classes.hide:classes.footerRow
  let markedCompleteStyles = " " + ((isComplete)?classes.completedTask:"")


  return (  
    <div className = {classes.taskContainer + markedCompleteStyles} >
      <div className = {classes.taskRow}>

        <div className = {classes.checkmarkDiv} onClick={()=>{onComplete(id)}}>
          {(isComplete)?(<img className = {classes.completedIcon} src = {completedIconURL} alt =""/>):<i></i>}
        </div>

        <div className={markedCompleteStyles}>
          <TextArea
            rows="1"
            onChange={(e)=>{onEditContent(e, id)}}
            value = {text}
          ></TextArea>
        </div>

      </div>


      <div className={classes.dividerLine + ((isComplete)?" " + classes.hide:"")}></div>


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

        <div
          isShowing={true}
          onClick={()=>{console.log(onToggleActionMenu);onToggleActionMenu(id)}}
        >
          {(actionMenuIsOpen)?"Less":"•••"}
        </div>

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

