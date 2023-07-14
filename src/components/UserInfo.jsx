import { Button, Card, List } from 'antd';
import React from 'react';
import { deletebtn } from '@assets/icons';

const UserInfo = ({users = []}) => {
  return (
    <Card
      bordered={false}
      className="header-solid h-full ant-invoice-card"
      title={[<h6 className="font-semibold m-0">Users</h6>]}>
      <List
        itemLayout="horizontal"
        className="invoice-list"
        dataSource={users}
        renderItem={(item) => (
          <List.Item
            style={{ opacity: item?.isDisabled ? 0.5 : 1 }}
            actions={[<Button type="link">{deletebtn} Delete</Button>]}>
            <List.Item.Meta title={item?.email} description={item?.bss_user_id} />
            <div className="amount">{item?.role}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default UserInfo;
