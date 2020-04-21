import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Row, Col, Select } from 'antd'
import { inject, observer } from 'mobx-react'
import {
  Hidden,
  AddUserWrap,
  FormWrapper,
} from './AddUserStyled'
import validator from '../../validator'

const { Option } = Select

const AddUser = props => {

  const [visible, setVisible] = useState(false)

  const {
    userStore, loadingAnimationStore,
    commandStore, companiesStore,
  } = props

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
  }

  useEffect(() => {
    loadingAnimationStore.showSpinner(true)
    commandStore.getListCommands()
      .finally(() => loadingAnimationStore.showSpinner(false))
  }, [])

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
    // loadingAnimationStore.showSpinner(true)
    // userStore.createUser(values)
    //   .then((response) => {
    //     if (response.status !== 200) return
    //     setVisible(false)
    //   })
    //   .finally(() => {
    //     loadingAnimationStore.showSpinner(false)
    //   })
  }

  return (
    <AddUserWrap>
      <Row type={'flex'} justify={'end'}>
        <Button type="primary" onClick={showModal}>
          Thêm mới User
        </Button>
      </Row>
      <Modal
        title={'Tạo mới User'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}>

        <FormWrapper>

          <Form
            layout={'vertical'}
            name="basic"
            initialValues={{ company_code: 'CPN7451091748209' }}
            onFinish={onFinish}>
            <Hidden>
              <Form.Item
                label="company_code"
                name="company_code">
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
              rules={[
                { required: true, message: 'Họ tên không được để trống!' },
                { validator: validator.validateEmptyString },
              ]}>
              <Input/>
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: 'Hãy nhập số điện thoại!' },
                { validator: validator.validateEmptyString },
              ]}>
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
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: 'Mật khẩu không được để trống!' },
              ]}>
              <Input.Password/>
            </Form.Item>
            <Form.Item>
              <Row type={'flex'} justify={'space-between'} gutter={10}>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" block>
                    {'Tạo mới'}
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

    </AddUserWrap>
  )
}

AddUser.propTypes = {}

export default inject(
  'userStore', 'loadingAnimationStore', 'commandStore', 'companiesStore',
)(observer(AddUser))