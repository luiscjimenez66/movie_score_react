import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class MovieList extends Component {



    render() {

        const { movies } = this.props;
        console.log(movies);
        return (
            <Row>
                <Col>1 of 2</Col>
                <Col>2 of 2</Col>
            </Row>
        );
    }
}