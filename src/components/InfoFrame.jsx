import React from 'react';
import { copyTextToClipboard } from '@utils/utils';
import { CopyOutlined } from '@ant-design/icons';
import { Tooltip, message } from 'antd';

const InfoFrame = ({ label, value, showCopy = true, showBorder = true }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onCopy = () => {
    messageApi.success('copied');
    copyTextToClipboard(value);
  };

  return (
    <div
      className="item-frame"
      style={{
        borderLeft: showBorder ? '1px solid #ccc' : 'unset',
        marginBottom: '30px',
        paddingLeft: '15px'
      }}>
      {contextHolder}
      <div>
        <b>{label}</b>
      </div>
      <div style={{ height: 40 }}>
        <span> {value}</span>
        <>
          {showCopy && (
            <>
              &nbsp;
              <div className="copy_fmon" onClick={onCopy}>
                <Tooltip title="Copy">
                  <CopyOutlined style={{ opacity: 0.6 }} />
                </Tooltip>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default InfoFrame;
