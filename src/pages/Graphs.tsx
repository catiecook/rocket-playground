import React from 'react';
import Rockets from '../components/Rockets';
import Year from '../components/Year';
import Cost from '../components/Cost';
import '../styles/Graph.css';

// REFACTOR NOTE:
// This is where the apollo / gql call should be executed
// that way the call is made ont time, and then data is parced and sent
// into components via props.
class Graphs extends React.Component {

  render() {
    return (
      <div className="container">
        <Rockets />
        <Year />
        <Cost />
      </div>
    )
  }
}

export default Graphs;
