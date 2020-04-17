import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Select } from 'antd'
import { inject, observer } from 'mobx-react'
import {
  Hidden,
  AddAccountWrap,
  FormWrapper,
} from './AddAcountStyled'
import { toJS } from 'mobx'


const AddAccount = props => {
  const [visible, setVisible] = useState(false)
  const { accountStore, loadingAnimationStore, commandStore, user_code, callback } = props
  const { Option } = Select

  useEffect(() => {
    commandStore.getListCommands()
  }, [])
  const showModal = () => {
    setVisible(true)
  }
  const handleCancel = e => {
    setVisible(false)
  }
  const onFinish = values => {
    console.log(values)

    loadingAnimationStore.showSpinner(true)
    accountStore.createAccount(values)
      .then((response) => {
        if (response.status !== 200) return
        setVisible(false)
        callback && callback()
      })
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
      })

  }
  const renderForm = () => {
    return (
      <div></div>
    )
  }
  console.log(toJS(commandStore.ListCommands))
  return (
    <AddAccountWrap>
      {

        <Button type="primary" onClick={showModal}>
          Thêm mới Account
        </Button>
      }

      <Modal
        title={'Tạo mới Account'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        {
          commandStore.ListCommands && commandStore.ListCommands.length > 0 && < FormWrapper>
            < Form
              name='basic'
              initialValues={{ user_code: user_code }}
              onFinish={onFinish}
            >
              <Hidden>
                <Form.Item
                  label='Mã user'
                  name='user_code'
                >
                  <Input/>
                </Form.Item>
              </Hidden>
              <Form.Item
                label="Hệ thống"
                name="command_code"
                rules={[{ required: true, message: 'Hãy chọn hệ thống' }]}
              >
                <Select placeholder="Chọn hệ thống">
                  {
                    commandStore.ListCommands.map((item, index) =>
                      <Option key={index} value={item.code}>{item.code}</Option>,
                    )
                  }
                </Select>
              </Form.Item>
              <Form.Item
                label="Tên tài khoản"
                name="account_name"
                rules={[{ required: true, message: 'Tên tài khoản không được để trống!' }]}
              >
                <Input/>
              </Form.Item>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
              >
                <Input.Password/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {'Tạo mới'}
                </Button>
              </Form.Item>
            </Form>
          </FormWrapper>
        }

      </Modal>

    </AddAccountWrap>
  )
}


export default inject('accountStore', 'commandStore', 'loadingAnimationStore')(observer(AddAccount))