import { useQuery, useMutation } from '@tanstack/react-query';
import request from '@utils/baseAPI/WrapperApi';
import { URL_BASE_API } from '@configs/env';
import { getUrlPaging } from '@utils/urls';

export const getListRecordDNS = (suffix, page = 1, pageSize = 10) => {
    const url = `${getUrlPaging(`${URL_BASE_API}/dns`, page, pageSize)}&suffix=${suffix}`;
    const { data, isLoading, isRefetching, refetch } = useQuery([`get_dns_${suffix}`, name], () =>
        request({ url })
    );

    return { data: data?.data, isLoading, refetch, isRefetching };
};

export const searchDNS = (name = "") => {
    const url = `${URL_BASE_API}/dns/${name}`;
    const { data, isLoading, refetch } = useQuery(['search_dns', name], () =>
        request({ url })
    );

    return { data: data?.data, isLoading, refetch };
};

export const createDNS = () => {
    const url = `${URL_BASE_API}/dns`;
    return useMutation(['create-dns'], (data) => request({ url, data, method: 'POST' }));
};

export const deleteDNS = () => {
    const url = `${URL_BASE_API}/dns`;
    return useMutation(['delete-dns'], (data) => request({ url, data, method: 'DELETE' }));
};

