import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import ListUsers from '../../components/ListUsers'
import ListAccounts from '../../components/ListAccount'
import { Input, Row, Col } from 'antd'
import {
  UserAccountWrapper,
  ListUser,
  AccountInfo,

} from './UserAccountStyled'


const UserAccount = () => {
  return (
    <MainLayout>
      <UserAccountWrapper>

        <Row gutter={[15, 15]}>
          <Col span={12}>
            <ListUsers edit={false} header={false} paging={false}/>
          </Col>
          <Col span={12}>
            <ListAccounts/>
          </Col>
        </Row>
      </UserAccountWrapper>
    </MainLayout>
  )
}

export default UserAccount