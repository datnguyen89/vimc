import styled from 'styled-components'

export const MainLayoutWraper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`
export const Body = styled.div`
  display: flex;
`
export const Content = styled.div`
  flex-grow: 1;
  background: #ffffff;
  padding: 15px;
  width: calc(100% - 256px);
`