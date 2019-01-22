import React from 'react';
import FooterButton from "./FooterButton"
import URLs from "../Utilities/URLs"
import TextArea from "./TextArea"

import injectSheet from "react-jss"

const styles = {
  taskContainer:{
    backgroundColor:"#fff",
    opacity:"1",
    border:"1px solid #ddd",
    borderRadius:"8px",
    margin: "8px 8px",
    boxShadow:"0px 1px 1px 0 #0001",
    transition:"all 0.2s ease-in-out"
    
  },
  checkmarkDiv:{
    flex:"0 0 auto",
    justifyContent:"center",
    width:'20px',
    height:'20px',
    border:"1px solid #ccc",
    borderRadius:"30px",
    margin:'8px 12px 8px 8px',


  },
  completedIcon:{
    height:"20px",
    transform:"scale(1.3,1.3)",
    alignSelf:"center"

  },
  taskRow:{
    display:"flex",
    flexFlow:"row nowrap",
    justifyContent:"space-between",
    
  },
  dividerLine:{
    borderBottom:"1px solid #eee",
    
  },
  footerRow:{
    display:"flex",
    alignItems:"center",
    flexFlow:"space-between",
    minHeight:'30px',
    maxHeight:'30px',
    transition:"all 0.15s ease-in-out",
    opacity:"1",
    "& div, textarea, input":{
      transition:"all 0.15s ease-in-out", 
    }
    
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
    margin: "0 22px 0 12px",
    touchAction:"none"
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
  closeChevronIcon:{
    width:"6px",
    height:'10px',
    flex:"0 0 auto",
    backgroundColor:'#0000',
    border:'none',
    textAlign:"right"
    
  },
  hide:{
    minHeight:'0px',
    maxHeight: "0px",
    margin:"0px",
    width:"0px",
    opacity:"0",
    transition:"all 0.2s ease-in-out",
    //display:"none"
  },
  quickHide:{
    display:"none"
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
    transition:"box-shadow 0.2s ease-in-out",
    "& $footerRow":{
      transition:"max-height 0.2s ease-in-out", 
    }
  },
  showHideBtn:{
    color:"#999",
    alignSelf:"center",
    fontSize:"12px",
  },
  isDragging:{
    margin:"20px 8px",
    opacity:'0',
    transition:"opacity, margin 0.2s ease-in-out"
  }
  
}


let Task = React.forwardRef(
  ({
    classes, 
    text, 
    points, 
    dueDate,
    id,
    isComplete,
    isDragging,
    footerIsShowing,
    actionMenuIsOpen,
    zenEnabled,
    tags,
    onToggleActionMenu,
    onComplete,
    onEditDate,
    onEditPoints,
    onEditTags,
    onDragging,
    onDragEnd,
    onEditContent,
    onDeleteTask
  },ref) => {
  let root = window.location.origin
  let timeIconURL = root + URLs.iconURL.time
  let tagIconURL = root + URLs.iconURL.tag
  let completedIconURL = root + URLs.iconURL.completeTask
  let grabberIconURL = root + URLs.iconURL.grabber
  let deleteIconURL = root + URLs.iconURL.deleteTask

  let footerClasses = (zenEnabled || isComplete)?classes.footerRow + " " +classes.hide:classes.footerRow
  let markedCompleteStyles = " " + ((isComplete)?classes.completedTask:"")
  let draggingStyles = " " + ((isDragging)?classes.isDragging:"") 


  return (  
    <div 
      ref = {ref}
      draggable
      className = {classes.taskContainer + markedCompleteStyles + draggingStyles}
      onDrag={(e)=>{onDragging(e,id)}}
      onTouchMove={(e)=>{onDragging(e,id)}}

      onDragEnd={(e)=>{onDragEnd(e,id)}}
      onTouchEnd={(e)=>{onDragEnd(e,id)}}
    >
      <div className = {classes.taskRow}>

        <div className = {classes.checkmarkDiv} onClick={()=>{onComplete(id)}}>
          {(isComplete)?(<img className = {classes.completedIcon} src = {completedIconURL} alt =""/>):<i></i>}
        </div>

        
        <TextArea
          rows="1"
          id = {id}
          onEditContent = {onEditContent}
          value = {text}
        ></TextArea>
        

        <button 
        className={classes.deleteIcon + " " + ((isComplete || zenEnabled)?"":classes.quickHide)} 
        onClick={()=>{onDeleteTask(id)}}>
          <img src={deleteIconURL} alt="delete action" />
        </button>

      </div>


      <div className={classes.dividerLine + ((isComplete || zenEnabled)?" " + classes.hide:"")}></div>


      <div className = {footerClasses}>

        <a href="#">
          <img className = {classes.grabberIcon} 
            draggable= {false} 
            src={grabberIconURL} 
            alt=""
            onTouchStart={(e)=>{
              e.preventDefault()
              onDragging(e,id)
            }}
          />
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
          className={classes.showHideBtn}
          isShowing={true}
          onClick={()=>{console.log(onToggleActionMenu); onToggleActionMenu(id)}}
        >
          {(actionMenuIsOpen)?(<img className = {classes.closeChevronIcon} src={URLs.iconURL.chevron} alt="close icon"/>):"•••"}
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
  

})
  
 
export default injectSheet(styles)(Task);

