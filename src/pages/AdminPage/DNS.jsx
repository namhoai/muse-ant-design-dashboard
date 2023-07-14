import { Tabs } from 'antd';
import React from 'react';
import DNSManagement from '@components/DNSManagement';
import DNSInfoTable from '@components/DNSInfoTable';

const DNS = () => {
  const items = [
    {
      key: 'dns-management',
      label: `DNS Management`,
      children: <DNSManagement />,
    },
    {
      key: 'dns-prod',
      label: `DNS - prod`,
      children: <DNSInfoTable suffix="prod" />
    },
    {
      key: 'dns-fci',
      label: `DNS - fci`,
      children: <DNSInfoTable suffix="fci" />
    }
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default DNS;
