import React, { useContext, useEffect, useState } from 'react';
import { parseStringParamsToJson } from '@utils/urls';
import { useSearchParams } from 'react-router-dom';

export const PaginateContext = React.createContext(true);

function usePagination() {
  const context = useContext(PaginateContext);
  if (context === undefined) {
    throw new Error('UseContext PaginateContext is undefined!');
  }
  return {
    page: context.page,
    pageSize: context.pageSize,
    handleChangePage: context.handleChangePage,
    selectedIds: context.selectedIds,
    handleSelectedIds: context.handleSelectedIds
  };
}

function PaginateProvider(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState([]);
  const { defaultPageSize, defaultPage } = props;
  const [page, setPage] = useState(parseInt(searchParams.get('page') || defaultPage || 1, 10));
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get('size') || defaultPageSize || 25, 10)
  );

  const onChangePaginationParam = (paging = 1, pagingSize = 25) => {
    setPage(paging);
    setPageSize(pagingSize);
    setSearchParams({ page: paging, size: pagingSize });
  };
  const handleSelectedIds = (ids) => {
    setSelectedIds(ids);
  };
  useEffect(() => {
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(pageSize) ||
      page < 1 ||
      ![2, 5, 10, 25].includes(pageSize)
    )
      onChangePaginationParam();
  }, [page, pageSize]);

  const handleChangePage = (event, newPage) => {
    onChangePaginationParam(newPage + 1, pageSize);
  };

  const handleChangeRowsPerPage = (event) => {
    const perPage = parseInt(event.target.value, 10);
    onChangePaginationParam(1, perPage);
  };

  return (
    <PaginateContext.Provider
      value={{
        page,
        handleChangePage,
        pageSize,
        handleChangeRowsPerPage,
        selectedIds,
        handleSelectedIds
      }}>
      {props.children}
    </PaginateContext.Provider>
  );
}

function withPaginate(Component) {
  return function PaginateComponent(props) {
    return (
      <PaginateProvider {...props}>
        <Component {...props} />
      </PaginateProvider>
    );
  };
}

export { PaginateProvider, withPaginate, usePagination };
