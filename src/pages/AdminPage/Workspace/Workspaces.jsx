import React, { useState, useContext } from "react";
import { compose } from 'redux';
import { Row, Col, Card, Radio, Table, Tag, Pagination } from "antd";
import { usePagination, withPaginate, PaginateContext } from '@contexts/Paginate/PaginateContext';
import { getWorkspaces } from "@modules/workspaces/services/workspaceService";
import { Link } from "react-router-dom";
import { trim } from "lodash";


// Images

function Workspaces() {
  const { page, pageSize } = usePagination();
  const { handleChangePage, handleChangeRowsPerPage } = useContext(PaginateContext);
  const [status, setStatus] = useState('b')
  const { data, isLoading, refetch, error, isSuccess } = getWorkspaces(page, pageSize);

  const onChange = (e) => {
    setStatus(e.target.value)
  };

  console.log('data', data);

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
      key: 'namespace',
    },
    {
      title: 'package_alias',
      dataIndex: 'package_alias',
      key: 'package_alias',
      render: (package_alias) => {
        let color = '#B2BABB';
        switch(trim(package_alias)) {
          case 'TRIAL':
            color = '#EC7063';
            break
          case 'PRO':
            color = '#5DADE2';
            break
          case 'ADVANCED':
            color = '#52BE80';
        }

        return (
          <Tag color={color} key={package_alias}>
            {package_alias.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'tenant_id',
      dataIndex: 'tenant_id',
      key: 'tenant_id',
    },
    {
      title: 'vpc_id',
      dataIndex: 'vpc_id',
      key: 'vpc_id',
    },
    {
      title: 'created_at',
      dataIndex: 'created_at',
      key: 'created_at',
    },
  ];

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Workspace management"
              extra={
                <>
                  <Radio.Group onChange={onChange} value={status}>
                    <Radio.Button value="a">All</Radio.Button>
                    <Radio.Button value="b">Active</Radio.Button>
                  </Radio.Group>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  loading={isLoading}
                  columns={columns}
                  dataSource={data?.data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <div style={{padding: 20, textAlign: "right"}}>
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
