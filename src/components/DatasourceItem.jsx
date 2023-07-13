import { StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Tag } from 'antd';
import { DATASOURCE_DISABLE, DATASOURCE_ENABLE, DATASOURCE_TEXT } from '@constants/datasource';

import moment from 'moment';
import StatusWorkspace from './StatusWorkspace';
import PasswordView from './PasswordView';
import InfoFrame02 from './InfoFrame02';

const DatasourcesItem = ({ data }) => {
  const timeago = moment(data?.updated_at).fromNow();
  const title = (
    <>
      <StatusWorkspace status={data?.status} />
      &nbsp;&nbsp;
      <span>{DATASOURCE_TEXT[`${data?.type}`].toUpperCase()}</span>
    </>
  );

  return (
    <Col span={24}>
      <Card className="card-billing-info" bordered="false">
        <div className="col-info">
          <Descriptions title={title}>
            <Descriptions.Item label="id" span={3}>
              {data?.id}
            </Descriptions.Item>
            <Descriptions.Item label="url" span={3}>
              <a href={`https://${data?.url}`} target="_blank">{`https://${data?.url}`}</a>
            </Descriptions.Item>
            <Descriptions.Item label="error_code" span={3}>
              {data?.error_code}
            </Descriptions.Item>
            <Descriptions.Item label="node_port" span={3}>
              {data?.node_port}
            </Descriptions.Item>
            <Descriptions.Item label="storage_class" span={3}>
              {data?.storage_class}
            </Descriptions.Item>
            <Descriptions.Item label="actual_capacity_gb" span={3}>
              {data?.actual_capacity_gb} GB
            </Descriptions.Item>
            <Descriptions.Item label="used_capacity_gb" span={3}>
              {data?.used_capacity_gb} GB
            </Descriptions.Item>
            {data?.type === 1 && (
              <>
                <Descriptions.Item label="actual_metric_number" span={3}>
                  {data?.actual_metric_number}
                </Descriptions.Item>
                <Descriptions.Item label="used_metric_number" span={3}>
                  {data?.used_metric_number}
                </Descriptions.Item>
              </>
            )}
            <Descriptions.Item label="updated_at" span={3}>
              {timeago}
            </Descriptions.Item>
            <Descriptions.Item label="username" span={3}>
              <InfoFrame02 value={data?.username} />
            </Descriptions.Item>
            <Descriptions.Item label="password" span={3}>
              <PasswordView password={data?.password} />
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="col-action">
          <>
            {DATASOURCE_DISABLE.includes(data?.status) && (
              <Button disabled danger>
                <StopOutlined /> Disable
              </Button>
            )}
          </>
          <>
            {DATASOURCE_ENABLE.includes(data?.status) && (
              <Button disabled className="darkbtn">
                <CheckCircleOutlined /> Active
              </Button>
            )}
          </>
        </div>
      </Card>
    </Col>
  );
};

export default DatasourcesItem;
