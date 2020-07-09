import React, { Component } from 'react';
// Spinners

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TineyerSpinner from './components/spinner/TineyerSpinner';
import TineySpinner from './components/spinner/TineySpinner';

class App extends Component {
  state = {
    providers: [],
    children: [],
    isLoading: false,
    error: null,
  };

  render() {
    const { isLoading, providers, children, error } = this.state;

    return (
      <div className="App">
        <AppBar position="static" className="appbar">
          {isLoading && <TineySpinner message="Loading..." />}
          <Tabs>
            <TineyerSpinner className="appbar__logo" />
            <Tab label="Providers" className="appbar__tab" />
            <Tab label="Children" className="appbar__tab" />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

export default App;
