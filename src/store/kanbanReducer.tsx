const kanbanReducer = function (state = {cards:[]}, action:any) {
    switch (action.type) {
      case "PUT": {
        return {...state, cards:action.payload};
        }
      default:
        return state;
    }
};

export default kanbanReducer;