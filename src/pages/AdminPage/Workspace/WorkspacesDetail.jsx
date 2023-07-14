import { Row, Col, Card, Button, List } from 'antd';
import { useParams } from 'react-router-dom';
import { getWorkspaceById } from '@modules/workspaces/services/workspaceService';
import Loading from '@components/Loading';
import WorkspaceInfo from '@components/WokspaceInfo';
import DatasourceInfo from '@components/DatasourceInfo';
import UserInfo from '@components/UserInfo';

function WorkspacesDetail() {
  const { workspaceId } = useParams();

  const { data, isLoading, refetch, error, isSuccess } = getWorkspaceById(workspaceId);

  const workspace = data?.data?.workspace;
  const users = data?.data?.users || [];
  const datasources = data?.data?.datasource || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={16}>
          <Row gutter={[24, 0]}>
            <Col xs={24} className="mb-24">
              <WorkspaceInfo workspace={workspace} />
            </Col>
          </Row>
          <br />
          <DatasourceInfo datasources={datasources} />
        </Col>
        <Col span={24} md={8} className="mb-24">
          <UserInfo users={users} />
        </Col>
      </Row>
    </>
  );
}

export default WorkspacesDetail;
