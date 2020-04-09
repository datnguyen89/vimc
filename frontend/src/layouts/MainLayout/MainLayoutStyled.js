import styled from 'styled-components'

export const MainLayoutWrapper = styled.div`
  padding: 15px;
  background-color: #f2f3f9;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: stretch;
  min-height: 100vh;
  position: relative;
`
export const SidebarWrapper = styled.aside`
  transition: ease 0.2s;
  position: fixed;
  top: 15px;
  left: 15px;
  height: calc(100% - 30px);
`
export const MainContentWrapper = styled.div`
  padding-left: 20px;
  transition: ease 0.2s;
`