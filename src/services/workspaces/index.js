import { URL_BASE_API } from '@configs/index';
import request from '@utils/baseAPI/WrapperApi';

export const getListLopMon = () => {
  return request({
    url: `${URL_BASE_API}/lop`,
    method: 'GET'
  });
};

export const getLopMon = (idLopMon: string) => {
  return request({
    url: `${URL_BASE_API}/lop/${idLopMon}`,
    method: 'GET'
  });
};

export const deleteLopMon = (idLopMon: string) => {
  return request({
    url: `${URL_BASE_API}/lop/${idLopMon}`,
    method: 'DELETE'
  });
};

export const updateLopMon = (idLopMon: string, data: any) => {
  return request({
    url: `${URL_BASE_API}/lop/${idLopMon}`,
    method: 'PUT',
    data
  });
};

export const createLopMon = (idLopMon: string, data: any) => {
  return request({
    url: `${URL_BASE_API}/lop/${idLopMon}`,
    method: 'POST',
    data
  });
};
