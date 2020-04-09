import React, { useEffect } from 'react'
import {
  Dropdown, Menu,
} from 'antd'
import {
  LogoutOutlined,
  BellOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import {
  AppSidebar, LogoWrapper, UserMenu, Avatar, UserName, ActionMenu, NavigationMenu, BellIconWithNotification,
} from './MainSidebarStyled'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'

const MainSidebar = (props) => {

  const {
    commonStore, userStore, notificationStore,
    history, match,
  } = props

  const sidebarStyle = {
    background: commonStore.appTheme.gradientColor,
    boxShadow: commonStore.appTheme.shadowColor,
  }

  const dropdownTextStyle = {
    margin: '0 10px',
    paddingBottom: 4,
  }

  const iconStyle = {
    fontSize: 18,
    lineHeight: 'normal',
    marginRight: 0,
  }

  useEffect(() => {
    const pageName = match.path.split('/')[1] || 'home'
    commonStore.setPage([pageName])
  }, [location.pathname])

  const userLogout = () => {
    userStore.userLogout()
      .then(() => {
        commonStore.setTheme('green')
        history.push('/login')
      })
  }

  const dropdownMenu = (
    <Menu>
      <Menu.Item key={'settings'}>
        <Link to={'/settings'}>
          <SettingOutlined/>
          <span style={dropdownTextStyle}>Setting</span>
        </Link>
      </Menu.Item>
      <Menu.Item key={'logout'}>
        <div style={{ color: 'red' }} onClick={userLogout}>
          <LogoutOutlined/>
          <span style={dropdownTextStyle}>Logout</span>
        </div>
      </Menu.Item>
    </Menu>
  )

  return (
    <AppSidebar style={sidebarStyle}>

      <LogoWrapper to={'/'}>
        <img src={`${process.env.PUBLIC_URL}/assets/imgs/app-logo@2x.png`} alt="" height={57}/>
      </LogoWrapper>

      <NavigationMenu>
        <Menu selectedKeys={commonStore.pageName} mode={'inline'} inlineCollapsed={commonStore.isSidebarCollapsed}>
          <Menu.Item key={'home'}>
            <Link to='/'>
              <HomeOutlined style={iconStyle}/>
              <span style={dropdownTextStyle}>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={'support'}>
            <Link to='/support'>
              <QuestionCircleOutlined style={iconStyle}/>
              <span style={dropdownTextStyle}>Support</span>
            </Link>
          </Menu.Item>
          <Menu.Item key={'notifications'}>
            <Link to='/notifications'>
              {
                notificationStore.notificationList.length === 0
                  ? <BellOutlined style={iconStyle}/>
                  : <BellIconWithNotification style={iconStyle}/>
              }
              <span style={dropdownTextStyle}>Notifications</span>
            </Link>
          </Menu.Item>
        </Menu>
      </NavigationMenu>

      <ActionMenu>
        <Menu mode={'inline'} inlineCollapsed={commonStore.isSidebarCollapsed}>
          <Menu.Item>
            <a onClick={() => commonStore.toggleCollapsedSidebar(!commonStore.isSidebarCollapsed)}>
              {
                commonStore.isSidebarCollapsed
                  ? <MenuUnfoldOutlined style={iconStyle}/>
                  : <MenuFoldOutlined style={iconStyle}/>
              }
              <span style={dropdownTextStyle}>Compact sidebar</span>
            </a>
          </Menu.Item>
        </Menu>
      </ActionMenu>

      <Dropdown overlay={dropdownMenu} overlayClassName={'user-avatar-menu'} placement="topCenter">
        <UserMenu>
          <Avatar>
            <img src={`${process.env.PUBLIC_URL}/assets/imgs/default-avatar.jpg`} alt=""/>
          </Avatar>
          <UserName>
            Hi, {userStore.currentUser.username}
          </UserName>
        </UserMenu>
      </Dropdown>

    </AppSidebar>
  )

}

export default withRouter(inject(
  'commonStore', 'userStore', 'notificationStore',
)(observer(MainSidebar)))