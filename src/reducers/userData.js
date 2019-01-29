import { FETCH_POST } from "../actions";

export default function userData(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
    console.log("FETCH REDUCER",action.payload)
      return action.payload;
    default:
      return state;
  }
}
