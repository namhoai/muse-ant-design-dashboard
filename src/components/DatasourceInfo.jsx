import { Button, Card, Col, Row } from 'antd';
import React from 'react';
import DatasourceItem from './DatasourceItem';

const DatasourceInfo = ({ datasources = [] }) => {
  return (
    <Card
      className="header-solid"
      bordered={false}
      title={
        <>
          <Row gutter={[24, 0]} className="ant-row-flex ant-row-flex-middle">
            <Col xs={24} md={12}>
              <h6 className="font-semibold m-0">Datasources</h6>
            </Col>
            <Col xs={24} md={12} className="d-flex">
              <Button disabled type="primary">
                Create datasource
              </Button>
            </Col>
          </Row>
        </>
      }
      bodyStyle={{ paddingTop: '0' }}>
      <Row gutter={[24, 24]}>
        {datasources.map((item) => (
          <DatasourceItem data={item} key={item.id} />
        ))}
      </Row>
    </Card>
  );
};

export default DatasourceInfo;
