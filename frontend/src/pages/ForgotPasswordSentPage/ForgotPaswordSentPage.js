import React from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { Heading, SubHeading, IconWrapper, NaviLink } from './ForgotPasswordSentPageStyled'
import { inject, observer } from 'mobx-react'

const ForgotPasswordSentPage = props => {
  const { commonStore } = props
  return (
    <AuthLayout>
      <IconWrapper>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/email-icon@2x.png`} alt=""/>
      </IconWrapper>
      <Heading>
        Reset password
      </Heading>
      <SubHeading>
        A reset password link has been sent to your email. Follow the instruction to reset your password.
      </SubHeading>
      <NaviLink to={'/login'} color={commonStore.appTheme.solidColor}>
        Back to login
      </NaviLink>
    </AuthLayout>
  )
}

export default inject('commonStore')(observer(ForgotPasswordSentPage))