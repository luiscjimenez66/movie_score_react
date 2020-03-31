import React, { Component } from 'react';

export default class Player extends Component {

    state = { codeGame: '' }

    _handleSubmit = (e) => {
        e.preventDefault();

        alert(this.state.codeGame)
    }

    render() {
        return (
            <div>
                <form onSubmit={this._handleSubmit}>
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                                className="input" 
                                type="text" 
                                placeholder="Find a movie"
                                value={ this.state.codeGame }
                                onChange={e => this.setState({ codeGame: e.target.value }) } />
                        </div>
                        <div className="control">
                            <button className="button is-info">
                                Start Game
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}