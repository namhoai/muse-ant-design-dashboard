import React from 'react';
import { Spin } from 'antd';

const Loading = ({tip, size = "large"}) => (
  <div
    style={{
      margin: '20px 0',
      marginBottom: '20px',
      padding: '30px 50px',
      textAlign: 'center',
      borderRadius: '4px'
    }}>
    <Spin tip={tip} size={size} />
  </div>
);

export default Loading;
