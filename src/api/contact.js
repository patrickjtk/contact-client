import client from "./client";
const endpoint = "contact";

const getContacts = () => client.get(endpoint);
const getContact = (id) => client.get(endpoint + "/" + id);
const postContact = (userInfo) => client.post(endpoint, userInfo);
const putContact = (id, userInfo) => client.put(endpoint + "/" + id, userInfo);
const deleteContact = (id) => client.delete(endpoint + "/" + id);

export default {
  getContacts,
  getContact,
  postContact,
  putContact,
  deleteContact,
};
