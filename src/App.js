/* eslint-disable no-bitwise */
// React
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// Material UI Components
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import './components/AppBar.scss';

// Other Components
import Swal from 'sweetalert2';
import TineyerSpinner from './components/spinner/TineyerSpinner';
import TineySpinner from './components/spinner/TineySpinner';
import DataTable from './components/DataTable';

// Other External
const axios = require('axios').default;

// Define headers for provider table
const providerHeaders = [
  { field: 'providerSlug', hidden: true },
  { field: 'address', hidden: true },
  { field: 'city', hidden: true },
  {
    title: '',
    field: 'image',
    sorting: false,
    searchable: false,
    filtering: false,
    // eslint-disable-next-line react/prop-types
    render: ({ name, image }) => <Avatar alt={name} src={image} />,
  },
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'email', sorting: false, searchable: false },
  { field: 'postcode', hidden: true },
  { title: 'Date of Birth', field: 'dob', type: 'date' },
  {
    title: 'Enrollments',
    field: 'enrollments',
    type: 'numeric',
    sorting: false,
    searchable: false,
    initialEditValue: 0,
    editable: 'never',
  },
  {
    title: 'Active',
    field: 'active',
    type: 'numeric',
    sorting: false,
    searchable: false,
    initialEditValue: 0,
  },
  {
    title: 'Registration Date',
    field: 'registrationDate',
    type: 'date',
    hidden: true,
  },
];

// Define headers for children table
const childrenHeaders = [
  { title: 'Slug', field: 'childSlug', hidden: true },
  { title: 'Name', field: 'name' },
  { title: 'Start Date', field: 'startDate', type: 'date' },
  { title: 'Guardians', field: 'guardiansCount', type: 'numeric' },
];

class App extends Component {
  state = {
    providers: [],
    children: [],
    isLoading: false,
    error: null,
  };

  // Make data calls when components are mounted
  async componentDidMount() {
    // Set loading state and unset when resolved
    this.setState({ isLoading: true });

    // Set base URL independently so can be adjusted if DB deployed elsewhere
    const baseUrl = `http://localhost:3001`;

    const providerResponse = await axios.get(`${baseUrl}/providers`).catch((err) => {
      // Fire error alert if fetch fails
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: "I'll try again later",
      });
    });

    const childrenResponse = await axios.get(`${baseUrl}/children`).catch((err) => {
      // Fire error alert if fetch fails
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
              <Route path={'/providers' | '/'}>
                <DataTable
                  title="Providers Database"
                  headers={providerHeaders}
                  kids={children}
                  providers={providers}
                  providersTable
                />
              </Route>
              <Route exact path="/children">
                <DataTable
                  title="Children Database"
                  headers={childrenHeaders}
                  kids={children}
                  providers={providers}
                  providersTable={false}
                />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
