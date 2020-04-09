import React from 'react'
import styled, { css } from 'styled-components'
import { Divider } from 'antd'
import PropTypes from 'prop-types'

const CustomDividerWithStyled = styled(Divider)`
  ${props => !props.margin && css`
    margin-top: 0;
    margin-bottom: 0;
  `}
  ${props => props.opacity && css`
    background: rgba(240,240,240, ${props.opacity});
  `}
`

const CustomDivider = props => {
  return <CustomDividerWithStyled {...props}/>
}

CustomDivider.propTypes = {
  margin: PropTypes.bool,
  opacity: PropTypes.number,
}

export default CustomDivider