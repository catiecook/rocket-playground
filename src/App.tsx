import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import LandingPage from './pages/LandingPage';
import Graphs from './pages/Graphs';
import NavBar from './components/NavBar';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';

import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Container fluid>
          <NavBar />
          <Router>
            <div>
              <Switch>
                <Route exact path="/" render={ props => <LandingPage /> } />
                <Route path="/graphs" render={ props => <Graphs /> } />
              </Switch>
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
