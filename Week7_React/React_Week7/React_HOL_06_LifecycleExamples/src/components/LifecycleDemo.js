import React, { Component } from 'react';
import './LifecycleDemo.css';

/**
 * Class Component demonstrating all major lifecycle methods:
 * constructor → render → componentDidMount → componentDidUpdate → componentWillUnmount
 */
class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    // constructor: initialise state and bind methods
    this.state = {
      count: 0,
      logs: ['✅ constructor() — Component initialised, state set to { count: 0 }'],
    };
    console.log('constructor() called');
  }

  // Appends a message to the on-screen log
  addLog(message) {
    this.setState((prev) => ({ logs: [...prev.logs, message] }));
  }

  componentDidMount() {
    // Called once after the component is inserted into the DOM
    console.log('componentDidMount() called');
    this.addLog('✅ componentDidMount() — Component mounted into the DOM');
  }

  componentDidUpdate(prevProps, prevState) {
    // Called after every re-render (skip logging the log-update itself)
    if (prevState.count !== this.state.count) {
      console.log('componentDidUpdate() called');
      this.addLog(
        `✅ componentDidUpdate() — count changed from ${prevState.count} to ${this.state.count}`
      );
    }
  }

  componentWillUnmount() {
    // Called just before the component is removed from the DOM
    console.log('componentWillUnmount() called');
    // Cannot call setState here; just log to console
  }

  increment = () => this.setState((prev) => ({ count: prev.count + 1 }));
  decrement = () => this.setState((prev) => ({ count: prev.count - 1 }));

  render() {
    console.log('render() called');
    return (
      <div className="lifecycle-card">
        <h2>Lifecycle Demo Component</h2>

        {/* Counter to trigger componentDidUpdate */}
        <div className="counter-section">
          <p className="count-value">{this.state.count}</p>
          <div className="btn-row">
            <button className="btn btn-inc" onClick={this.increment}>+ Increment</button>
            <button className="btn btn-dec" onClick={this.decrement}>− Decrement</button>
          </div>
        </div>

        {/* Lifecycle log panel */}
        <div className="log-panel">
          <h3>Lifecycle Log</h3>
          <ul>
            {this.state.logs.map((log, i) => (
              <li key={i}>{log}</li>
            ))}
          </ul>
          <p className="unmount-note">
            ⚠️ componentWillUnmount() fires when you click "Unmount Component" above — check the browser console.
          </p>
        </div>
      </div>
    );
  }
}

export default LifecycleDemo;
