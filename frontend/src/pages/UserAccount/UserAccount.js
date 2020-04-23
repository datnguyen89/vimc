import React, { useEffect,useReducer } from 'react'
import MainLayout from '../../layouts/MainLayout'
import ListUsers from '../../components/ListUsers'
import ListAccounts from '../../components/ListAccount'
import { Row, Col } from 'antd'
import {
  UserAccountWrapper,
} from './UserAccountStyled'
import { inject, observer } from 'mobx-react'


const UserAccount = props => {

  const { accountStore } = props
  const { userCode } = accountStore
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    forceUpdate();
  }, [userCode])

  return (
    <MainLayout>
      <UserAccountWrapper>

        <Row gutter={[15, 15]}>
          <Col span={userCode ? 14 : 24}>
            <ListUsers pageName="Account"/>
          </Col>
          {
            userCode
              ? (
                <Col span={8}>
                  <ListAccounts/>
                </Col>
              ) : null
          }
        </Row>
      </UserAccountWrapper>
    </MainLayout>
  )
}

export default inject('accountStore')(observer(UserAccount))