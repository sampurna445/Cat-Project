import { create } from "apisauce";
import { kApiUrl, ERROR_NETWORK_NOT_AVAILABLE } from "../config/WebService";

const api = create({
  baseURL: kApiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key":
      "live_Pu40XRkjBS4WE6GTKiaNBup9YicY4nIffBTqSM3EjFhxiIDQAIfsrkHXvBWtoscQ",
  },
});

class ApiHelper {
  get = async (url, data, headers) => {
    try {
      const response = await api.get(url, data, { headers: headers });

      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, response);
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  post = async (url, data, headers) => {
    try {
      const response = await api.post(url, data, { headers: headers });

      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, response);
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  delete = async (url, data, headers) => {
    try {
      const response = await api.delete(url, data, { headers: headers });

      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, response);
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  imageUpload = async (url, data) => {
    try {
      const response = await api.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return new Promise((resolve, reject) => {
        this.handlePromise(resolve, reject, response);
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handlePromise = (resolve, reject, response) => {
    if (response.error) {
      if (response.error.code === "NETWORK_ERROR") {
        reject(ERROR_NETWORK_NOT_AVAILABLE);
      } else {
        reject();
      }
    } else {
      resolve(response);
    }
  };
}

export default new ApiHelper();
