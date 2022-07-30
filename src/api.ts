import axios from 'axios';

import {ActionCreator} from './reducer/reducer';

let api;
const createAPI = (dispatch): object => {
  api = axios.create({
    baseURL: `https://5.react.pages.academy/wtw`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response): object => response;

  const onFail = (error): void => {
    if (error.response.status === 401) {
      dispatch(ActionCreator.authorizeUser({}));
      dispatch(ActionCreator.changeIsAuthorizationRequired(true));
    }
    if (error.response.status >= 500) {
      dispatch(ActionCreator.showError(error.response.data.error));
    }
    return;
  };
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export {api};
export default createAPI;
