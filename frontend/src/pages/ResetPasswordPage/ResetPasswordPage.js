import React from 'react'
import { inject, observer } from 'mobx-react'
import AuthLayout from '../../layouts/AuthLayout'
import { Form, Input, Button } from 'antd'
import { NaviLink } from './ResetPasswordPageStyled'

const ResetPasswordPage = props => {
  const {
    match, history,
    commonStore, userStore, loadingAnimationStore,
  } = props

  const resetPasswordToken = match.params.token

  const onFinish = val => {
    const {
      password, passwordConfirmation,
    } = val
    loadingAnimationStore.showSpinner(true)
    userStore.userSetNewPassword(resetPasswordToken, password, passwordConfirmation)
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
        history.push('/login')
      })
  }

  return (
    <AuthLayout
      heading={'Reset password'}
      message={'Enter your new password'}>
      <Form
        layout={'vertical'}
        onFinish={onFinish}
        name={'resetPasswordForm'}>
        <Form.Item
          name="password"
          label="New password"
          rules={[
            { required: true, message: 'Please input your new password!' },
          ]}
          hasFeedback
        >
          <Input.Password placeholder={'Enter your new password'} visibilityToggle={false}/>
        </Form.Item>
        <Form.Item
          name="passwordConfirmation"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your new password!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('The two passwords that you entered do not match!')
              },
            }),
          ]}>
          <Input.Password placeholder={'Re-enter your new password'} visibilityToggle={false}/>
        </Form.Item>
        <Button type={'primary'} htmlType={'submit'} block>
          UPDATE NEW PASSWORD
        </Button>
        <NaviLink to={'/login'} color={commonStore.appTheme.solidColor}>
          BACK TO LOGIN
        </NaviLink>
      </Form>
    </AuthLayout>
  )
}

export default inject('commonStore', 'userStore', 'loadingAnimationStore')(observer(ResetPasswordPage))