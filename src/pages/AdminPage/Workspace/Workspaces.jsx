import React, { useState, useContext, useEffect } from 'react';
import { compose } from 'redux';
import { Row, Col, Card, Radio, Table, Tag, Pagination, Input, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { trim } from 'lodash';
import moment from 'moment';

import { usePagination, withPaginate, PaginateContext } from '@contexts/Paginate/PaginateContext';
import { getWorkspaces } from '@modules/workspaces/services/workspaceService';

const { Search } = Input;

function Workspaces() {
  const { page, pageSize } = usePagination();
  const { handleChangePage, handleChangeRowsPerPage } = useContext(PaginateContext);
  const [status, setStatus] = useState('b');
  const [textSearch, setTextSearch] = useState('');

  const { data, isLoading, refetch, error, isSuccess } = getWorkspaces(page, pageSize, textSearch);

  const onChange = (e) => {
    setStatus(e.target.value);
  };

  const onSearch = (event) => {
    setTextSearch(event.target.value);
  };

  useEffect(() => {
    const getWs = setTimeout(() => {
      handleChangePage(1);
      refetch();
    }, 500);

    return () => clearTimeout(getWs);
  }, [textSearch]);

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <Link to={`/admin/workspaces/${id}`}>{id}</Link>
    },
    {
      title: 'namespace',
      dataIndex: 'namespace',
      key: 'namespace'
    },
    {
      title: 'package_alias',
      dataIndex: 'package_alias',
      key: 'package_alias',
      render: (package_alias) => {
        let color = '#B2BABB';
        switch (trim(package_alias)) {
          case 'TRIAL':
            color = '#EC7063';
            break;
          case 'PRO':
            color = '#5DADE2';
            break;
          case 'ADVANCED':
            color = '#52BE80';
        }

        return (
          <Tag color={color} key={package_alias}>
            {package_alias.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'tenant_id',
      dataIndex: 'tenant_id',
      key: 'tenant_id'
    },
    {
      title: 'vpc_id',
      dataIndex: 'vpc_id',
      key: 'vpc_id'
    },
    {
      title: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => {
        const timeago = moment(created_at).fromNow();
        return (
          <Tooltip title={created_at}>
            <span>{timeago}</span>
          </Tooltip>
        );
      }
    },
    {
      title: 'updated_at',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (updated_at) => {
        const timeago = moment(updated_at).fromNow();
        return (
          <Tooltip title={updated_at}>
            <span>{timeago}</span>
          </Tooltip>
        );
      }
    }
  ];

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={
                <div>
                  <Input
                    placeholder="Search by namespace or tenant"
                    onChange={onSearch}
                    enterButton={undefined}
                    allowClear
                    size="small"
                    style={{ width: 300 }}
                  />
                </div>
              }
              extra={
                <>
                  <Radio.Group onChange={onChange} value={status}>
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">Active</Radio.Button>
                  </Radio.Group>
                </>
              }>
              <div className="table-responsive">
                <Table
                  loading={isLoading}
                  columns={columns}
                  dataSource={data?.data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <div style={{ padding: 20, textAlign: 'right' }}>
                <Pagination
                  responsive={true}
                  pageSize={pageSize}
                  current={page}
                  pageSizeOptions={[10, 25]}
                  total={data?.pagination?.total}
                  onChange={(pageLocal, pageSizeLocal) => {
                    if (pageSizeLocal !== pageSize) {
                      handleChangeRowsPerPage(pageSizeLocal);
                    } else {
                      handleChangePage(pageLocal);
                    }
                  }}
                  showTotal={(total) => (
                    <span>
                      Total 	&nbsp;
                      <b>{total}</b>
                      &nbsp; workspaces
                    </span>
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default compose(withPaginate)(Workspaces);
