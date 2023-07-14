import React from 'react';
import { Card, Row, Col } from 'antd';
import InfoFrame from '@components/InfoFrame';
import PasswordView from '../../components/PasswordView';

function Home() {
  return (
    <Card
      className="header-solid h-full ant-card-p-0"
      title={<h6 className="font-semibold m-0">Monitoring</h6>}>
      <Row gutter={[24, 0]}>
        <Col span={24} md={12}>
          <InfoFrame
            label="Link"
            value={
              <a href="https://monitor.prod.fmon.fptcloud.com" target="_blank">
                https://monitor.prod.fmon.fptcloud.com
              </a>
            }
          />
        </Col>
      </Row>
      <Row gutter={[24, 0]}>
        <Col span={24} md={3}>
          <InfoFrame label="Username" value="admin" />
        </Col>
        <Col span={24} md={8}>
          <InfoFrame showCopy={false} label="Password" value={<PasswordView password={'HE96LpJud9RJGWWqAZEt'} />} />
        </Col>
      </Row>
    </Card>
  );
}

export default Home;
