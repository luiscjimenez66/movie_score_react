import React, { Component } from 'react';

export default class MovieList extends Component {



    render() {

        const { movies } = this.props;
        console.log(movies);
        return (
            <div>
                <h2>{ movies[1] }</h2>
                <h2>{ movies[2] }</h2>
            </div>
        );
    }
}