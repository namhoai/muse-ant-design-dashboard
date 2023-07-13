import { Row, Col, Card, Statistic, Button, List, Descriptions, Avatar, Tag } from 'antd';
import { useParams } from 'react-router-dom';
import { PlusOutlined, ExclamationOutlined } from '@ant-design/icons';
import mastercard from '@assets/images/mastercard-logo.png';
import paypal from '@assets/images/paypal-logo-2.png';
import visa from '@assets/images/visa-logo.png';
import {
  wifi,
  angle,
  pencil,
  download,
  deletebtn,
  information,
  calender,
  mins
} from '@assets/icons';
import { getWorkspaceById } from '@modules/workspaces/services/workspaceService';
import InfoFrame from '@components/InfoFrame';
import Loading from '@components/Loading';
import StatusWorkspace from '@components/StatusWorkspace';
import { PACKAGE_TEXT } from '@constants/workspace';
import DatasourcesItem from '@components/DatasourceItem';

function WorkspacesDetail() {
  const { workspaceId } = useParams();

  const newest = [
    {
      headding: <h6>NEWEST</h6>,
      avatar: mins,
      title: 'Netflix',
      description: '27 March 2021, at 12:30 PM',
      amount: '- $2,500',
      textclass: 'text-light-danger',
      amountcolor: 'text-danger'
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: 'Apple',
      description: '27 March 2021, at 04:30 AM',
      amount: '+ $2,000',
      textclass: 'text-fill',
      amountcolor: 'text-success'
    }
  ];

  const yesterday = [
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: 'Stripe',
      description: '26 March 2021, at 12:30 AM',
      amount: '+ $750',
      textclass: 'text-fill',
      amountcolor: 'text-success'
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: 'HubSpot',
      description: '26 March 2021, at 11:30 AM',
      amount: '+ $1,050',
      textclass: 'text-fill',
      amountcolor: 'text-success'
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: 'Creative Tim',
      description: '26 March 2021, at 07:30 AM',
      amount: '+ $2,400',
      textclass: 'text-fill',
      amountcolor: 'text-success'
    },
    {
      avatar: <ExclamationOutlined style={{ fontSize: 10 }} />,
      title: 'Webflow',
      description: '26 March 2021, at 04:00 AM',
      amount: 'Pending',
      textclass: 'text-warning',
      amountcolor: 'text-warning-b'
    }
  ];

  const { data, isLoading, refetch, error, isSuccess } = getWorkspaceById(workspaceId);

  const workspace = data?.data?.workspace;
  const users = data?.data?.users || [];
  const datasources = data?.data?.datasource || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={16}>
          <Row gutter={[24, 0]}>
            <Col xs={24} className="mb-24">
              <Card
                className="header-solid h-full ant-card-p-0"
                title={<h6 className="font-semibold m-0">Workspace information</h6>}>
                <Row gutter={[24, 0]}>
                  <Col span={24} md={8}>
                    <InfoFrame label="id" value={workspace?.id} />
                  </Col>
                  <Col span={24} md={8}>
                    <InfoFrame label="region_id" value={workspace?.region_id} />
                  </Col>
                  <Col span={24} md={8}>
                    <InfoFrame label="tenant_id" value={workspace?.tenant_id} />
                  </Col>
                  <Col span={24} md={8}>
                    <InfoFrame label="trans_id" value={workspace?.trans_id} />
                  </Col>
                  <Col span={24} md={8}>
                    <InfoFrame label="vpc_id" value={workspace?.vpc_id} />
                  </Col>
                  <Col span={24} md={8}>
                    <InfoFrame
                      showCopy={false}
                      label="package_id"
                      value={<Tag color="red">{PACKAGE_TEXT[`${workspace?.package_id}`]}</Tag>}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <InfoFrame
                      label="status"
                      showCopy={false}
                      value={<StatusWorkspace status={workspace?.status} />}
                    />
                  </Col>
                  <Col span={24} md={8}>
                    <InfoFrame label="error_code" value={workspace?.error_code} />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <br />
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
                <DatasourcesItem data={item} key={item.id} />
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Users</h6>]}>
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={users}
              renderItem={(item) => (
                <List.Item style={{opacity: item?.isDisabled ? 0.5 : 1}} actions={[<Button type="link">{deletebtn} Delete</Button>]}>
                  <List.Item.Meta title={item?.email} description={item?.bss_user_id} />
                  <div className="amount">{item?.role}</div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default WorkspacesDetail;
