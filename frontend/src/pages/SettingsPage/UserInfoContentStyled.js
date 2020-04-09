import styled from 'styled-components'

export const BlockWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`
export const BlockContent = styled.dl`
  width: 48%;
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  dt {
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
    width: 140px;
    position: relative;
    padding-left: 20px;
    .anticon {
      color: ${props => props.theme.solidColor};
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(4px);
    }
  }
  dd {
    width: calc(100% - 140px);
    padding-left: 15px;
    word-break: break-all;
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
  }
`