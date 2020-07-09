import React from 'react';
import './TineySpinner.scss';
import tiney from '../../tiney.svg';

function TineyerSpinner() {
  return (
    <div>
      <img src={tiney} className="tineyer-logo" alt="tiney logo" />
    </div>
  );
}

export default TineyerSpinner;
