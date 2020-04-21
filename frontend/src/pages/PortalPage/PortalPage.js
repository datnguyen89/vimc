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

const PortalPage = props => {

  const { userStore, loadingAnimationStore, history } = props

  return (
    <PortalWraper>
      <MainHeader/>
      <ContentWraper>
        <Content>
          <Rows justify="center" gutter={[15, 40]}>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={`${process.env.PUBLIC_URL}/assets/icons/dashboard/eOffice.png`} width={140} alt={''}/>
              </Link>
              <strong>e-Office</strong>
              <p>Văn phòng điện tử</p>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to='/Email'>
                <img src={`${process.env.PUBLIC_URL}/assets/icons/dashboard/eMail.png`} width={140} alt={''}/>
              </Link>
              <strong>e-Mail</strong>
              <p>Thư điện tử</p>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={`${process.env.PUBLIC_URL}/assets/icons/dashboard/eLearning.png`} width={140} alt={''}/>
              </Link>
              <strong>e-Learning</strong>
              <p>Đào tạo trực tuyến</p>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={`${process.env.PUBLIC_URL}/assets/icons/dashboard/CeHR.png`} width={140} alt={''}/>
              </Link>
              <strong>CeHR</strong>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={`${process.env.PUBLIC_URL}/assets/icons/dashboard/Mis-BI.png`} width={140} alt={''}/>
              </Link>
              <strong>Mis-BI</strong>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={`${process.env.PUBLIC_URL}/assets/icons/dashboard/Fast.png`} width={140} alt={''}/>
              </Link>
              <strong>Fast</strong>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'#'}>
                <img src={`${process.env.PUBLIC_URL}/assets/icons/dashboard/eOffice2.png`} width={140} alt={''}/>
              </Link>
              <strong>e-Office</strong>
              <p>Trục liên thông</p>
            </Cols>
            <Cols xs={12} sm={6}>
              <Link to={'/HomePage'}>
                <img src={`${process.env.PUBLIC_URL}/assets/icons/dashboard/Dashboard.png`} width={140} alt={''}/>
              </Link>
              <strong>Dashboard</strong>
              <p>Trang quản lý</p>
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
