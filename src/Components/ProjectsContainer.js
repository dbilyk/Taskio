import React, { Component } from 'react';
import Task from "./Task"
import injectSheet from "react-jss"
import API from '../Utilities/API';

const styles = {
  taskContainer:{
    color: "red"
  } 
}

class ProjectsContainer extends Component {
  constructor(props) {
    super(props);
    const defaultState = {
      //which project is currently open
      currentProjectId: 0,
    
      //projects array
      projects:[
        {
          id        : 1,
          title     : "Demo Project",
          zenEnabled: false
        }
      ],
    
      //tasks array
      tasks:[
        
      ]
    }
    this.state = defaultState

    //bind stuff
    this.addNewTask         = this.addNewTask.bind(this)
    this.onComplete         = this.onComplete.bind(this)
    this.onEditPoints       = this.onEditPoints.bind(this)
    this.onEditContent      = this.onEditContent.bind(this)
    this.onEditDate         = this.onEditDate.bind(this)
    this.onDeleteTask       = this.onDeleteTask.bind(this)
    this.onToggleActionMenu = this.onToggleActionMenu.bind(this)
    this.onDrag             = this.onDrag.bind(this)
  }

  componentWillMount(){
    API.PUT(this.defaultState)


    //fetch tasks from github
    // API.GET().then((data)=>{
    //   this.setState(data)
    // })
    
  
  }

  addNewTask(){
    let findHighestId = (taskArray)=>{
      return taskArray.reduce((acc,current)=>{
        if (acc >= current.id) return acc
        else return current.id
      },-1)
    }

    let taskObject = {
      id                : findHighestId(this.state.tasks)+1,
      owningProjectId   : this.state.currentProjectId,
      text              : "Demo Task",
      description       : "",
      points            : "0",
      tags              : ["Add Tag"],
      due               : "Add Date",
      isComplete        : false,
      footerIsShowing   : true,
      actionMenuIsOpen  : true,
      onComplete        : this.onComplete.bind(this),
      onEditContent     : this.onEditContent.bind(this),
      onDeleteTask      : this.onDeleteTask.bind(this),
      onDrag            : this.onDrag.bind(this),
      onEditDate        : this.onEditDate.bind(this),
      onEditPoints      : this.onEditPoints.bind(this),
      onEditTags        : this.onEditTags.bind(this),
      onToggleActionMenu: this.onToggleActionMenu.bind(this)
    }

    this.setState({
      tasks:[taskObject,...this.state.tasks]},
      ()=>{
        API.PUT(this.state)
      })


    return taskObject
    }

    onComplete(taskID){
      console.log('onComplete' + taskID)
    }
    onEditDate(taskID){
      console.log('onEditDate:'+ taskID)
    }
    onEditTags(taskID){
      console.log('onEditTags:'+ taskID)
    }
    onEditPoints(taskID){
      console.log('onEditPoints:'+ taskID)
    }
    onEditContent(event,taskID){
      console.log('onEditContent:'+ taskID)
      console.log(event.nativeEvent)
    }
    onDeleteTask(taskID){
      console.log('onDeleteTask:'+ taskID)
    }
    onToggleActionMenu(taskID){
      console.log('onToggleActionMenu:'+ taskID)
    }
    onDrag(taskID){
      console.log('onDrag:'+ taskID)
    }




  render() { 
    return (  
      <div className = {this.props.classes.taskContainer}>
      <div onClick   = {this.addNewTask}>++ ADD</div>
        {
          this.state.tasks.map((e)=>{
            if(e.owningProjectId ==this.state.currentProjectId){
              return <Task {...e} key = {e.id}/>
            }
            return
          })
        }
        

      </div>
    )
  }
}
 
export default injectSheet(styles)(ProjectsContainer);

