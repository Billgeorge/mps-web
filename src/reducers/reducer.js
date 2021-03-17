const initialState = {fbId:"",value:0}
export default (state=initialState, action) => {
    switch (action.type) {
      case "set-fb-pixel":
          console.log('set pixel',action.payload);
        return {
          ...state,
          fbId: action.payload
        };
        case "set-value":
          console.log('set value',action.payload);
        return {
          ...state,
          value: action.payload
        };
      default:
        return state;
    }
};