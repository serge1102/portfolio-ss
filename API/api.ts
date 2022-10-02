import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  // URLSearchParams は node.js の interface
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params: params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Bot = {
  send: (msg: string, sessionId?: string) =>
    sessionId
      ? requests.post(`/bot?userSessionID=${sessionId}&userMessage=${msg}`, {})
      : requests.post(`/bot?userMessage=${msg}`, {}),
};


const agent = {
  Bot
};

export default agent;