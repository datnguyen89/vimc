import styled from 'styled-components'

export const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  a {
    color: ${props => props.color}
  }
`
export const NaviLink = styled.div`
  margin-top: 10px;
  margin-bottom: -10px;
  a {
    color: ${props => props.color};
    margin-left: 5px;
  }
`