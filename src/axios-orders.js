import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-334dd.firebaseio.com/"
});

export default instance;
