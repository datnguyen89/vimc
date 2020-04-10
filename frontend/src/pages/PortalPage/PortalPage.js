import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Modal, Button, Form, Input, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import io from 'socket.io-client'

import {
  PortalWraper,
  Header,
  Content,
  Footer,
  HeaderRight,
  HeaderTitle,
  NotifyCount,
  NotifyBlockShake,
  HeaderWraper,
  ContentWraper,
  Rows,
  Cols,
  AuthenBlock,
} from './PortalPageStyled'
import logo from './images/logo-header.png'
import notifyimg from './images/notify.svg'
import office from './images/office.svg'
import email from './images/email.svg'
import elearning from './images/e-learning.svg'
import cehr from './images/cehr.svg'
import misbi from './images/mis-bi.svg'
import fast from './images/fast.svg'

const PortalPage = (props) => {
  const socket = io('http://1.55.17.186:3000')
  socket.on('message', (msg) => {
    let currNoti = [msg, ...notify]
    setNotify(currNoti)
  })

  const { userStore, loadingAnimationStore, history } = props
  console.log('token', userStore.token)
  const [openNoti, setOpenNoti] = useState(false)//notify dropdown
  const [visible, setVisible] = useState(false)//modal login
  const [notify, setNotify] = useState([])// notify list item
  const toogleNoti = () => {
    setOpenNoti(!openNoti)
  }
  const onFinish = (values) => {
    loadingAnimationStore.showSpinner(true)
    userStore.userLogin(values.identifier, values.password, false)
      .then((res) => {
        console.log(res)
      })
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
        setVisible(false)
        history.push('/')
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  }
  const showModal = () => {
    setVisible(true)
  }

  const handleOk = (e) => {
    setVisible(false)
  }

  const handleCancel = (e) => {
    setVisible(false)
  }
  const menu = (
    <Menu>
      {
        notify && notify.length > 0 && notify.map((item, index) =>
          <Menu.Item key={index}>
            <Link to="/">{item}</Link>
          </Menu.Item>,
        )
      }
    </Menu>
  )

  return (
    <PortalWraper>
      <HeaderWraper>
        <Header>
          <img src={logo} alt="" height={60}/>
          <HeaderRight>
            <HeaderTitle>Vietnam Maritime Corporation - Portal</HeaderTitle>
            {
              userStore.token
                ?
                <AuthenBlock>
                  {userStore.currentUser.username}
                </AuthenBlock>
                :
                <AuthenBlock onClick={showModal}>
                  Đăng nhập
                </AuthenBlock>
            }

            <Dropdown
              placement="bottomRight"
              overlay={menu}
              disabled={notify && notify.length === 0}
              trigger={['click']}>
              <NotifyBlockShake shake={notify.length > 0 ? true : false} onClick={toogleNoti}>
                <img src={notifyimg} alt="" height={20}/>
                {
                  notify && notify.length > 0 && <NotifyCount>{notify.length}</NotifyCount>
                }
              </NotifyBlockShake>
            </Dropdown>
          </HeaderRight>
        </Header>
      </HeaderWraper>
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
              <Link to={'#'}>
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
      <Modal
        title="Đăng nhập hệ thống"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout={'vertical'} name={'loginForm'} onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="identifier"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder={'Input your username'}/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              visibilityToggle={false}
              placeholder={'Input your password'}
            />
          </Form.Item>
          <Button type={'primary'} block htmlType={'submit'}>
            LOG IN
          </Button>
        </Form>
      </Modal>
    </PortalWraper>
  )
}
export default inject(
  'userStore',
  'loadingAnimationStore',
)(observer(PortalPage))
