import * as actionTypes from "./actionTypes";

let nextId = 0;

export const addContacts = (content) => ({
  type: actionTypes.ADD_CONTACTS,
  payload: {
    id: ++nextId,
    content,
  },
});
