import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const NaviLink = styled(Link)`
  display: block;
  text-align: center;
  color: ${props => props.color};
  margin-top: 10px;
  margin-bottom: -10px;
  &:hover {
    color: ${props => props.color};
  }
`