import React from 'react';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  return (
    <Nav className="nav">
      <Nav.Item>
        <Nav.Link href="#/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/graphs">Graphs</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
