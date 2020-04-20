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

} from './PortalPageStyled'
import office from './images/office.svg'
import email from './images/email.svg'
import elearning from './images/e-learning.svg'
import cehr from './images/cehr.svg'
import misbi from './images/mis-bi.svg'
import fast from './images/fast.svg'

const PortalPage = props => {

  const { userStore, loadingAnimationStore, history } = props

  return (
    <PortalWraper>
      <MainHeader/>
      <ContentWraper>
        <Content>
          <Rows justify="center" gutter={[15, 15]}>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={office} alt="" height={140} width={140}/>
              </Link>
              <b>e-Office</b>
              <p>Văn phòng điện tử</p>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to='/Email'><img src={email} alt="" height={140} width={140}/></Link>
              <b>e-Mail</b>
              <p>Thư điện tử</p>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={elearning} alt="" height={140} width={140}/>
              </Link>
              <b>e-Learning</b>
              <p>Đào tạo trực tuyến</p>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={cehr} alt="" height={140} width={140}/>
              </Link>
              <b>CeHR</b>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={misbi} alt="" height={140} width={140}/>
              </Link>
              <b>Mis-BI</b>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={fast} alt="" height={140} width={140}/>
              </Link>
              <b>Fast</b>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={office} alt="" height={140} width={140}/>
              </Link>
              <b>e-Office</b>
              <p>Trục liên thông</p>
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
