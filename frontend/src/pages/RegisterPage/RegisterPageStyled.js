import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NaviLink = styled(Link)`
  color: ${props => props.color};
  &:hover {
    color: ${props => props.color};
  }
`