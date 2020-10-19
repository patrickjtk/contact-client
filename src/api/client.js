import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://simple-contact-crud.herokuapp.com/",
});

export default apiClient;
