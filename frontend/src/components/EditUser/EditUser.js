import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Select, Row, Col } from 'antd'
import {
  EditOutlined,
} from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import {
  Hidden,
  EditUserWrap,
  FormWrapper,
} from './EditUserStyled'
import { toJS } from 'mobx'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import validator from '../../validator'

const EditUser = props => {
  const [visible, setVisible] = useState(false)
  const { userStore, loadingAnimationStore, dataUser, userCode, history, callback, companiesStore, commandStore } = props
  const { Option } = Select
  const showModal = () => {
    setVisible(true)

  }
  const handleCancel = e => {
    setVisible(false)
  }
  const onFinish = values => {
    const commandList = values.commands.map(item => {
      return {
        code: item,
      }
    })
    const submitValues = {
      ...values,
      commands: commandList,
    }
    console.log(submitValues)
    const {code} = submitValues
    loadingAnimationStore.showSpinner(true)
    userStore.editUser(code, submitValues)
      .then((response) => {
        if (response.status !== 200) return
        setVisible(false)
        callback && callback()
      })
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
      })

  }

  let initialCommands = []
  dataUser[0].commands.map(item => {
      return initialCommands.push(item.code)
    },
  )
  return (
    <EditUserWrap>
      {

        <a onClick={showModal}>
          <EditOutlined/>
        </a>
      }

      <Modal
        title={'Sửa thông tin User'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <FormWrapper>
          <Form
            layout={'vertical'}
            name="basic"
            initialValues={{
              company_code: dataUser[0].company.code,
              code: userCode,
              email:dataUser[0].email,
              name: dataUser[0].name_lowercase,
              phone: dataUser[0].phone,
              commands: initialCommands,
              username: dataUser[0].username,
              password: dataUser[0].password
            }}
            onFinish={onFinish}
          >
            <Hidden>
              <Form.Item
                label="code"
                name="code"
              >
                <Input/>
              </Form.Item>
            </Hidden>
            <Form.Item
              label="Hệ thống"
              name="commands">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Chọn hệ thống"
                rules={[
                  { required: true, message: 'Hãy chọn hệ không được để trống!' },
                ]}>
                {
                  commandStore.ListCommands.map(item => {
                    return (
                      <Option key={item.code} value={item.code}>
                        {item.name}
                      </Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="Công ty"
              name="company_code">
              <Select

                style={{ width: '100%' }}
                placeholder="Chọn hệ thống"
                rules={[
                  { required: true, message: 'Hãy chọn công ty!' },
                ]}>
                {
                  companiesStore.listCompany.map(item => {
                    return (
                      <Option key={item.code} value={item.code}>
                        {item.name}
                      </Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email không được để trống!' },
                { validator: validator.validateEmail },
              ]}>
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
              rules={[
                { required: true, message: 'Tên đăng nhập không được để trống!' },
                { validator: validator.validateEmptyString },
              ]}>
              <Input/>
            </Form.Item>
            <Form.Item
              label="Mật khẩu (Để trống nếu không thay đổi)"
              name="password"
              rules={[
                { required: false, message: 'Mật khẩu không được để trống!' },
              ]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Row type={'flex'} justify={'space-between'} gutter={10}>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" block>
                    {'Sửa'}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button onClick={() => setVisible(false)} block>
                    Huỷ
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </FormWrapper>

      </Modal>

    </EditUserWrap>
  )
}

EditUser.propTypes = {
  callback: PropTypes.func,
  userCode: PropTypes.string,
  dataUser: PropTypes.array,
}

export default withRouter(inject('commandStore', 'userStore', 'loadingAnimationStore', 'companiesStore')(observer(EditUser)))