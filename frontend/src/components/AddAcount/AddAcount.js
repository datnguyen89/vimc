import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Select } from 'antd'
import { inject, observer } from 'mobx-react'
import {
  Hidden,
  AddAccountWrap,
  FormWrapper,
} from './AddAcountStyled'


const AddAccount = props => {
  const [visible, setVisible] = useState(false)
  const { accountStore, loadingAnimationStore, user_code, callback } = props
  const { Option } = Select
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
        <FormWrapper>
          <Form
            name="basic"
            initialValues={{ user_code: user_code }}
            onFinish={onFinish}
          >
            <Hidden>
              <Form.Item
                label="Mã user"
                name="user_code"
              >
                <Input/>
              </Form.Item>
            </Hidden>
            <Form.Item
              label="Tên tài khoản"
              name="account_name"
              rules={[{ required: true, message: 'Please input your accountname!' }]}
            >
              <Input/>
            </Form.Item>


            <Form.Item
              label="Hệ thống"
              name="command_code"
              rules={[{ required: true, message: 'Province is required' }]}
            >
              <Select placeholder="Chọn hệ thống">
                <Option value="E_OFFICE">E_OFFICE</Option>
                <Option value="E_MAIL">E_MAIL</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Please input your accountname!' }]}
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

      </Modal>

    </AddAccountWrap>
  )
}

AddAccount.propTypes = {}

export default inject('accountStore', 'loadingAnimationStore')(observer(AddAccount))