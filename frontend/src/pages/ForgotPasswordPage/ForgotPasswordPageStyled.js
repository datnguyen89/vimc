import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const NaviLink = styled(Link)`
  color: ${props => props.color};
  display: block;
  text-align: center;
  margin-top: 10px;
  margin-bottom: -10px;
  &:hover {
    color: ${props => props.color}
  }
`