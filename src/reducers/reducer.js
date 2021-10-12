const initialState = { fbId: "", value: 0,  updateMerchant:false}
export default (state = initialState, action) => {
  switch (action.type) {
    case "set-fb-pixel":
      console.log('set pixel', action.payload);
      return {
        ...state,
        fbId: action.payload
      };
    case "set-value":
      console.log('set value', action.payload);
      return {
        ...state,
        value: action.payload
      };
    case "update-merchant":
      console.log('update merchant', action.payload);
      return {
        ...state,
        updateMerchant: action.payload
      };
    default:
      return state;
  }
};