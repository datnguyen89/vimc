import React, { useEffect, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Input, Col, Row, Space } from 'antd'
import {
  UserOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import {
  UserAccountWrapper,
} from './ListAccountsStyled'

import AddAccount from '../../components/AddAcount'

const ListAccounts = (props) => {
  const { accountStore } = props

  useEffect(() => {
    if (accountStore.userCode) {
      accountStore.getListAccounts()
    }
  }, [accountStore.userCode])
  const callback = () => {
    accountStore.getListAccounts()
  }
  return (
    <Fragment>
      {
        accountStore.userCode && <Row justify="end" align="top">
          <Col span={8}>
            <AddAccount user_code={accountStore.userCode} callback={callback}/>
          </Col>
        </Row>
      }

      {
        accountStore.listAccounts && accountStore.listAccounts.data.length > 0 ?
          <UserAccountWrapper>
            <h1>Danh sách tài khoản</h1>
            {
              accountStore.listAccounts.data.map(item =>
                <Row key={item.id} align={'middle'} gutter={[15, 15]}>
                  <Col span={5}> <b>{item.command.code}</b></Col>
                  <Col span={8}><Input placeholder="" defaultValue={item.account_name} prefix={<UserOutlined/>}/></Col>
                  <Col span={8}>
                    <Input placeholder="" defaultValue={item.password} prefix={<QuestionCircleOutlined/>}/>
                  </Col>
                  <Col span={3}>
                    <Space>
                      <a><EditOutlined/></a>
                      <a><DeleteOutlined/></a>
                    </Space>
                  </Col>
                </Row>,
              )
            }
          </UserAccountWrapper> : null
      }

    </Fragment>
  )
}

export default inject('accountStore')(observer(ListAccounts))