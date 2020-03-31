import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../../logo.svg';

export const Header = () => (
    <Navbar bg="dark">
        <Navbar.Brand href="/">
            <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            />{' '}
            Preguntados
        </Navbar.Brand>
    </Navbar>
)