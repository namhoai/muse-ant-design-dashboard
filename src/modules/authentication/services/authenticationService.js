import { URL_AUTH_API } from '@configs/env';
import request from '@utils/baseAPI/WrapperApi';

export const signOut = (data) => {
  return request({
    url: `${URL_AUTH_API}/logout`,
    method: 'GET',
    data
  });
};
