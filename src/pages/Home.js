import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class Home extends Component {

    render() {
        return (
            <Row>
                <Col>
                    <Link 
                        to="/Judge">
                            <Image src="holder.js/171x180" rounded />
                    </Link>
                </Col>
                
                <Col>
                    <Link 
                        to="/">
                            <Image src="holder.js/171x180" rounded />
                    </Link>
                </Col>
            </Row>
        );
    };
}