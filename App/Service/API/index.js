import apisauce from "apisauce";
import Config from "../../config";
let API = null;

export function getInstance() {
  if (!API) {
    API = apisauce.create({
      baseURL: Config.BASE_URL,
      timeout: 10000
    });
  }
  return API;
}

export function setToken(token) {
  getInstance().setHeader("Authorization", `Bearer ${token}`);
}
