import axios from 'axios';


const URL = "http://177.70.102.109:3005"
const api = axios.create({
    baseURL: URL,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
  
    },
  });

  const upperCase = (payload) => {
    if (!payload) return {};
    return Object.keys(payload).reduce(
      (prev, cur) => ({
        ...prev,
        [cur.toUpperCase()]: payload[cur],
      }),
      {},
    );
  };
  
export const apiget = (url, payload) => {
    const params = upperCase(payload);
    return api.get(url, { params });
  };
  export const apidelete = (url, payload) => {
    const params = upperCase(payload);
    return api.delete(url, { data: { ...params } });
  };
  
  export const apipost = (url, payload, config) => api.post(url, upperCase(payload), config);
  export const apiput = (url, payload, config) => api.put(url, upperCase(payload), config);
  export const apipatch = api.patch;
  