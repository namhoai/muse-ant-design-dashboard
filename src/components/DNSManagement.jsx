import React, { useEffect, useState } from 'react';
import logo from '@assets/images/icon-logo.png';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Input, AutoComplete } from 'antd';
import { searchDNS } from '../modules/dns/dnsService';
import Loading from './Loading';
import DNSInfo from './DNSInfo';

const DNSManagement = () => {
  const [dns, setDns] = useState('@');
  const { data, isLoading, refetch, isRefetching } = searchDNS(dns);

  const onClear = () => {
    setDns('@')
  }

  const onSearch = (event) => {
    const value = event.target.value;
    setDns(value);
  };

  useEffect(() => {
    refetch();
  }, [dns]);

  return (
    <Card
      style={{ minHeight: 500, textAlign: 'center' }}
      className="header-solid h-full ant-card-p-0">
      <br />
      <br />
      <br />
      <div className="brand">
        <img height={60} src={logo} alt="" />
        <br />
        <br />
        <p style={{ fontSize: '1.5rem' }}>
          <b>FMON DNS</b>
        </p>
      </div>
      <Input
        addonBefore={
          <>
            <SearchOutlined /> &nbsp; &nbsp; https://
          </>
        }
        addonAfter=".fmon.fptcloud.com"
        style={{ width: '50%' }}
        placeholder="search by dns name"
        allowClear
        size="large"
        autoFocus
        onPressEnter={onSearch}
      />
      <br />
      <br />
      <br />
      {isLoading || isRefetching ? <Loading /> : <DNSInfo onClear={onClear} data={data?.data} dns={dns} title={`https://${dns}.fmon.fptcloud.com`} />}
      <br />
      <br />
    </Card>
  );
};

export default DNSManagement;
