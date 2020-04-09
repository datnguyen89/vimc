import React from 'react'
import { inject, observer } from 'mobx-react'
import { createGlobalStyle } from 'styled-components'

const ThemeProvider = ({ commonStore, children }) => {

  const {
    solidColor, shadowColor, gradientColor, solidLightColor, lightShadowColor,
  } = commonStore.appTheme

  const GlobalStyle = createGlobalStyle`
    /** System styling */
    html {
      --antd-wave-shadow-color: ${solidColor} !important;
    }
    ::selection {
      background: ${solidColor} !important;
    }
    /** Button */
    .ant-btn {
      color: ${solidColor} !important;
      border-color: ${solidColor} !important;
      &:hover {
        box-shadow: ${shadowColor};
      }
    }
    .ant-btn-primary {
      background: ${gradientColor} !important;
      border-color: ${solidColor} !important;
      color: white !important;
      &:hover {
        box-shadow: ${shadowColor};
      }
    }
    /** Input */
    .ant-input-affix-wrapper {
      &:hover {
        border-color: ${solidColor} !important;
      }
      &:focus, &.ant-input-affix-wrapper-focused {
        border-color: ${solidColor} !important;
        box-shadow: ${lightShadowColor} !important;
        outline: none !important;
      }
    }
    .ant-form {
      .ant-input {
        &:hover {
          border-color: ${solidColor} !important;
        }
        &:focus, &.ant-input-focused {
          outline: none !important;
          border-color: ${solidColor} !important;
          box-shadow: ${lightShadowColor} !important;
        }
      }
    }
    /** Select */
    .ant-select {
      .ant-select-selector {
        align-items: center;
        height: 40px !important;
      }
      &:not(.ant-select-disabled) {
        &:hover {
          .ant-select-selector {
            border-color: ${solidColor} !important;
          }
        }
      }
      &:focus, &.ant-select-focused {
        .ant-select-selector {
          border-color: ${solidColor} !important;
          outline: none !important;
          box-shadow: ${lightShadowColor} !important;
        }
      }
    }
    .ant-select-dropdown {
      .ant-select-item-option-selected {
        &:not(.ant-select-item-option-disabled) {
          background-color: ${solidLightColor} !important;
        }
      }
    }
    /** Checkbox */
    .ant-checkbox-wrapper {
      &:hover {
        .ant-checkbox-inner {
          border-color: ${solidColor} !important;
        }
      }
      .ant-checkbox-checked {
        &:after {
          border-color: ${solidColor} !important;
        }
        .ant-checkbox-inner {
          background-color: ${solidColor} !important;
          border-color: ${solidColor} !important;
        }
      }
    }
  `

  return (
    <React.Fragment>
      <GlobalStyle/>
      {children}
    </React.Fragment>
  )
}

export default inject('commonStore')(observer(ThemeProvider))