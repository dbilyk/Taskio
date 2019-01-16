import React, { Component } from 'react';
import injectSheet from "react-jss"

const styles = {
  taskContainer:{
    backgroundColor: "#eee"
  },
  taskText:{
    color:"#555"

  }
}


class Task extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title : "",
      description : "",
      completed : false,
      
    }
  }
  render() { 
    return (  
      <div className = {this.props.classes.taskContainer} >
        testing this container
        
      </div>
    );
  }
}
 
export default injectSheet(styles)(Task);

