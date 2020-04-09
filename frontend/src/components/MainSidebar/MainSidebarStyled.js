import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { BellOutlined } from '@ant-design/icons'

export const AppSidebar = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  .ant-menu {
    background-color: transparent !important;
    border-right: none !important;
    .ant-menu-item {
      padding-left: 0 !important;
      padding-right: 0 !important;
      &.ant-menu-item-active, &.ant-menu-item-selected {
        background-color: rgba(0, 0, 0, 0.06);
        border-right: none !important;
        &:after {
          display: none;
        }
      }
      > a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: white;
        padding-left: 24px;
      }
    }
  }
`
export const LogoWrapper = styled(Link)`
  padding: 14px 6px;
  color: white;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.2;
  &:hover {
    color: white;
  }
`
export const UserMenu = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 25px 0;
  transition: ease .3s;
  &:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
    transition: ease .3s;
  }
`
export const Avatar = styled.div`
  position: relative;
  padding-left: 70px;
  img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
`
export const UserName = styled.div`
  color: white;
  font-size: 14px;
  text-align: left;
  width: 130px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), max-width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
`
export const ActionMenu = styled.div`
  margin-top: auto;
  display: block;
  width: 100%;
  .ant-menu-item {
    background-color: transparent !important;
    &:hover {
      background-color: rgba(0,0,0,.1) !important;
    }
  }
`
export const NavigationMenu = styled.div`
  width: 100%;
`
export const BellIconWithNotification = styled(BellOutlined)`
  position: relative;
  &:before {
    display: block;
    content: '';
    width: 8px;
    height: 8px;
    background-color: #fc0000;
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
  }
`