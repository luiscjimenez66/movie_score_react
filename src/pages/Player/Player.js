import React, { Component } from 'react';
import { Form, Button, ButtonGroup, Image } from 'react-bootstrap';
import { w3cwebsocket } from 'websocket';
import { executeAction, join_room, play } from '../../ws/ws_manager'


export default class Player extends Component {

    state = { 
        codeGame: '', 
        stepGame:0, 
        client: null, 
        count: 3, 
        movies: [], 
        users: [],
        round: 0,
        player: {},
    }


    componentDidMount() {
        this.connect();
    }

    connect = () => {

        const ws = new w3cwebsocket('ws://192.168.0.201:8500/websocket/?client=movie');

        //let that = this; // cache the this
        //var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");
            this.setState({ client: ws })
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in `,
                e.reason
            );
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

    _handleSubmit = (e) => {
        e.preventDefault();

        alert(this.state.codeGame)
    }

    _handleEnterCode(e){
        e.preventDefault();
        join_room(this.state.codeGame, this.state.client);
    }

    movement(what_play){
        play(this.state.movies[what_play].key, this.state.client);
    }

    _renderSwich = () => {

        switch(this.state.stepGame) {
            case 0:
                return  <Form onSubmit={e => this._handleEnterCode(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Player code</Form.Label>
                                <Form.Control type="text" placeholder="Code" onChange={e=>this.setState({
                                    codeGame: e.target.value
                                })} />
                                
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Entrar
                            </Button>
                        </Form>
            
            case 1: return <div>
                        <h1>Player Ready!</h1>
                        <Image src={this.state.player.picture.large} />
                        <h3>
                            {this.state.player.name.first} {this.state.player.name.first}
                        </h3>
                    </div>;
            case 2:
                return <h3>{this.state.round} - {this.state.count}</h3>;
            case 3:
                return <ButtonGroup>
                            <Button variant="primary" type="button" onClick={() => this.movement(0)}>
                                {this.state.movies[0].data.Title}
                            </Button>
                            <Button variant="primary" type="button" onClick={() => this.movement(1)}>
                                {this.state.movies[1].data.Title}
                            </Button>
                        </ButtonGroup>
            case 4: 
                return (
                        <React.Fragment>
                            {
                                this.state.users.map(item => {
                                    return  <div key={item.id.value}>
                                                <Image src={item.picture.thumbnail} />
                                                <h3>
                                                        {item.name.first} {item.name.first} = {item.wons}
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
                { this._renderSwich() }
            </div>
        );
    }
}