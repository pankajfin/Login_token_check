import { LOGIN_POST_DATA, SIGNUP_POST_DATA } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    // case FETCH_DATA:
    //   return action.payload.data;
    case LOGIN_POST_DATA:
      return action.payload;
    case SIGNUP_POST_DATA:
      return action.payload;
      
    default:
      return state;
  }
}
