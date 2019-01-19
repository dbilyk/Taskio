import React, { Component } from 'react';
import Task from "./Task"
import injectSheet from "react-jss"
import API from '../Utilities/API';

const styles = {
  taskContainer:{
    color:"red"
  } 
}


const defaultState = {
  //which project is currently open
  currentProjectId:0,

  //projects array
  projects:[
    {
      id:1,
      title:"Demo Project",
      zenEnabled: false
    }
  ],

  //tasks array
  tasks:[
    
  ]
}


class ProjectsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = defaultState

    //bind stuff
    this.addNewTask = this.addNewTask.bind(this)
  }

  componentWillMount(){
    //fetch tasks from github
    API.PUT(this.defaultState)
    // API.GET().then((data)=>{
    //   this.setState(JSON.parse(data))
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
      id: findHighestId(this.state.tasks)+1,
      owningProjectId:this.state.currentProjectId,
      text:"Demo Task", 
      description:"", 
      points:"",
      tags:["Add Tag"],
      due:"Add Date",
      isComplete:false, 
      footerIsShowing: true,
      actionMenuIsOpen: true
    }

    this.setState({tasks:[taskObject,...this.state.tasks]},(state)=>{API.PUT(state)})


    return taskObject
    }

  toggleZen(){
    
  }

  render() { 
    return (  
      <div className = {this.props.classes.taskContainer}>
        <div onClick={this.addNewTask}>++ ADD</div>
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

