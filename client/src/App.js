import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './component/home';
import Login from './component/Login';
import Detail from './component/detail';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App;
