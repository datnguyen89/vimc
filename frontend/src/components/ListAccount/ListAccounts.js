import React, { useEffect, Fragment, useState, useReducer } from 'react'
import { inject, observer } from 'mobx-react'
import { Input, Col, Row, Space, Popconfirm } from 'antd'
import {
  UserOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import {
  UserAccountWrapper,
} from './ListAccountsStyled'

import AddAccount from '../../components/AddAcount'
import EditAccount from '../../components/EditAccount'
import { toJS } from 'mobx'
import userStore from '../../stores/userStore'

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

  function confirm(id) {
    accountStore.deleteAccount(id)
      .then((response) => {
        if (!response) return
        accountStore.getListAccounts()
      })
      .finally(() => {

      })
  }

  function cancel(e) {
    console.log(e)
  }

  const [currUser, setCurrUser] = useState(null)
  useEffect(() => {
    userStore.getUserByCode(accountStore.userCode)
      .then((response) => {
        setCurrUser(response.data.name_lowercase)
      })

  }, [accountStore.userCode])
  return (
    <Fragment>
      {
        accountStore.userCode && <Row justify="end" align="top">
          <Col span={8}>
            <AddAccount user_code={accountStore.userCode} callback={callback}/>
          </Col>
        </Row>
      }


      <Fragment>
        <h1>Danh sách tài khoản của <br/> {currUser}</h1>
        {
          accountStore.listAccounts && accountStore.listAccounts.length > 0 ?
            <UserAccountWrapper>
              {
                accountStore.listAccounts.map(item =>
                  <Row key={item.id} align={'middle'} gutter={[15, 15]}>
                    <Col span={5}> <b>{item.command.code}</b></Col>
                    <Col span={16}><Input disabled={true} placeholder="" defaultValue={item.account_name}
                                          prefix={<UserOutlined/>}/></Col>
                    {/*<Col span={8}>*/}
                    {/*  <Input.Password disabled={true} placeholder="" defaultValue={item.password} prefix={<QuestionCircleOutlined/>}/>*/}
                    {/*</Col>*/}
                    <Col span={3}>
                      <Space>

                        <a><EditAccount callback={callback} dataAccount={item}/></a>
                        <Popconfirm
                          title="Bạn chắc chắn muốn xóa account này ?"
                          onConfirm={() => confirm(item.id)}
                          onCancel={cancel}
                          okText="Xác nhận"
                          cancelText="Hủy bỏ"
                        >
                          <a><DeleteOutlined/></a>
                        </Popconfirm>
                      </Space>
                    </Col>
                  </Row>,
                )
              }
            </UserAccountWrapper> : <p>Chưa có tài khoản</p>
        }
      </Fragment>


    </Fragment>
  )
}

export default inject('accountStore')(observer(ListAccounts))