import { userHelper } from "./userHelper.js";
const baseURL = "http://localhost:3030/";

async function requester(method, url, data) {
  const options = { method, headers: {} };

  const userData = userHelper.getUserData();

  if (userData) {
    options.headers["x-authorization"] = userData.accessToken;
  }

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(baseURL + url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    if (response.status === 204) {
      return response;
    }
    return response.json();
  } catch (err) {
    throw err.message;
  }
}

async function get(url) {
  return await requester("GET", url);
}

async function post(url, data) {
  return await requester("POST", url, data);
}

async function put(url, data) {
  return await requester("PUT", url, data);
}

async function del(url) {
  return await requester("DELETE", url);
}

export const api = {
  get,
  post,
  put,
  del,
};
