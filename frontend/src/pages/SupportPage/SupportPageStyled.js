import styled from 'styled-components'
import { Input } from 'antd'

const { Search } = Input

export const FAQWrapper = styled.div`
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  background: #FFFFFF;
  padding: 50px 15px;
  display: block;
  min-height: 650px;
  .ant-collapse {
    background-color: #fff;
    border: none;
    border-radius: 0;
  }
  .ant-collapse > .ant-collapse-item:last-child, .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
    border-radius: 0;
  }
  .ant-collapse > .ant-collapse-item {
    margin-bottom: 15px;  
    border: none;
    &:last-child {
      margin-bottom: 0;
    }
    .ant-collapse-header {
      background-color: #f2f3f9;
    }
    .ant-collapse-content {
      border: none;
      .ant-collapse-content-box {
        p {
          margin-bottom: 0;
        }      
      }
    }
  }
`
export const StyledSearch = styled(Search)`
  min-width: 250px;
  display: flex;
  align-items: center;
  .ant-input {
    height: 30px;
  }
`