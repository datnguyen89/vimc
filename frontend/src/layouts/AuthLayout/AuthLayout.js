import React from 'react'
import PropTypes from 'prop-types'
import { AuthLayoutWrapper, FormWrapper, FormHeading, FormMessage, LogoWrapper } from './AuthLayoutStyled'
import { inject, observer } from 'mobx-react'

const AuthLayout = props => {

  const { children, commonStore, heading, message } = props
  const { gradientColor } = commonStore.appTheme

  return (
    <AuthLayoutWrapper
      backgroundImage={`${process.env.PUBLIC_URL}/assets/imgs/auth-bg@2x.png`}
      backgroundColor={gradientColor}>
      <LogoWrapper>
        <img src={`${process.env.PUBLIC_URL}/assets/imgs/app-logo@2x.png`} alt=""/>
      </LogoWrapper>
      <FormWrapper>
        {heading && <FormHeading>{heading}</FormHeading>}
        {message && <FormMessage>{message}</FormMessage>}
        {children}
      </FormWrapper>
    </AuthLayoutWrapper>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  message: PropTypes.node,
}

export default inject('commonStore')(observer(AuthLayout))