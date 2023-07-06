import axios from 'axios';
import authHeader from './AuthHeader';

import { get } from 'lodash';
import { URL_BASE_API, URL_AUTH_API } from '@configs/env';
import { loadFromLocalStorageObjectFromBase64, saveToLocalStorage } from '@databases/localStorage';
import { contantAuthentication } from '@constants/';

const instance = axios.create({
  baseURL: URL_BASE_API,
  timeout: 30000,
  headers: authHeader()
});

instance.interceptors.request.use(function (config) {
  const user = loadFromLocalStorageObjectFromBase64(contantAuthentication.DATA_AUTH);
  config.headers.Authorization = user?.access_token ? `Bearer ${user?.access_token}` : '';
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    // Do something with response error
    if (error.response.status === 401 || error.response.status === 403) {
      return getFefreshToken(error.config);
    }
    return Promise.reject(error);
  }
);

// TODO: Handle refesh token.
const getFefreshToken = (config) => {
  const user = loadFromLocalStorageObjectFromBase64(contantAuthentication.DATA_AUTH);
  return axios({
    method: 'post',
    url: `${URL_AUTH_API}/auth/token/refresh`,
    data: {
      refresh_token: user.refresh_token
    },
    headers: { 'Content-Type': 'multipart/form-data' }
  })
    .then((result) => {
      const userResponse = get(result, 'data');
      if (userResponse) {
        saveToLocalStorage(contantAuthentication.DATA_AUTH, btoa(userResponse));
        config.headers['Authorization'] = 'Bearer ' + userResponse.access_token;
        return instance(config);
      }
    })
    .catch(() => {
      saveToLocalStorage(contantAuthentication.DATA_AUTH, '');
      window.location.replace('/login');
    });
};

const request = (options) => {
  return instance(options);
};

export default request;
