import React, { useState, useContext, useEffect } from 'react';
import { compose } from 'redux';
import { Row, Col, Card, Radio, Table, Tag, Pagination, Input, Tooltip, Select } from 'antd';
import { Link } from 'react-router-dom';
import { trim } from 'lodash';
import moment from 'moment';

import { usePagination, withPaginate, PaginateContext } from '@contexts/Paginate/PaginateContext';
import { getWorkspaces } from '@modules/workspaces/services/workspaceService';
import StatusWorkspace from '@components/StatusWorkspace';
import { LIST_STATUS_TYPE_ACTIVE, LIST_STATUS_TYPE, STATUS_TYPE } from '@constants/workspace';

function Workspaces() {
  const { page, pageSize } = usePagination();
  const { handleChangePage, handleChangeRowsPerPage } = useContext(PaginateContext);
  const [status, setStatus] = useState('all');  
  const [packageType, setPackageType] = useState('all');
  const [textSearch, setTextSearch] = useState('');
  const [disabledPackageType, setDisabledPackageType] = useState(false);
  const [statusList, setStatusList] = useState(LIST_STATUS_TYPE_ACTIVE);

  const { data, isLoading, refetch, isRefetching } = getWorkspaces(page, pageSize, textSearch, status === 'expired', packageType, statusList);

  const onChange = (e) => {
    if (e.target.value === 'expired') {
      setPackageType("TRIAL");
      setDisabledPackageType(true)
    } else {
      setPackageType("all");
      setDisabledPackageType(false)
    }
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
  }, [textSearch, status, packageType, statusList]);

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
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return <StatusWorkspace status={status} />;
      }
    }
  ];

  const optionStatus = [
    {
      value: 'All',
      label: 'All (Create*, Delete*, Update*)'
    },
    {
      value: 'Active',
      label: 'Workspace Active (Created, Deleting, Delete fail, Update*)'
    },
    {
      value: STATUS_TYPE.CREATING,
      label: 'creating'
    },
    {
      value: STATUS_TYPE.CREATED,
      label: 'created'
    },
    {
      value: STATUS_TYPE.CREATE_FAIL,
      label: 'create fail'
    },
    {
      value: STATUS_TYPE.DELETING,
      label: 'deleting'
    },
    {
      value: STATUS_TYPE.DELETED,
      label: 'deleted'
    },
    {
      value: STATUS_TYPE.DELETE_FAIL,
      label: 'deleted fail'
    },
    {
      value: STATUS_TYPE.UPDATING,
      label: 'updating'
    },
    {
      value: STATUS_TYPE.UPDATED,
      label: 'updated'
    },
    {
      value: STATUS_TYPE.UPDATE_FAIL,
      label: 'update fail'
    }
  ];

  const handleChangeStatus = (value) => {
    if (value.includes('All')) {
      setStatusList(LIST_STATUS_TYPE);
    } else if (value.includes('Active')) {
      setStatusList(LIST_STATUS_TYPE_ACTIVE);
    } else {
      setStatusList(value);
    }
  };

  const handleChangePackageType = (value) => {
    setPackageType(value)
  }

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
                    allowClear
                    autoFocus
                    style={{ width: 300 }}
                  />
                </div>
              }
              extra={
                <>
                  <Row gutter={[24, 0]}>
                    <Col>
                      <Select
                        mode="multiple"
                        placeholder="Filter status"
                        value={statusList}
                        onChange={handleChangeStatus}
                        style={{ width: '100%', minWidth: '500px' }}
                        options={optionStatus}
                      />
                    </Col>
                    <Col>
                      <Select
                        value={packageType}
                        disabled={disabledPackageType}
                        style={{ width: 180 }}
                        onChange={handleChangePackageType}
                        options={[
                          { value: 'all', label: 'All - package' },
                          { value: 'TRIAL', label: 'TRIAL - package' },
                          { value: 'PRO', label: 'PRO - package' },
                          { value: 'ADVANCED', label: 'ADVANCED - package' }
                        ]}
                      />
                    </Col>
                    <Col>
                      <Radio.Group onChange={onChange} value={status}>
                        <Radio.Button value="all">All</Radio.Button>
                        <Radio.Button value="expired">Expired</Radio.Button>
                      </Radio.Group>
                    </Col>
                  </Row>
                </>
              }>
              <div className="table-responsive">
                <Table
                  loading={isRefetching || isLoading}
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
                      Total &nbsp;
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
