import * as API from "../API";
import Config from "../../config";

export function login(userInfo) {
  return API.getInstance()
    .post("/user/login", { ...userInfo })
    .then(response => {
      return getResult(response);
    });
}

export function signup(userInfo) {
  return API.getInstance()
    .post("/user/register", { ...userInfo })
    .then(response => {
      return getResult(response);
    });
}

export function createTransaction(createTransaction) {
  return API.getInstance()
    .post("/transaction/create", { ...createTransaction })
    .then(response => {
      return getResult(response);
    });
}

export function fetchTransaction() {
  return API.getInstance()
    .get("/transaction")
    .then(response => {
      return getResult(response);
    });
}

export function fetchOneTransaction(id) {
  return API.getInstance()
    .post("/transaction", { tx_id: id })
    .then(response => {
      return getResult(response);
    });
}

export function approveTransaction(id) {
  return API.getInstance()
    .post("/transaction/approve", { tx_id: id })
    .then(response => {
      return getResult(response);
    });
}

export function dismissTransaction(id) {
  return API.getInstance()
    .post("/transaction/dismiss", { tx_id: id })
    .then(response => {
      return getResult(response);
    });
}

export function activateTransaction(id) {
  return API.getInstance()
    .post("/transaction/activate", { tx_id: id })
    .then(response => {
      return getResult(response);
    });
}

export function confirmTransaction(id) {
  return API.getInstance()
    .post("/transaction/confirm", { tx_id: id })
    .then(response => {
      return getResult(response);
    });
}

export function disputeTransaction(id) {
  return API.getInstance()
    .post("/transaction/dispute", { tx_id: id })
    .then(response => {
      return getResult(response);
    });
}

export function resolveTransaction(id) {
  return API.getInstance()
    .post("/transaction/resolve", { tx_id: id })
    .then(response => {
      return getResult(response);
    });
}

export function sendTransactionMessage(id, text) {
  console.tron.log(id);
  console.tron.log(text);
  return API.getInstance()
    .post("/transaction/message", { tx_id: id, body: text })
    .then(response => {
      console.tron.log(response);
      return getResult(response);
    });
}

export function getTransactionMessages(id) {
  return API.getInstance()
    .get("/transaction/message", { tx_id: id })
    .then(response => {
      console.tron.log(response);
      return getResult(response);
    });
}

/* ------------------------------------------------------ */
export function getResult(response) {
  if (!response.ok) {
    throwError(response);
  }
  return response.data;
}

export function throwError(response) {
  if (response.data && response.data.message) {
    throw new Error(response.data.message);
  }
  if (!response.status) {
    throw new Error(response.problem);
  }
  switch (response.status) {
    case 500:
      throw new Error("SERVER_ERROR");
    default:
      throw new Error("UNKNOWN_ERROR");
  }
}
