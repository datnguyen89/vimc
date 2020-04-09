import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { MainLayoutWrapper, SidebarWrapper, MainContentWrapper } from './MainLayoutStyled'
import MainSidebar from '../../components/MainSidebar'

const MainLayout = props => {

  const { children, commonStore } = props

  return (
    <MainLayoutWrapper>
      <SidebarWrapper style={{
        width: commonStore.isSidebarCollapsed ? 70 : 232,
      }}>
        <MainSidebar/>
      </SidebarWrapper>
      <MainContentWrapper style={{
        width: commonStore.isSidebarCollapsed ? 'calc(100% - 70px)' : 'calc(100% - 232px)',
      }}>
        {children}
      </MainContentWrapper>
    </MainLayoutWrapper>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default inject('commonStore')(observer(MainLayout))