import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`http://localhost:8000/api/signin`, data);
  };

  static Register = (data) => {
    return axios.post(`http://localhost:8000/api/signup`, data);
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
  };
}

let base = "users";

export default AuthApi;
