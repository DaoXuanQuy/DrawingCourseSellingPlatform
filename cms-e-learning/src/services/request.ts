import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { refreshToken as refreshTokenApi } from './api/AuthController';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
// const cookies = new Cookies();
const axiosClient = axios.create({
  // config credentials
  withCredentials: false,
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (config?.headers == null) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    const url: string = config.url !== undefined ? config.url : '';
    // console.log('api call: ', url);

    if (!url.startsWith('/api/auth')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }
    // Do something before request is sent
    return config;
  },
  async function (error) {
    // Do something with request error
    return await Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (err) {
    const config = err.config;
    console.log(err);
    if (err.response != null && err.response.status === 401) {
      console.log('ok');
      config._retry = true;
      try {
        const refreshToken: string = localStorage.getItem('refreshToken') || '';
        if (refreshToken !== '') {
          refreshTokenApi({ refreshToken })
            .then((response) => {
              localStorage.setItem('accessToken', response.data?.token || '');
              localStorage.setItem('refreshToken', response.data?.refreshToken || '');
            })
            .catch((status) => {
              if (status === 401) {
                console.log(err);
              }
            });
          return await axios(err.response.config);
        }
      } catch (err) {
        console.log(err);
        return await Promise.reject(err);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return await Promise.reject(err);
  },
);

function request<T = any, D = any>(url: string, config: AxiosRequestConfig<D>): Promise<T> {
  return axiosClient.request({
    ...config,
    url: url,
  });
}
export { request };
export default axiosClient;
