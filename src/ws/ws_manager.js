import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8500');

class WsManager extends Component {
  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(message);
      try{
        let data = JSON.parse(evt.data);
        executeAction(data);
        return true;
      }catch{
          return null;
      } 
    };
  }

  
  
  //function to handler ws
  // main functions
  send(msg){
    client.send(JSON.stringify(msg));
  }

  //actions functions (own actions)
  // when try to play with other play..then enter a room 
  join_room(room, user){
    this.send({'action': 'join_room', 'params': {'room': room, 'user': user}});
  }

  // when generate a room to wait other oponent
  create_room(room, user){
    this.send({'action': 'create_room', 'params': {'room': room, 'user': user}});
  }

  // when the play choose a option playing...
  play(option, user){
    this.send({'action': 'play', 'params': {'move': option, 'user': user}});
  }

  get_rooms(user){
    this.send({'action': 'get_rooms', 'params': {'user': user}});
  }

  //action from server
  executeAction(data){
    const {action, params} = data;

    if (action=='joined_room'){
      this.joined_into_your_room(params);
      return ;
    }
    if (action=='left_room'){
      this.left_your_room(params);
      return ;
    }
    if (action=='you_won_play'){
      this.won_play(params);
      return ;
    }
    if(action=='you_lose_play'){
      this.lose_play(params);
      return ;
    }
    if(action=='you_won_game'){
      this.won_game(params);
      return ;
    }
    if(action=='you_lose_play'){
      this.lose_game(params);
      return ;
    }
  }

  joined_into_your_room(params){
    // what do when its happen?
  }

  left_your_room(params){
    // what do when its happen?
  }

  won_play(params){
    // what do when its happen?
  }
  lose_play(params){
    // what do when its happen?
  }
  won_game(params){
    // what do when its happen?
  }
  lose_game(params){
    // what do when its happen?
  }

  render() {
    return (
      <div>
        Practical Intro To WebSockets.
      </div>
    );
  }
}
