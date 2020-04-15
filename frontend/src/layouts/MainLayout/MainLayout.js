import React from 'react'
import PropTypes from 'prop-types'
import {
  MainLayoutWraper,
  Body,
  Content,

} from './MainLayoutStyled'

import MainHeader from '../../components/MainHeader'
import SideBar from '../../components/SideBar'

const MainLayout = (props) => {
  const { children } = props
  return (
    <MainLayoutWraper>
      <MainHeader/>
      <Body>
        <SideBar/>
        <Content>
          {children}
        </Content>

      </Body>

    </MainLayoutWraper>
  )
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default MainLayout