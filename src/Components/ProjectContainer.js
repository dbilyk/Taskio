import React, { Component } from 'react';
import Task from "./Task"
import injectSheet from "react-jss"

const styles = {
  projectStyles:{
    color:"red"
  } 
}

class ProjectContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      projectTitle : "Test Project",
      enableZen : false,
      tasks : [
        
      ]
      
    }
  }
  render() { 
    return (  
      <div className = {this.props.classes.taskContainer}>
        <Task />
        <Task />
        <Task />
        <Task />

      </div>
    )
  }
}
 
export default injectSheet(styles)(Task);

