import styled, { keyframes, css } from 'styled-components'
import { Row, Col } from 'antd'

export const PortalWraper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`
export const HeaderWraper = styled.div`
   background: #fff;
  border-bottom: 1px solid #e1e1e1;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.05);
`
export const Header = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
`
export const keyFrameShake = keyframes`
  0% { transform: translate(0px, 2px) rotate(5deg); }  
  50% { transform: translate(0px, 2px) rotate(-5deg); }  
  100% { transform: translate(0px, 2px) rotate(5deg); }
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
export const AuthenBlock = styled.a`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: auto;
  padding-left: 10px;
  color: #333;
  &:hover {
    color: #333;
  }
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
export const ContentWraper = styled.div`
      flex-grow: 1;
`
export const Content = styled.div`
  width: 80%;
  margin: 16px auto;  
`
export const Footer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f7f7f7;
`
export const Rows = styled(Row)``

export const Cols = styled(Col)`
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
