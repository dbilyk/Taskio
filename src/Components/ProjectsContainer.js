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
          id        : 0,
          title     : "Demo Project",
          zenEnabled: false
        }
      ],
    
      //tasks array
      tasks:{
        0:{
          id              : 0,
          owningProjectId : 0,
          index: 0,
          text            : "The cat sat on a matThe cat sat on a matThe cat sat on a matThe cat sat on a matThe cat sat on a matThe cat sat on a mat",
          description     : "",
          points          : "",
          tags            : ["Add Tag"],
          dueDate         : "Add Date",
          isComplete      : false,
          footerIsShowing : true,
          actionMenuIsOpen: true,
          //event handlers
          onComplete        : this.onComplete.bind(this),
          onEditContent     : this.onEditContent.bind(this),
          onDeleteTask      : this.onDeleteTask.bind(this),
          onDrag            : this.onDrag.bind(this),
          onEditDate        : this.onEditDate.bind(this),
          onEditPoints      : this.onEditPoints.bind(this),
          onEditTags        : this.onEditTags.bind(this),
          onToggleActionMenu: this.onToggleActionMenu.bind(this)
        }
      }
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
    API.GET().then((data=>{this.setState(data)}))


    //fetch tasks from github
    // API.GET().then((data)=>{
    //   this.setState(data)
    // })
    
  
  }


  findHighestId(taskObj){
    let taskKeys = Object.keys(taskObj)
    if(taskKeys.length == 0){
      return -1
    }
    return Object.keys(taskObj).reduce((acc,currentKey)=>{
      if (parseFloat(acc) >= parseFloat(currentKey)) return parseFloat(acc)
      else return parseFloat(currentKey)
    },"-1")
  }

  addNewTask(){
    let newTaskId = this.findHighestId(this.state.tasks) + 1

    let taskObject = {
      id              : newTaskId,
      owningProjectId : this.state.currentProjectId,
      index: 0,
      text            : "Demo Task",
      description     : "",
      points          : "",
      tags            : ["Add Tag"],
      dueDate         : "Add Date",
      isComplete      : false,
      footerIsShowing : true,
      actionMenuIsOpen: true,
      //event handlers
      onComplete        : this.onComplete.bind(this),
      onEditContent     : this.onEditContent.bind(this),
      onDeleteTask      : this.onDeleteTask.bind(this),
      onDrag            : this.onDrag.bind(this),
      onEditDate        : this.onEditDate.bind(this),
      onEditPoints      : this.onEditPoints.bind(this),
      onEditTags        : this.onEditTags.bind(this),
      onToggleActionMenu: this.onToggleActionMenu.bind(this)
    }

    let newState = this.state
    newState.tasks[newTaskId] = taskObject

    this.setState({...newState},
      ()=>{
        API.PUT(this.state)
      })


    return taskObject
    }

    onComplete(taskID){
      let newState = {...this.state}
      newState.tasks[taskID].isComplete = !newState.tasks[taskID].isComplete
      this.setState(newState)
    }
    onEditDate(taskID){
      console.log('onEditDate:'+ taskID)
    }
    onEditTags(taskID){
      console.log('onEditTags:'+ taskID)
    }
    onEditPoints(event,taskID){
      let newState = {...this.state}
      newState.tasks[taskID].points = event.target.value
      this.setState(newState)
    }
    onEditContent(event,taskID){
      let newState = {...this.state}
      newState.tasks[taskID].text = event.target.value
      this.setState(newState)

    }
    onDeleteTask(taskID){
      let newState = {...this.state}
      delete(newState.tasks[taskID])
      this.setState(newState)

    }
    onToggleActionMenu(taskID){
      let newState = {...this.state}
      newState.tasks[taskID].actionMenuIsOpen = !newState.tasks[taskID].actionMenuIsOpen
      this.setState(newState)
      console.log('onToggleActionMenu:'+ taskID)
    }
    onDrag(taskID){
      console.log('onDrag:'+ taskID)
    }




  render() { 
    let tasks = this.state.tasks
    return (  
      <div className = {this.props.classes.taskContainer}>
      <div onClick   = {this.addNewTask}>Add Task</div>
        {
          Object.keys(tasks).map((e)=>{
            if(tasks[e].owningProjectId == this.state.currentProjectId){
              return <Task {...tasks[e]} key = {tasks[e].id}/>
            }
            return
          })
        }
        

      </div>
    )
  }
}
 
export default injectSheet(styles)(ProjectsContainer);

