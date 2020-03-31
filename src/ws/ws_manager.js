//action from server
export function executeAction(data, object) {
    
  const {action, params} = data;

  if (action === 'get_codes'){
    get_codes(params, object);
    return ;
  }

  if(action === 'starting_play') {
    starting_play(params, object);
    return ;
  }

  if(action === 'start_play') {
    start_play(params, object);
    return ;
  }

  if (action==='accepted_code'){
    accepted_code(params, object);
    return;
  }
}

export function get_codes(params, object) {
  object.setState({ stages: params.codes });
}

export function starting_play(params, object) {
  const { time } = params;
  object.setState({ stepGame: 2, count:  time });
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
export function  play(option, user){
  send({'action': 'play', 'params': {'move': option, 'user': user}});
}

export function accepted_code(params, object){
  object.setState({stepGame: 2});
}
