import React, { Component } from 'react';
import './App.css';

import API from "./Utilities/API"
import ProjectsContainer from "./Components/ProjectsContainer"


class App extends Component {
  render() {
    return (
      <div className="App">
        <ProjectsContainer />
        
        
      </div>
    );
  }
}

export default App;
