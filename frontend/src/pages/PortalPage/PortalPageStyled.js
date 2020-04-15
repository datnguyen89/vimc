import styled, { keyframes, css } from 'styled-components'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'


export const PortalWraper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

export const keyFrameShake = keyframes`
  0% { transform: translate(0px, 2px) rotate(5deg); }  
  50% { transform: translate(0px, 2px) rotate(-5deg); }  
  100% { transform: translate(0px, 2px) rotate(5deg); }
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
