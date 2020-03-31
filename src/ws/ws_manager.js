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

  if (action === 'joined_room'){
    joined_into_your_room(params);
    return ;
  }

  if (action === 'left_room'){
    left_your_room(params);
    return ;
  }

  if (action === 'you_won_play'){
    won_play(params);
    return ;
  }

  if(action === 'you_lose_play'){
    lose_play(params);
    return ;
  }

  if(action === 'you_won_game'){
    won_game(params);
    return ;
  }

  if(action === 'you_lose_play'){
    lose_game(params);
    return ;
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
export function  join_room(room, user){
  send({'action': 'join_room', 'params': {'room': room, 'user': user}});
}

// when generate a room to wait other oponent
export function  create_room(room, user, client){
  send({'action': 'create_room', 'params': {'room': room, 'user': user}}, client);
}

// when the play choose a option playing...
export function  play(option, user){
  send({'action': 'play', 'params': {'move': option, 'user': user}});
}

export function  get_rooms(user){
  send({'action': 'get_rooms', 'params': {'user': user}});
}

export function  joined_into_your_room(params){
  // what do when its happen?
}

export function  left_your_room(params){
  // what do when its happen?
}

export function  won_play(params){
  // what do when its happen?
}

export function  lose_play(params){
  // what do when its happen?
}

export function  won_game(params){
  // what do when its happen?
}

export function  lose_game(params){
  // what do when its happen?
}