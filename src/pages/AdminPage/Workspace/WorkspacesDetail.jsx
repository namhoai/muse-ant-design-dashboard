import { Row, Col, Card, Statistic, Button, List, Descriptions, Avatar } from 'antd';

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
import { getWorkspaceById } from '../../../modules/workspaces/services/workspaceService';

function WorkspacesDetail({workspaceId}) {
  const dataUser = [
    {
      title: 'March, 01, 2021',
      description: '#MS-415646',
      amount: '$180'
    },
    {
      title: 'February, 12, 2021',
      description: '#RV-126749',
      amount: '$250'
    },
    {
      title: 'April, 05, 2020',
      description: '#FB-212562',
      amount: '$550'
    },
    {
      title: 'June, 25, 2019',
      description: '#QW-103578',
      amount: '$400'
    },
    {
      title: 'March, 03, 2019',
      description: '#AR-803481',
      amount: '$700'
    }
  ];

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
                  <Col span={24} md={12}>
                    <Card className="payment-method-card">
                      <img src={mastercard} alt="mastercard" />
                      <h6 className="card-number">**** **** **** 7362</h6>
                      <Button type="link" className="ant-edit-link">
                        {pencil}
                      </Button>
                    </Card>
                  </Col>
                  <Col span={24} md={12}>
                    <Card className="payment-method-card">
                      <img src={visa} alt="visa" />
                      <h6 className="card-number">**** **** **** 3288</h6>
                      <Button type="link" className="ant-edit-link">
                        {pencil}
                      </Button>
                    </Card>
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
                    <Button disabled type="primary">Create datasource</Button>
                  </Col>
                </Row>
              </>
            }
            bodyStyle={{ paddingTop: '0' }}>
            <Row gutter={[24, 24]}>
              {information.map((i, index) => (
                <Col span={24} key={index}>
                  <Card className="card-billing-info" bordered="false">
                    <div className="col-info">
                      <Descriptions title="Oliver Liam">
                        <Descriptions.Item label="Company Name" span={3}>
                          Viking Burrito
                        </Descriptions.Item>

                        <Descriptions.Item label="Email Address" span={3}>
                          oliver@burrito.com
                        </Descriptions.Item>
                        <Descriptions.Item label="VAT Number" span={3}>
                          FRB1235476
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                    <div className="col-action">
                      <Button type="link" danger>
                        {deletebtn}DELETE
                      </Button>
                      <Button type="link" className="darkbtn">
                        {pencil} EDIT
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            className="header-solid h-full ant-invoice-card"
            title={[<h6 className="font-semibold m-0">Users</h6>]}
            >
            <List
              itemLayout="horizontal"
              className="invoice-list"
              dataSource={dataUser}
              renderItem={(item) => (
                <List.Item actions={[<Button type="link">{download} PDF</Button>]}>
                  <List.Item.Meta title={item.title} description={item.description} />
                  <div className="amount">{item.amount}</div>
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
