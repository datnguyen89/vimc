import styled from 'styled-components'

export const WelcomeMessage = styled.h2`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 0;
  &:before {
    display: block;
    content: '';
    width: 0;
    height: 0;
    color: transparent;
    background-color: transparent;
  }
`