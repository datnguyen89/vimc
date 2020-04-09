import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

const StyledHeading = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${props => props.color};
`

const BlockHeading = props => {

  const {
    commonStore,
    heading,
  } = props

  return <StyledHeading color={commonStore.appTheme.solidColor}>{heading}</StyledHeading>
}

BlockHeading.propTypes = {
  heading: PropTypes.string.isRequired,
}

export default inject('commonStore')(observer(BlockHeading))