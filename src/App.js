import React, { Component } from 'react';
import TineySpinner from './components/spinner/TineySpinner';

class App extends Component {
  state = {
    providers: [],
    children: [],
    isLoading: true,
    error: null,
  };
  render() {
    return <div className="App">{isLoading && <TineySpinner message="Loading..." />}</div>;
  }
}

export default App;
