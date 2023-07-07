import { useQuery } from '@tanstack/react-query';
import request from '@utils/baseAPI/WrapperApi';
import { URL_BASE_API } from '@configs/env';
import { getUrlPaging } from '@utils/urls';

export const getWorkspaces = (page = 1, pageSize = 9999) => {
  const url = getUrlPaging(`${URL_BASE_API}/workspaces`, page, pageSize);
  const { data, isLoading, refetch } = useQuery(['get-workspaces', page, pageSize], () =>
    request({ url })
  );

  return { data: data?.data, isLoading, refetch };
};
