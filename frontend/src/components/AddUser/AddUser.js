import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import { inject, observer } from 'mobx-react'
import {
  Hidden,
  AddUserWrap,
  FormWrapper,
} from './AddUserStyled'


const AddUser = props => {
  const [visible, setVisible] = useState(false)
  const { userStore, loadingAnimationStore } = props
  const showModal = () => {
    setVisible(true)
  }
  const handleCancel = e => {
    setVisible(false)
  }
  const onFinish = values => {
    loadingAnimationStore.showSpinner(true)
    userStore.createUser(values)
      .then((response) => {
        if (response.status !== 200) return
        setVisible(false)
      })
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
      })

  }

  return (
    <AddUserWrap>
      {

        <Button type="primary" onClick={showModal}>
          Thêm mới User
        </Button>
      }

      <Modal
        title={'Tạo mới User'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <FormWrapper>
          <Form
            name="basic"
            initialValues={{ company_code: 'CPN7451091748209' }}
            onFinish={onFinish}
          >
            <Hidden>
              <Form.Item
                label="company_code"
                name="company_code"
              >
                <Input/>
              </Form.Item>
            </Hidden>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email không được để trống!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Họ tên"
              name="name"
              rules={[{ required: true, message: 'Họ tên không được để trống!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[{ required: true, message: 'Tên đăng nhập không được để trống!' }]}
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

      </Modal>

    </AddUserWrap>
  )
}

AddUser.propTypes = {}

export default inject('userStore', 'loadingAnimationStore')(observer(AddUser))