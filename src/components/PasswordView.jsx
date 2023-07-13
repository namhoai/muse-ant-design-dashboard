import { Tooltip, message } from 'antd';
import React, { useState } from 'react';
import { EyeOutlined, CopyOutlined } from '@ant-design/icons';
import { copyTextToClipboard } from '@utils/utils';

const PasswordView = ({ password }) => {
  const [show, setShow] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onCopy = () => {
    messageApi.success('copied');
    copyTextToClipboard(password);
  };

  if (show) {
    return (
      <>
        {contextHolder}
        {password}
        &nbsp;
        <div className="copy_fmon" onClick={onCopy}>
          <Tooltip title="Copy">
            <CopyOutlined style={{ opacity: 0.6 }} />
          </Tooltip>
        </div>
      </>
    );
  }

  return (
    <span style={{ cursor: 'pointer' }} onClick={() => setShow(true)}>
      <u>
        <EyeOutlined /> ******
      </u>
    </span>
  );
};

export default PasswordView;
