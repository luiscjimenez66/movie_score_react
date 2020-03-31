import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default class MovieList extends Component {

    render() {

        const { movies } = this.props;
        return (
            <Row>
                {
                    movies.map(movie => {

                        const { data } = movie;
                        console.log(data);
                        return (
                        <Col key={movie.key.toString()}>
                            <Card style={{ width: '50%' }}>
                                <Card.Img variant="top" src={data.Poster} />
                                <Card.Body>
                                    <Card.Title>{data.Title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                        )
                    })
                }
            </Row>
        );
    }
}