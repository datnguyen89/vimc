import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Heading = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #000;
`
export const SubHeading = styled.h2`
  text-align: center;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 400;
`
export const IconWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
  img {
    height: 80px;
  }
`
export const NaviLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 30px;
  color: ${props => props.color};
  &:hover {
    color: ${props => props.color};
  }
`