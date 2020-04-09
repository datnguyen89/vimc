import React from 'react'
import PropTypes from 'prop-types'
import { BlockWrapperWithStyled } from './BlockWrapperStyled'

const BlockWrapper = props => {
  const { children } = props
  return (
    <BlockWrapperWithStyled>
      {children}
    </BlockWrapperWithStyled>
  )
}

BlockWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BlockWrapper