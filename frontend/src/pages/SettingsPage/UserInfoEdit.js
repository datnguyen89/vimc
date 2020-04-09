import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, message, Row, Col } from 'antd'
import validator from '../../validator'

const { TextArea } = Input

const UserInfoEdit = props => {

  const { userStore, onSave, loadingAnimationStore } = props
  const {
    firstName, lastName, id,
    email, phoneNumber,
    jobTitle, address, biography,
  } = userStore.currentUser

  const onFinish = val => {
    loadingAnimationStore.showSpinner(true)
    userStore.updateUserInfo(id, val)
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
        message.success('User info updated successfully')
        onSave()
      })
  }

  return (
    <Form
      layout={'vertical'}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        jobTitle: jobTitle,
        address: address,
        biography: biography,
      }}
      onFinish={onFinish}
      name={'userInfoForm'} id={'userInfoForm'}>
      <Row gutter={30}>
        <Col span={12}>
          <Form.Item
            name={'firstName'}
            label={'First name'}
            rules={[
              { validator: validator.validateEmptyString },
            ]}>
            <Input placeholder={'Input your first name'}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={'lastName'}
            label={'Last name'}
            rules={[
              { validator: validator.validateEmptyString },
            ]}>
            <Input placeholder={'Input your last name'}/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name={'email'}
        label={'Email'}
        rules={[
          { required: true, message: 'This field is required' },
          { validator: validator.validateEmail },
        ]}>
        <Input placeholder={'Input your email'}/>
      </Form.Item>
      <Form.Item
        name={'phoneNumber'}
        label={'Phone number'}
        rules={[
          { validator: validator.validatePhoneNumber },
        ]}>
        <Input placeholder={'Input your phone number'}/>
      </Form.Item>
      <Form.Item
        name={'jobTitle'}
        label={'Job title'}
        rules={[
          { validator: validator.validateEmptyString },
        ]}>
        <Input placeholder={'Input your job title'}/>
      </Form.Item>
      <Form.Item
        name={'address'}
        label={'Address'}
        rules={[
          { validator: validator.validateEmptyString },
        ]}>
        <TextArea rows={4} placeholder={'Input your address'}/>
      </Form.Item>
      <Form.Item
        name={'biography'}
        label={'Biography'}
        rules={[
          { validator: validator.validateEmptyString },
        ]}>
        <TextArea rows={4} placeholder={'Input your bio'}/>
      </Form.Item>
    </Form>
  )
}

export default inject('userStore', 'loadingAnimationStore')(observer(UserInfoEdit))