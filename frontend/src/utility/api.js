import axios from "axios";
import basePath from "./basePath";
import {useLocation } from 'react-router-dom'

class api {
  constructor() {
    this.instance = axios.create({
      withCredentials: false,
      baseURL: basePath.ledgerUrl,
    });

    this.instance.interceptors.request.use(
      (res) => {
        res.headers["platform"] = "web";
        return res;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response && err.response.status === 403) {
          const his = useLocation();
          his.push("/login");
          window.location.reload();
        }
        return Promise.reject(err);
      }
    );
  }
  /**Handles making a get request
   * @param {String} url url to fetch
   * @param {Object} options request options
   * @param {Boolean} authOff handles whether to add the bearer token header in the ghet request
   * @returns
   */

  get(url, options, authOff) {
    const access_token = localStorage.getItem("access_token");
    const headers = authOff
      ? {}
      : {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${access_token}`,
        };
    return new Promise((resolve, reject) => {
      this.instance
        .get(url, { ...options, headers })
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  }

  post(url, data, headers) {
    const access_token = localStorage.getItem("access_token");
    const newHeaders = { ...headers };
    newHeaders["Authorization"] = `Bearer ${access_token}`;
    return this.instance.post(url, data, { headers: newHeaders });
  }

  put(url, data, headers) {
    const access_token = localStorage.getItem("access_token");
    const newHeaders = { ...headers };
    newHeaders["Authorization"] = `Bearer ${access_token}`;
    return this.instance.put(url, data, { headers: newHeaders });
  }

  delete(url, options) {
    const access_token = localStorage.getItem("access_token");
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    return this.instance.delete(url, { headers, ...options });
  }
}

export default new api();
