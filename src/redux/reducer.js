import * as actionTypes from "./actionTypes";

const initialState = {
  contacts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_CONTACTS: {
      const { id, content } = action.payload;
      return {
        ...state,
        contacts: content,
      };
    }
    default:
      return state;
  }
}
