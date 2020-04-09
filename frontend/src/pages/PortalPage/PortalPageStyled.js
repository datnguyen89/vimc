import styled, { keyframes } from 'styled-components'
import {Row, Col} from 'antd'

export const PortalWraper = styled.div`
    height: 100vh;
        display: flex;
    flex-direction: column;
`
export const HeaderWraper = styled.div`
    background: #fff;
    border-bottom: 1px solid #e1e1e1;
    box-shadow: 0 10px 10px rgba(0,0,0,.05);
`
export const Header = styled.div`
    display: flex;
    width: 80%;
    margin: 0px auto;
    align-items: center;
    justify-content: space-between;
        padding: 15px 0px;
`
export const Logo = styled.div`

`
export const keyFrameShake = keyframes`
  0% { transform: translate(0px, 2px) rotate(5deg); }  
  50% { transform: translate(0px, 2px) rotate(-5deg); }  
  100% { transform: translate(0px, 2px) rotate(5deg); }
`
export const LoginBlock = styled.a`
    color:#444;
`
export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`
export const HeaderTitle = styled.div`
    font-size: 2em;
    margin-right: 30px;
`
export const UserBlock = styled.div`
    margin-right: 30px;
`
export const NotifyBlock = styled.div`
        position: relative;
`
export const NotifyBlockShake = styled.div`
        position: relative;
        animation: ${keyFrameShake} 0.2s infinite;
`
export const NotifyCount = styled.div`
    width: 14px;
    height: 14px;
    background: red;
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.8em;
   right: -6px;
    top: 8px;
`
export const NotifyPopup = styled.div`
       position: absolute;
    width: 460px;
    top: 40px;
    left: -430px;
    background: #fff;
    border-radius: 0 0 2px 2px;
    border: 1px solid rgba(100,100,100,.4);
    box-shadow: 0 3px 8px rgba(0,0,0,.25);
    z-index: 9;
    &::before{
        content: "";
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 11px solid rgba(100, 100, 100, .4);
        position: absolute;
        top: -11px;
        right: 9px;
      }
    &::after{
        content: "";
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 11px solid #fff;
        position: absolute;
        top: -10px;
        right: 9px;
      }
`
export const NotifyHeader = styled.div`
        display: flex;
    justify-content: space-between;
    align-items: center;
        padding: 5px 10px 5px;
`
export const ContentWraper = styled.div`
        height: 100%;
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
export const Rows = styled(Row)`
    
`


export const Cols = styled(Col)`
        padding: 16px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`