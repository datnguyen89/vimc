import styled, { css } from 'styled-components'
import { keyFrameShake } from '../../pages/PortalPage/PortalPageStyled'
import { Link } from 'react-router-dom'

export const AuthenBlock = styled.a`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  padding-left: 10px;
  color: #333;
  span {
    width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
`
export const Header = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  @media screen and (max-width: 768px) {
    padding: 10px 15px;
  }
`
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-grow: 1;
  padding-left: 10px;
`
export const LogoWrapper = styled(Link)`
  img {
    min-width: 140px;
  }
`
export const HeaderTitle = styled.div`
  font-size: 18px;
  margin-right: auto;
  padding-right: 30px;
  line-height: 1.2;
  @media screen and (max-width: 1024px) {
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`
export const HeaderWraper = styled.div`
  background: #fff;
  border-bottom: 1px solid #e1e1e1;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
`
export const NotifyBlockShake = styled.div`
  position: relative;
  margin-left: 15px;
  img {
    ${props => props.shake && css`
    animation: ${keyFrameShake} 0.2s infinite;
  `}}
    
  }
  &:hover {
    cursor: pointer;
  }
`
export const NotifyCount = styled.div`
  width: 15px;
  height: 15px;
  background: red;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  right: -5px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  line-height: 1;
`
export const NotifyLink = styled(Link)`
    width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`