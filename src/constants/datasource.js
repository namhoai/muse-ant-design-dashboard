import { STATUS_TYPE } from "./workspace"

export const DATASOURCE_TEXT = {
    '0': 'Dashboard',
    '1': 'Metrics',
    '2': 'Log',
    '3': 'Traces',
}

export const DATASOURCE_DISABLE = [STATUS_TYPE.CREATED, STATUS_TYPE.DELETE_FAIL]

export const DATASOURCE_ENABLE = [STATUS_TYPE.CREATE_FAIL, STATUS_TYPE.DELETED]

