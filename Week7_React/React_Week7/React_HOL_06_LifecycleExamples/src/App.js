import React, { Component } from 'react';
import LifecycleDemo from './components/LifecycleDemo';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showChild: true };
  }

  toggleChild = () => {
    this.setState((prev) => ({ showChild: !prev.showChild }));
  };

  render() {
    return (
      <div className="app-container">
        <h1 className="main-title">Component Lifecycle — HOL 06</h1>
        <button className="toggle-btn" onClick={this.toggleChild}>
          {this.state.showChild ? 'Unmount Component' : 'Mount Component'}
        </button>
        {this.state.showChild && <LifecycleDemo />}
      </div>
    );
  }
}

export default App;
