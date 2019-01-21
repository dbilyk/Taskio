import React, { Component } from 'react';
import injectSheet from "react-jss"
import API from '../Utilities/API';
import URLs from "../Utilities/URLs"

import Task from "./Task"
import ProjectButtonRow from "./ProjectButtonRow"
import ProjectButton from "./ProjectButton"
import Title from './Title';

const styles = {
  taskContainer:{
    
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
          id           : 0,
          title        : "Task.io",
          zenActive    : false,
          filtersActive: false,
          sortOrder    : []

        }
      ],
    
      //tasks array
      tasks:{
        
      }
      
    }
    this.state = defaultState

    //bind stuff
    this.getTaskSortIndex = this.getTaskSortIndex.bind(this)
    this.moveTask = this.moveTask.bind(this)
    this.attachCallbacksToObject = this.attachCallbacksToObject.bind(this)
    this.attachCallbacksToAllTasks = this.attachCallbacksToAllTasks.bind(this)
    this.addNewTask         = this.addNewTask.bind(this)
    this.onComplete         = this.onComplete.bind(this)
    this.onEditPoints       = this.onEditPoints.bind(this)
    this.onEditContent      = this.onEditContent.bind(this)
    this.onEditDate         = this.onEditDate.bind(this)
    this.onDeleteTask       = this.onDeleteTask.bind(this)
    this.onToggleActionMenu = this.onToggleActionMenu.bind(this)
    this.onDrag             = this.onDrag.bind(this)
    this.onToggleZen        = this.onToggleZen.bind(this)
  }

  componentWillMount(){
    //resets the server state to default state object for testing
    API.PUT(this.state)

    API.GET().then(
      data=>{
        let serverStateWithCallbacks = this.attachCallbacksToAllTasks(data)
        this.setState(
          serverStateWithCallbacks,
          ()=>{}
        )
      }
    )
    // //fetch tasks from github
    // API.GET().then((data)=>{
    //   this.setState(data)
    // })
  }

  //sorting logic------------------------------------------------------------------------------------------------
  moveTask(taskID,newIndex){
    let newState = {...this.state}
    let newSort = [...this.state.projects[this.state.currentProjectId].sortOrder]
    
    let currentLocation = newSort.findIndex(e=>{
      return e == taskID
    })

    //remove element from current index
    newSort.splice(currentLocation,1)

    //re-add to new location
    newSort.splice(newIndex,0,taskID)

    newState.projects[newState.currentProjectId].sortOrder = newSort
    this.setState(newState)

  }

  getTaskCount(){
    return this.state.projects[this.state.currentProjectId].sortOrder.length
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
      key             : newTaskId,
      owningProjectId : this.state.currentProjectId,
      text            : "",
      description     : "",
      points          : "",
      tags            : ["Add Tag"],
      dueDate         : "Add Date",
      isComplete      : false,
      zenEnabled      : this.state.projects[this.state.currentProjectId].zenActive,
      footerIsShowing : true,
      actionMenuIsOpen: false,
      //event handlers
      
    }

    let newState = this.state
    newState.tasks[newTaskId] = taskObject
    newState.tasks[newTaskId] = this.attachCallbacksToObject(taskObject)

    //add new task to sorting order for rendering
    newState.projects[newState.currentProjectId].sortOrder.unshift(taskObject.id)

    this.setState({...newState},
      ()=>{
        API.PUT(this.state)
      })


    return taskObject
    }

    //must do this every time we get state from the server, otherwise they are invalid in new react instance.
    attachCallbacksToObject(obj){
      let newObj = {...obj}
      
      let handlers = {
        onComplete        : this.onComplete.bind(this),
        onEditContent     : this.onEditContent.bind(this),
        onDeleteTask      : this.onDeleteTask.bind(this),
        onDrag            : this.onDrag.bind(this),
        onEditDate        : this.onEditDate.bind(this),
        onEditPoints      : this.onEditPoints.bind(this),
        onEditTags        : this.onEditTags.bind(this),
        onToggleActionMenu: this.onToggleActionMenu.bind(this)
      }

      newObj = {...newObj, ...handlers}
      
      return newObj
    }

    getCurrentProject(){
      return this.state.projects[this.state.currentProjectId]
    }

    getTaskSortIndex(taskID,state){
      let currentProject = state.projects[state.currentProjectId]
      return currentProject.sortOrder.findIndex(e=>e==taskID)
      
    }
    
    getTaskKeys(){
      return Object.keys(this.state.tasks)
    }

    attachCallbacksToAllTasks(state){
      let newState = {...state}
      let taskKeys = Object.keys(newState.tasks)

      taskKeys.map((key)=>{
        let taskObject = this.attachCallbacksToObject(newState.tasks[key])
        newState.tasks[key] = taskObject
      })
      return newState
    }

    //this only updates at the top level. returns the completionHandler once state is updated.
    updateTaskValue(taskID,keyValueObj){
      let completionHandler = ()=>{}
      this.setState({
        ...this.state, ...this.state.tasks[taskID]
      },()=>{completionHandler()})
      return completionHandler
    }

    onComplete(taskID){
      let newState = {...this.state}
      newState.tasks[taskID].isComplete = !newState.tasks[taskID].isComplete

      if(newState.tasks[taskID].isComplete){
        let taskSortIndex = this.getTaskSortIndex(taskID,newState)
        this.moveTask(taskID,this.getTaskCount()-1)
      }

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

      let currentProject = newState.projects[newState.currentProjectId]
      //need to remove from sorting list
      let taskSortingIndex = currentProject.sortOrder.findIndex(e=>e==taskID)
      currentProject.sortOrder.splice(taskSortingIndex,1)
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
    onToggleZen(){
      let newState = {...this.state}
      let currentProject = newState.projects[newState.currentProjectId]
      currentProject.zenActive = !currentProject.zenActive

      this.getTaskKeys().map(key=>{
        if(this.state.tasks[key].owningProjectId == this.state.currentProjectId){
          newState.tasks[key].zenEnabled = currentProject.zenActive
        }
      })
      console.log(newState)
      this.setState(newState)
    }      

  render() { 
    let tasks = this.state.tasks
    return (  
      <div className = {this.props.classes.taskContainer}>

      <Title text = {this.state.projects[this.state.currentProjectId].title}/>

      <ProjectButtonRow>
        <ProjectButton 
          callback={this.addNewTask}
          text="Add Task"
          iconURL = {URLs.iconURL.addTask}
          isActive = {false}
        />
        <ProjectButton 
          callback={this.onToggleZen}
          text="Zen Mode"
          iconURL = {URLs.iconURL.zen}
          isActive = {this.state.projects[this.state.currentProjectId].zenActive}// this.state.projects[this.state.currentProjectId].zenActive}
        />
        <ProjectButton 
          callback={()=>{this.moveTask("0",2)}}
          text="Filters"
          iconURL = {URLs.iconURL.filters}
          isActive = {this.state.projects[this.state.currentProjectId].filterActive}
        />
      </ProjectButtonRow>

      
        {
          this.getCurrentProject().sortOrder.map((ID)=>{
            
            if(tasks[ID].owningProjectId == this.state.currentProjectId){
              return <Task {...tasks[ID]} />
            }
            return
          })
        }
        

      </div>
    )
  }
}
 
export default injectSheet(styles)(ProjectsContainer);

