import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Form, Input } from 'antd'
import { inject, observer } from 'mobx-react'
import {
  Hidden,
  AddOrEditUserWrap,
  FormWrapper,
} from './AddOrEditUserStyled'


const AddOrEditUser = props => {
  const [visible, setVisible] = useState(false)
  const {userCode, userStore, loadingAnimationStore } = props
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
    <AddOrEditUserWrap>
      {
        userCode ? <a onClick={showModal}>Sửa</a> :
          <Button type="primary" onClick={showModal}>
            Thêm mới User
          </Button>
      }

      <Modal
        title={userCode ? `Sửa thông tin User ${userCode}` : 'Tạo mới User'}
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
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Họ tên"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
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
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password/>
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit">
                {userCode ? 'Chỉnh sửa' : 'Tạo mới'}
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>

      </Modal>

    </AddOrEditUserWrap>
  )
}

AddOrEditUser.propTypes = {}

export default inject('userStore', 'loadingAnimationStore')(observer(AddOrEditUser))