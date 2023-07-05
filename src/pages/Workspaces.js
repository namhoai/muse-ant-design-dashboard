import React, {useEffect, useState} from "react";
import { Row, Col, Card, Radio, Table } from "antd";

// Images

function Workspaces() {
  const [status, setStatus] = useState('b')
  const onChange = (e) => {
    setStatus(e.target.value)
  };

  useEffect(() => {
    callAPIGetWorkspace()
  }, []);

  const callAPIGetWorkspace = () => {
    
  }

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
                  columns={[]}
                  dataSource={[]}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Workspaces;
