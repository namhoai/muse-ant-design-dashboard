import { Tooltip, message } from 'antd';
import React, { useState } from 'react';
import { EyeOutlined, CopyOutlined } from '@ant-design/icons';
import { copyTextToClipboard } from '@utils/utils';

const InfoFrame02 = ({ value }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onCopy = () => {
    messageApi.success('copied');
    copyTextToClipboard(value);
  };

  return (
    <>
      {contextHolder}
      {value}
      &nbsp;
      <div className="copy_fmon" onClick={onCopy}>
        <Tooltip title="Copy">
          <CopyOutlined style={{ opacity: 0.6 }} />
        </Tooltip>
      </div>
    </>
  );
};

export default InfoFrame02;
