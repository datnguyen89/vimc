import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import AuthLayout from '../../layouts/AuthLayout'
import { inject, observer } from 'mobx-react'
import { NaviLink } from './RegisterPageStyled'
import { Form, Input, Row, Col, Button } from 'antd'
import validator from '../../validator'

const RegisterPage = props => {

  const { commonStore, userStore, loadingAnimationStore } = props

  const onFinish = values => {
    const { username, email, password } = values
    loadingAnimationStore.showSpinner(true)
    userStore.userRegister(username, email, password)
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
      })
  }

  return (
    <AuthLayout
      heading={'Register new account'}
      message={
        <Fragment>
          Already have an account? <NaviLink color={commonStore.appTheme.solidColor} to={'/login'}>LOGIN NOW</NaviLink>
        </Fragment>
      }>
      <Helmet>
        <title>Register | Dashboard</title>
      </Helmet>
      <Form
        layout={'vertical'}
        name={'registerForm'}
        onFinish={onFinish}>
        <Row gutter={15}>
          <Col span={12}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { validator: validator.validateEmptyString },
              ]}>
              <Input placeholder={'Input your username'}/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { validator: validator.validateEmail },
              ]}>
              <Input placeholder={'Input your email'}/>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
          ]}
          hasFeedback
        >
          <Input.Password visibilityToggle={false}/>
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('The two passwords that you entered do not match!')
              },
            }),
          ]}>
          <Input.Password visibilityToggle={false}/>
        </Form.Item>
        <Button type={'primary'} block htmlType={'submit'}>
          REGISTER NEW ACCOUNT
        </Button>
      </Form>
    </AuthLayout>
  )
}

export default inject(
  'userStore', 'loadingAnimationStore', 'commonStore',
)(observer(RegisterPage))