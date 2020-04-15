import React, { useEffect } from 'react'
import { Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import {
  SideBarWrapper,
} from './SideBarStyled'
import UserInfo from '../../pages/UserInfo'

const { SubMenu } = Menu


const SideBar = (props) => {
  const {commonStore,match} = props;
  useEffect(() => {
    const pageName = match.path.split('/')[1] || 'home'
    commonStore.setPage([pageName])
  }, [location.pathname])
  return (
    <SideBarWrapper>
      <Menu
        style={{ width: 256 }}
        selectedKeys={commonStore.pageName}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
             <UserOutlined/>
              <span>Quản lý User</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1" title="Cấu hình User">
            <Menu.Item key={'UserInfo'}>
              <Link to='/UserInfo'>
                Cấu hình thông tin
              </Link>
            </Menu.Item>
            <Menu.Item key={'UserAccount'}>
              <Link to='/UserAccount'>
                Cấu hình tài khoản
              </Link>
            </Menu.Item>

          </Menu.ItemGroup>

        </SubMenu>

      </Menu>
    </SideBarWrapper>
  )
}

export default withRouter(inject(
  'commonStore',
)(observer(SideBar)))