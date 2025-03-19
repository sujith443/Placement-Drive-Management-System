// src/components/common/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/assets/images/logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Campus Placement Portal"
          />
          <span className="brand-text">Campus Placement Portal</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/placement-drives" className="nav-link-custom">Placement Drives</Nav.Link>
            <Nav.Link as={Link} to="/internships" className="nav-link-custom">Internships</Nav.Link>
            <Nav.Link as={Link} to="/crt-timetable" className="nav-link-custom">CRT Schedule</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;