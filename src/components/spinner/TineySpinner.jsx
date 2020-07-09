import React from 'react';
import PropTypes from 'prop-types';
import './TineySpinner.scss';
import tiney from '../../tiney.svg';

function TineySpinner({ message }) {
  return (
    <div className="tiney">
      <header className="tiney-header">
        <img src={tiney} className="tiney-logo" alt="tiney logo" />
        <h1>{message}</h1>
      </header>
    </div>
  );
}

TineySpinner.propTypes = { message: PropTypes.string };
TineySpinner.defaultProps = { message: 'Loading...' };

export default TineySpinner;
