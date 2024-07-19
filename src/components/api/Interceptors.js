import axios from "axios"

const baseURL = 'http://localhost:3040'

const axiosUserInstance = axios.create({
  baseURL: baseURL,
});

axiosUserInstance.interceptors.request.use(
  (request) => {
    const userToken = sessionStorage.getItem("usersToken")
    request.headers["Authorization"] = userToken
    return request
  },
  (error) => {
    return error
  }
  
);

const axiosAdminInstance = axios.create({
    baseURL: baseURL,
  });
  
  axiosAdminInstance.interceptors.request.use(
    (request) => {
      const adminToken = sessionStorage.getItem("adminsToken")
      request.headers["Authorization"] = adminToken
      return request
    },
    (error) => {
      return error
    }
  );

export {
    axiosUserInstance,
    axiosAdminInstance
};


