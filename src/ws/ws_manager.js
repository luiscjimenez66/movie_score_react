//action from server
export function executeAction(data, object) {
    
  const {action, params} = data;
  switch(action){
    case 'get_codes':{
      get_codes(params, object);
      break;
    }
    case 'starting_play':{
      starting_play(params, object);  
      break;
    }
    case 'start_play':{
      start_play(params, object);
      break; 
    }
    case 'accepted_code':{
      accepted_code(params, object);
      break;
    }
    case 'end_game':{
      end_game(params, object);
      break;
    }
  }
}

export function get_codes(params, object) {
  object.setState({ stages: params.codes });
}

export function starting_play(params, object) {
  const { time, round } = params;
  object.setState({ stepGame: 2, count:  time, round: round });
}

export function start_play(params, object) {
  const { options } = params;
  object.setState({ stepGame: 3, movies:  options });
}

//export function  to handler ws
// main export function s
export function send(msg, client){
  client.send(JSON.stringify(msg));
}

//actions export function s (own actions)
// when try to play with other play..then enter a room 
export function  join_room(user_key, client){
  send({'action': 'join_room', 'params': {'user_key': user_key}}, client);
}

// when the play choose a option playing...
export function  play(move, client){
  send({'action': 'play', 'params': {'answer': move}}, client);
}

export function accepted_code(params, object){
  const {person} = params; 
  console.log(person);
  object.setState({stepGame: 1, player:person});
}

export function end_game(params, object){
  console.log(params.users)
  object.setState({stepGame: 4, users: params.users });
}
