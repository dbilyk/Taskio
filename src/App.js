import React, { Component } from 'react';
import './App.css';

import API from "./Utilities/API"
import ProjectContainer from "./Components/ProjectContainer"


class App extends Component {

  componentDidMount(){
    API.GET_STATE()
  }

  render() {
    return (
      <div className="App">
        <ProjectContainer />
        
        
      </div>
    );
  }
}

export default App;
