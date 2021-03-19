import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import PersonList from './components/PersonList';

class App extends Component {
  render() {
    return (
      <div>
      <PersonList/>
      </div>
    );
  }
}

export default App;


