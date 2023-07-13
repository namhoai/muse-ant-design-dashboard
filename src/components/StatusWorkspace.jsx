import React from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { Tag } from 'antd';
import { STATUS_TYPE } from '../constants/workspace';

export const ICONS = {
  [`${STATUS_TYPE.CREATING}_icon`]: <SyncOutlined spin />,
  [`${STATUS_TYPE.CREATED}_icon`]: <CheckCircleOutlined />,
  [`${STATUS_TYPE.CREATE_FAIL}_icon`]: <CloseCircleOutlined />,
  [`${STATUS_TYPE.DELETING}_icon`]: <SyncOutlined spin />,
  [`${STATUS_TYPE.DELETED}_icon`]: <MinusCircleOutlined />,
  [`${STATUS_TYPE.DELETE_FAIL}_icon`]: <ExclamationCircleOutlined />,
  [`${STATUS_TYPE.UPDATING}_icon`]: <SyncOutlined spin />,
  [`${STATUS_TYPE.UPDATED}_icon`]: <CheckCircleOutlined />,
  [`${STATUS_TYPE.UPDATE_FAIL}_icon`]: <ExclamationCircleOutlined />
};

export const COLORS = {
  [`${STATUS_TYPE.CREATING}_color`]: 'processing',
  [`${STATUS_TYPE.CREATED}_color`]: 'success',
  [`${STATUS_TYPE.CREATE_FAIL}_color`]: 'error',
  [`${STATUS_TYPE.DELETING}_color`]: 'warning',
  [`${STATUS_TYPE.DELETED}_color`]: 'default',
  [`${STATUS_TYPE.DELETE_FAIL}_color`]: 'error',
  [`${STATUS_TYPE.UPDATING}_color`]: 'processing',
  [`${STATUS_TYPE.UPDATED}_color`]: 'success',
  [`${STATUS_TYPE.UPDATE_FAIL}_color`]: 'error'
};

export const STATUS_TYPE_TEXT = {
  [`${STATUS_TYPE.CREATING}_text`]: 'CREATING',
  [`${STATUS_TYPE.CREATED}_text`]: 'CREATED',
  [`${STATUS_TYPE.CREATE_FAIL}_text`]: 'CREATE_FAIL',
  [`${STATUS_TYPE.DELETING}_text`]: 'DELETING',
  [`${STATUS_TYPE.DELETED}_text`]: 'DELETED',
  [`${STATUS_TYPE.DELETE_FAIL}_text`]: 'DELETE_FAIL',
  [`${STATUS_TYPE.UPDATING}_text`]: 'UPDATING',
  [`${STATUS_TYPE.UPDATED}_text`]: 'UPDATED',
  [`${STATUS_TYPE.UPDATE_FAIL}_text`]: 'UPDATE_FAIL'
};

const StatusWorkspace = ({ status }) => (
  <Tag icon={ICONS[`${status}_icon`]} color={COLORS[`${status}_color`]}>
    {STATUS_TYPE_TEXT[`${status}_text`].toLowerCase()}
  </Tag>
);

export default StatusWorkspace;
