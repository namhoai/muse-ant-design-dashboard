import { Button, Card, Empty, AutoComplete, message, Popconfirm, Popover, Input } from 'antd';
import React, { useState } from 'react';
import { createDNS, deleteDNS } from '@modules/dns/dnsService';

const DNSInfo = ({ dns, data = {}, title, onClear }) => {
  if (dns === '@') {
    return null;
  }

  const [inputVefiry, setInputVefiry] = useState('');

  const {
    mutateAsync: mutateCreateDNS,
    isLoading: isCreatingDNS,
    isSuccess: isCreted
  } = createDNS();

  const {
    mutateAsync: mutateDeteleDNS,
    isLoading: isRemoveDNS,
    isSuccess: isRemoved
  } = deleteDNS();

  const [ipv4, setIpv4] = useState('');

  const onChange = (value) => {
    setIpv4(value);
  };

  const confirmCreate = () => {
    message.info(`Creating DNS for ${title}`);
    mutateCreateDNS({
      urls: [dns],
      ipv4: ipv4
    });
    onClear();
  };

  const onRemove = () => {
    if (dns === inputVefiry) {
      message.info(`Deleting DNS for ${title}`);
      mutateDeteleDNS({
        urls: [dns]
      });
      onClear();
    }
  };

  const content = (
    <>
      <p>
        Enter the domain name you want to delete : <b>{dns}</b>
      </p>
      <Input value={inputVefiry} onChange={(e) => setInputVefiry(e.target.value)} />
      <br />
      <br />
      <div style={{ textAlign: 'right' }}>
        &nbsp;&nbsp;
        <Button disabled={dns !== inputVefiry} type="primary" danger onClick={onRemove}>
          Delete
        </Button>
      </div>
    </>
  );

  const options = [
    {
      value: '103.174.212.43'
    }
  ];

  const styleItem = { borderBottom: '1px solid #ccc', paddingBottom: 10 };

  return (
    <div style={{ margin: 'auto', width: '50%' }}>
      <Card
        title={
          <a target="_blank" href={title}>
            {title}
          </a>
        }>
        {data?.name ? (
          <>
            <div style={{ margin: '10px 30px', textAlign: 'left' }}>
              <p style={styleItem}>
                <b>name:</b> &nbsp; {data?.name}
              </p>
              <p style={styleItem}>
                <b>ttl:</b> &nbsp; {data?.ttl}
              </p>
              <p style={styleItem}>
                <b>type:</b> &nbsp; {data?.type}
              </p>
              <p style={styleItem}>
                <b>fqdn:</b> &nbsp; {data?.fqdn}
              </p>
              <p style={styleItem}>
                <b>ipv4_address:</b> &nbsp;{' '}
                {data?.a_records?.map((item) => item?.ipv4_address).toString()}
              </p>
              <br />
            </div>
            <Popover
              placement="topLeft"
              title={<b>Delete DNS</b>}
              content={content}
              trigger="click">
              <Button type="primary" danger>
                Delete DNS
              </Button>
            </Popover>
          </>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 60 }}
            description={<span>Not Found</span>}>
            <AutoComplete
              style={{
                width: 200
              }}
              options={options}
              placeholder="input ipv4"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
              onChange={onChange}
              value={ipv4}
            />
            <br />
            <br />
            <Popconfirm
              placement="topLeft"
              title={
                <span>
                  Are you sure create DNS for <b>{title}</b> with Ipv4: <b>{ipv4}</b> ?
                </span>
              }
              onConfirm={confirmCreate}
              okText="Yes"
              cancelText="No">
              <Button disabled={ipv4 === ''} type="primary">
                Create DNS
              </Button>
            </Popconfirm>
          </Empty>
        )}
      </Card>
    </div>
  );
};

export default DNSInfo;
