import React, { Component } from 'react';
import { w3cwebsocket } from 'websocket';

import { executeAction } from '../../ws/ws_manager'
import MovieList from '../../components/movie-list/movie-list'

export default class Judge extends Component {

    state = { 
                stages: [], 
                client: null, 
                isPlayersRegistried: false, 
                count: 0, 
                isStartingGame: false,
                movies: []
            }

    componentDidMount() {
        this.connect();
    }

    connect = () => {

        const ws = new w3cwebsocket('ws://127.0.0.1:8500/websocket');

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
                
                //const { action, params } = data;
                /*
                if (action === 'get_codes') {
                    this.setState({ stages: params.codes });
                }*/
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
                    <h3 key={stage}>Player {stage}</h3>
                    )
                });
    }

    render() {
        return (
            <div>
                <h1>Room</h1>
                <div>
                    {this.state.isStartingGame
                        ? <MovieList movies = { this.state.movies } />
                        : this.state.isPlayersRegistried 
                            ? <h3>{this.state.count}</h3>
                            : this._renderStages()
                    }
                </div>
            </div>
        );
    }
}