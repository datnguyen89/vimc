import React from 'react'
import { inject, observer } from 'mobx-react'
import { Form, Input, Button } from 'antd'
import AuthLayout from '../../layouts/AuthLayout'
import validator from '../../validator'
import { NaviLink } from './ForgotPasswordPageStyled'

const ForgotPasswordPage = props => {

  const {
    userStore, commonStore, loadingAnimationStore, history,
  } = props

  const onFinish = val => {
    loadingAnimationStore.showSpinner(true)
    userStore.sendResetPassword(val.email)
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
        history.push(`/forgot-password/success`)
      })
  }

  return (
    <AuthLayout
      heading={'Forgot password'}
      message={`We'll send an email to...`}>
      <Form
        layout={'vertical'}
        name={'forgotPasswordForm'}
        onFinish={onFinish}>
        <Form.Item
          label={'Email'}
          name={'email'}
          rules={[
            { required: true, message: 'Please input your email' },
            { validator: validator.validateEmail },
          ]}>
          <Input placeholder={'Input your email'}/>
        </Form.Item>
        <Button type={'primary'} htmlType={'submit'} block>
          SEND PASSWORD RESET LINK
        </Button>
        <NaviLink to={'/login'} color={commonStore.appTheme.solidColor}>
          BACK TO LOGIN
        </NaviLink>
      </Form>
    </AuthLayout>
  )
}

export default inject('commonStore', 'userStore', 'loadingAnimationStore')(observer(ForgotPasswordPage))