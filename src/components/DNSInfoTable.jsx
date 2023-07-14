import { Card, Pagination, Table } from 'antd';
import React, { useContext, useEffect } from 'react';
import { compose } from 'redux';

import { getListRecordDNS } from '@modules/dns/dnsService';
import { usePagination, withPaginate, PaginateContext } from '@contexts/Paginate/PaginateContext';

const DNSInfoTable = ({ suffix }) => {
  const { page, pageSize } = usePagination();
  const { handleChangePage, handleChangeRowsPerPage } = useContext(PaginateContext);

  const { data, isLoading, refetch, isRefetching } = getListRecordDNS(suffix, page, pageSize);

  useEffect(() => {
    refetch()
  }, [page, pageSize])

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'fqdn',
      dataIndex: 'fqdn',
      key: 'fqdn'
    },
    {
      title: 'ttl',
      dataIndex: 'ttl',
      key: 'ttl'
    },
    {
      title: 'type',
      dataIndex: 'type',
      key: 'type'
    }
  ];

  return (
    <Card title={suffix}>
      <Table
        loading={isRefetching || isLoading}
        columns={columns}
        dataSource={data?.data}
        pagination={false}
        className="ant-border-space"
      />
      <div style={{ padding: 20, textAlign: 'right' }}>
        <Pagination
          responsive={true}
          pageSize={pageSize}
          current={page}
          pageSizeOptions={[10, 25]}
          total={data?.pagination?.total}
          onChange={(pageLocal, pageSizeLocal) => {
            debugger;
            if (pageSizeLocal !== pageSize) {
              handleChangeRowsPerPage(pageSizeLocal);
            } else {
              handleChangePage(pageLocal);
            }
          }}
          showTotal={(total) => (
            <span>
              Total &nbsp;
              <b>{total}</b>
              &nbsp; Record
            </span>
          )}
        />
      </div>
    </Card>
  );
};

export default compose(withPaginate)(DNSInfoTable);
