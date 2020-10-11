import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import Content from './Core/Content';

class App extends Component {
  render() {
    return (
       <div>
          <Content/>
       </div>
    );
 }
}

export default App;
