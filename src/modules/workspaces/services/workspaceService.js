import { URL_BASE_API } from '@configs/env';
import request from '@utils/baseAPI/WrapperApi';

export const getListWorkspace = () => {
  return request({
    url: `${URL_BASE_API}/workspaces`,
    method: 'GET'
  });
};

export const getWorkspace = (workspaceId) => {
  return request({
    url: `${URL_BASE_API}/workspaces/${workspaceId}`,
    method: 'GET'
  });
};

export const deleteWorkspace = (workspaceId) => {
  return request({
    url: `${URL_BASE_API}/workspaces/${workspaceId}`,
    method: 'DELETE'
  });
};

// Create a workspace anonymos
export const createWorkspace = (data) => {
  return request({
    url: `${URL_BASE_API}/workspaces`,
    method: 'POST',
    data
  });
};
