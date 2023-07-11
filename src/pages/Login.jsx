import React, { Component } from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import { useAuth } from '@hooks/useAuth';

const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const { token } = useAuth();
  const location = useLocation();

  if (token) {
    return <Navigate to="/admin/home" replace state={{ from: location }} />;
  }

  const navigate = useNavigate();

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24 }}
              lg={{ span: 6 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>

                  <br />

                  <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    onClick={() => {
                      navigate("/login_sso");
                    }}
                  >
                    SIGN IN WITH FPT ID
                  </Button>
                </Form.Item>

              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}

export default SignIn