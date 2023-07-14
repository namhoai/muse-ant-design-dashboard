import { useQuery } from '@tanstack/react-query';
import request from '@utils/baseAPI/WrapperApi';
import { URL_BASE_API } from '@configs/env';
import { getUrlPaging } from '@utils/urls';

export const getWorkspaces = (page = 1, pageSize = 10, textSearch = '', expired, packageType, statusList) => {
  const url = `${getUrlPaging(`${URL_BASE_API}/workspaces`, page, pageSize)}&text=${textSearch}&expired=${expired}&package_alias=${packageType}&status=${statusList}`;
  const { data, isLoading, isRefetching, refetch } = useQuery(['get-workspaces', page, pageSize], () =>
    request({ url })
  );

  return { data: data?.data, isLoading, refetch, isRefetching };
};


export const getWorkspaceById = (workspaceId) => {
  const url = `${URL_BASE_API}/workspaces/${workspaceId}`;
  const { data, isLoading, refetch } = useQuery(['get-workspaces', workspaceId], () =>
    request({ url })
  );

  return { data: data?.data, isLoading, refetch };
};

