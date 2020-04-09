import React, { Component } from 'react';
import { w3cwebsocket } from 'websocket';

import { executeAction } from '../../ws/ws_manager'
import MovieList from '../../components/movie-list/movie-list'
import { Form, Button, ButtonGroup, Image } from 'react-bootstrap';


export default class Judge extends Component {

    state = { 
        client: null, 
        stepGame: 1,
        count: 0, 
        stages: [], 
        movies: [],
        users: [],
        round: 0,
        question: null,
    }

    componentDidMount() {
        this.connect();
    }

    connect = () => {

        const ws = new w3cwebsocket('ws://192.168.0.201:8500/websocket');

        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            this.setState({ client: ws });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };

        ws.onmessage = (message) => {
            
            try { 
                
                console.log(message)
                let data = JSON.parse(message.data);
                executeAction(data, this);
                return true;
                
            } catch {
                return null;
            } 
        };
    };

    _renderStages() {
        return this.state.stages.map(stage => {
                    return(
                        (stage==this.state.strike) ?
                            <strike>
                                <img
                                    src='user.svg'
                                    width="50"
                                    height="50"
                                    className="d-inline-block align-top"
                                    alt="Player"
                                />
                            <h3 key="{stage}-1">Player {stage}</h3>
                            </strike> 
                        :
                        <div>
                            <img
                                    src='user.svg'
                                    width="50"
                                    height="50"
                                    className="d-inline-block align-top"
                                    alt="Player"
                                />
                            <h3 key={stage}>Player {stage}</h3>
                        </div>
                            
                    )
                });
    }

    _renderSwich() {
        switch(this.state.stepGame) {
            case 1:
                return this._renderStages();
            
            case 2:
                // TODO WE CAN PUT HERE
                // users[0] vs users[1]...
                return <h3>Start Round {this.state.round} in {this.state.count} seconds</h3>;
            case 3:
                return <MovieList movies = { this.state.movies } question={this.state.question} />;
            case 4: 
                return (
                        <React.Fragment>
                            {
                                this.state.users.map(item => {
                                    return  <div key={item.id.value}>
                                                <Image src={item.picture.large} />
                                                <h3>
                                                        {item.name.first} {item.name.last} = {item.wons}
                                                </h3>
                                            </div>
                                })
                            }
                        </React.Fragment>
                )
            default:
        }
    }

    render() {
        return (
            <div>
                <div>
                    { this._renderSwich() }
                </div>
            </div>
        );
    }
}