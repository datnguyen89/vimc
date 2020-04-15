import styled, { css } from 'styled-components'
import { keyFrameShake } from '../../pages/PortalPage/PortalPageStyled'
import { Link } from 'react-router-dom'

export const AuthenBlock = styled.a`
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 150px;
  margin-left: auto;
  padding-left: 10px;
  color: #333;
  .ant-dropdown-link{
    color: #333;
  }
  &:hover {
    color: #333;
  }
`
export const Header = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
  @media (max-width: 425px){
    flex-direction: column;
  }
`
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-grow: 1;
  padding: 0 10px;
`
export const HeaderTitle = styled.div`
  font-size: 24px;
  margin-right: auto;
  padding-right: 30px;
  line-height: 1.2;
  @media screen and (max-width: 1024px) {
    font-size: 18px;
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
  margin-left: 10px;
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