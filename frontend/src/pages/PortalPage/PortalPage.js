import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'


import MainHeader from '../../components/MainHeader'

import {
  PortalWraper,
  Content,
  Footer,
  ContentWraper,
  Rows,
  Cols,
  NotifyLink,
} from './PortalPageStyled'
import office from './images/office.svg'
import email from './images/email.svg'
import elearning from './images/e-learning.svg'
import cehr from './images/cehr.svg'
import misbi from './images/mis-bi.svg'
import fast from './images/fast.svg'

const PortalPage = (props) => {

  const { userStore, loadingAnimationStore, history } = props

  return (
    <PortalWraper>
      <MainHeader/>
      <ContentWraper>
        <Content>
          <Rows justify="center" gutter={[16, 32]}>
            <Cols span={8}>
              <Link to={'#'}>
                <img src={office} alt="" height={140} width={140}/>
              </Link>
              <b>e-Office</b>
              <p>Văn phòng điện tử</p>
            </Cols>
            <Cols span={8}>
              <Link to={
                {pathname:'/Email'}
              }>
                <img src={email} alt="" height={140} width={140}/>
              </Link>
              <b>e-Mail</b>
              <p>Thư điện tử</p>
            </Cols>
            <Cols span={8}>
              <Link to={'#'}>
                <img src={elearning} alt="" height={140} width={140}/>
              </Link>
              <b>e-Learning</b>
              <p>Đào tạo trực tuyến</p>
            </Cols>
          </Rows>
          <Rows justify="center" gutter={[16, 16]}>
            <Cols span={8}>
              <Link to={'#'}>
                <img src={cehr} alt="" height={140} width={140}/>
              </Link>
              <b>CeHR</b>
            </Cols>
            <Cols span={8}>
              <Link to={'#'}>
                <img src={misbi} alt="" height={140} width={140}/>
              </Link>
              <b>Mis-BI</b>
            </Cols>
            <Cols span={8}>
              <Link to={'#'}>
                <img src={fast} alt="" height={140} width={140}/>
              </Link>
              <b>Fast</b>
            </Cols>
          </Rows>
        </Content>
      </ContentWraper>
      <Footer>
        © 2019 Trung tâm Công nghệ thông tin - Hotline hỗ trợ 1687
      </Footer>

    </PortalWraper>
  )
}
export default inject(
  'userStore',
  'loadingAnimationStore',
)(observer(PortalPage))
