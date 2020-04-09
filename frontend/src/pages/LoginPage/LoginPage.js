import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import AuthLayout from '../../layouts/AuthLayout'
import { Form, Input, Button, Checkbox, message } from 'antd'
import validator from '../../validator'
import { Link } from 'react-router-dom'
import { ActionRow, NaviLink } from './LoginPageStyled'
import { inject, observer } from 'mobx-react'

const LoginPage = props => {

  const { userStore, loadingAnimationStore, commonStore, history, match } = props
  const [rememberUser, setRememberUser] = useState(true)

  const onFinish = values => {
    loadingAnimationStore.showSpinner(true)
    userStore.userLogin(values.identifier, values.password, rememberUser)
      .then(res => {
        console.log(res)
      })
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
        history.push('/')
      })
  }

  useEffect(() => {
    if (match.url === '/verified') {
      message.success(`Your account has been activated. Login to start using app`, 5)
    }
  }, [])

  return (
    <AuthLayout
      heading={'Welcome back!'}
      message={'Sign in by entering the information below.'}>
      <Helmet>
        <title>Login | Dashboard</title>
      </Helmet>
      <Form
        layout={'vertical'}
        name={'loginForm'}
        onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="identifier"
          rules={[
            { required: true, message: 'Please input your username!' },
            { validator: validator.validateEmptyString },
          ]}>
          <Input placeholder={'Input your username/email'}/>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { validator: validator.validateEmptyString },
          ]}>
          <Input.Password visibilityToggle={false} placeholder={'Input your password'}/>
        </Form.Item>

        <ActionRow color={commonStore.appTheme.solidColor}>
          <Checkbox defaultChecked={rememberUser} onChange={e => setRememberUser(e.target.checked)}>
            Remember me
          </Checkbox>
          <Link to={'/forgot-password'}>
            Forgot password?
          </Link>
        </ActionRow>

        <Button type={'primary'} block htmlType={'submit'}>
          LOG IN
        </Button>

        <NaviLink color={commonStore.appTheme.solidColor}>
          Don't have an account?
          <Link to={'/register'}>
             REGISTER NOW
          </Link>
        </NaviLink>
      </Form>
    </AuthLayout>
  )
}

export default inject(
  'userStore', 'loadingAnimationStore', 'commonStore'
)(observer(LoginPage))