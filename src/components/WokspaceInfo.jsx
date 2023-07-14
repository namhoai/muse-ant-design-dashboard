import { Card, Col, Row, Tag } from 'antd';
import React from 'react';
import InfoFrame from './InfoFrame';
import StatusWorkspace from './StatusWorkspace';
import { PACKAGE_TEXT } from '../constants/workspace';
import moment from 'moment';

const WorkspaceInfo = ({ workspace = {} }) => {
  const timeago = moment(workspace?.created_at).fromNow();

  return (
    <Card
      className="header-solid h-full ant-card-p-0"
      title={<h6 className="font-semibold m-0">Workspace information</h6>}>
      <Row gutter={[24, 0]}>
        <Col span={24} md={8}>
          <InfoFrame label="id" value={workspace?.id} />
        </Col>
        <Col span={24} md={8}>
          <InfoFrame label="tenant_id" value={workspace?.tenant_id} />
        </Col>
        <Col span={24} md={8}>
          <InfoFrame label="region_id" value={workspace?.region_id} />
        </Col>
        <Col span={24} md={8}>
          <InfoFrame
            showCopy={false}
            label="package_id"
            value={<Tag color="red">{PACKAGE_TEXT[`${workspace?.package_id}`]}</Tag>}
          />
        </Col>
        <Col span={24} md={8}>
          <InfoFrame label="vpc_id" value={workspace?.vpc_id} />
        </Col>
        <Col span={24} md={8}>
          <InfoFrame label="trans_id" value={workspace?.trans_id} />
        </Col>
        <Col span={24} md={8}>
          <InfoFrame
            label="status"
            showCopy={false}
            value={<StatusWorkspace status={workspace?.status} />}
          />
        </Col>
        <Col span={24} md={8}>
          <InfoFrame label="created_at" value={timeago} />
        </Col>
        <Col span={24} md={8}>
          <InfoFrame label="error_code" value={workspace?.error_code} />
        </Col>
      </Row>
    </Card>
  );
};

export default WorkspaceInfo;
