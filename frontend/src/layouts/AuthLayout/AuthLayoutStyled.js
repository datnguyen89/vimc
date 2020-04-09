import styled from 'styled-components'

export const AuthLayoutWrapper = styled.div`
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  padding: 30px 0 100px;
  background: ${props => props.backgroundColor};
  &:after {
    display: block;
    content: '';
    width: 100vw;
    height: 30.9vw;
    position: absolute;
    left: 0;
    bottom: 0;
    background: url(${props => props.backgroundImage}) no-repeat center center;
    background-size: 100% 100%;
    pointer-events: none;
  }
`
export const LogoWrapper = styled.div`
  display: block;
  text-align: center;
  margin-bottom: 30px;
  img {
    height: 100px;
  }
`
export const FormWrapper = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 640px;
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 40px 70px 30px;
  border: 1px solid #e6e6e6;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 25px;
`
export const FormHeading = styled.h1`
  font-size: 24px;
  color: #000;
  font-weight: 500;
  margin-bottom: 5px;
`
export const FormMessage = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 25px;
`