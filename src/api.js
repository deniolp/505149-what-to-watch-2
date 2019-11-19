import axios from 'axios';

import {ActionCreator} from './reducer/reducer';

let api;
const createAPI = (dispatch) => {
  api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (error) => {
    if (error.response === 403) {
      dispatch(ActionCreator.changeIsAuthorizationRequired(true));
    }
    return error;
  };
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export {api};
export default createAPI;
