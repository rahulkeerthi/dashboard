// React
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import './components/AppBar.scss';

// Other 3rd Party
import Swal from 'sweetalert2';

// Spinners
import TineyerSpinner from './components/spinner/TineyerSpinner';
import TineySpinner from './components/spinner/TineySpinner';

const axios = require('axios').default;

class App extends Component {
  state = {
    providers: [],
    children: [],
    isLoading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    const baseUrl = `http://localhost:3001`;

    const providerResponse = await axios.get(`${baseUrl}/providers`).catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: "I'll try again later",
      });
    });

    const childrenResponse = await axios.get(`${baseUrl}/children`).catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: "I'll try again later",
      });
    });

    this.setState({
      providers: providerResponse.data,
      children: childrenResponse.data,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, providers, children, error } = this.state;

    return (
      <Router>
        <div className="App">
          <AppBar position="static" className="appbar">
            {isLoading && <TineySpinner message="Loading..." />}
            <Tabs>
              <TineyerSpinner className="appbar__logo" />
              <Link to="/providers" className="appbar__link">
                <Tab label="Providers" className="appbar__tab" />
              </Link>
              <Link to="/children" className="appbar__link">
                <Tab label="Children" className="appbar__tab" />
              </Link>
            </Tabs>
          </AppBar>
          <Container style={{ marginTop: '16px' }}>
            {error && <TineySpinner message={error} />}
            <Switch>
              <Route path={'/providers' || '/'} />
              <Route exact path="/children" />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
