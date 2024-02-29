import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// utils
import { HOST_API } from 'src/config-global';
import { concatPath } from './url';

// override the default
declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

class BaseApi {
  constructor(
    private apiIns: AxiosInstance,
    private prefixPath: string
  ) {}

  get<T>(...params: Parameters<typeof axios.get>) {
    const [url, ...resParams] = params;
    return this.apiIns.get<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  post<T>(...params: Parameters<typeof axios.post>) {
    const [url, ...resParams] = params;
    return this.apiIns.post<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  put<T>(...params: Parameters<typeof axios.put>) {
    const [url, ...resParams] = params;
    return this.apiIns.put<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  patch<T>(...params: Parameters<typeof axios.patch>) {
    const [url, ...resParams] = params;
    return this.apiIns.patch<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  delete<T>(...params: Parameters<typeof axios.delete>) {
    const [url, ...resParams] = params;
    return this.apiIns.delete<T>(concatPath(this.prefixPath, url), ...resParams);
  }

  getApiInstance() {
    return this.apiIns;
  }
}

export type ApiResponse<T> = AxiosResponse<T>;
export { BaseApi };

// theme source
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
