import React, { useState, Fragment, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import {
  AuthenBlock,
  Header,
  HeaderRight,
  HeaderTitle, HeaderWraper,
  NotifyBlockShake, NotifyCount, NotifyLink,
} from './MainHeaderStyled'
import logo from './images/logo-header.png'
import notifyimg from './images/notify.svg'
import { Button, Dropdown, Modal, Form, Input, Menu } from 'antd'
import io from 'socket.io-client'
import { withRouter } from 'react-router-dom'
import userStore from '../../stores/userStore'
import { toJS } from 'mobx'


const MainHeader = (props) => {
  const { userStore, loadingAnimationStore, history } = props
  const [visible, setVisible] = useState(false)//modal login
  const [notify, setNotify] = useState([])// notify list item
  const [openNoti, setOpenNoti] = useState(false)//notify dropdown
  const socket = io('http://1.55.17.186:3000')
  socket.on('message', (msg) => {
    let currNoti = [msg, ...notify]
    setNotify(currNoti)
  })
  const toogleNoti = () => {
    setOpenNoti(!openNoti)
  }
  const onFinish = (values) => {
    loadingAnimationStore.showSpinner(true)
    userStore.userLogin(values.identifier, values.password, false)
      .then(response => {
        if (response !== 'success') return
        userStore.checkCurrentUser()
          .then(() => {
            setVisible(false)
            history.push('/HomePage')
          })
      })
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
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
  const logOut = () => {
    userStore.userLogout()
    history.push('/')
  }



  const menu = (
    <Menu>
      {
        notify && notify.length > 0 && notify.map((item, index) =>
          <Menu.Item key={index}>
            <NotifyLink to="/">{item}</NotifyLink>
          </Menu.Item>,
        )
      }
    </Menu>
  )

  return (

    <HeaderWraper>
      <Header>
        <img src={logo} alt="" height={60}/>
        <HeaderRight>
          <HeaderTitle>Vietnam Maritime Corporation - Portal</HeaderTitle>
          {
            userStore.token
              ?
              <Fragment>
                <AuthenBlock>
                  <Dropdown overlay={
                    <Menu>
                      <Menu.Item>
                        <a onClick={logOut}>
                          Đăng xuất
                        </a>
                      </Menu.Item>
                    </Menu>
                  }>
                    <span className="ant-dropdown-link">
                      {
                        userStore.currentUser
                          ? toJS(userStore.currentUser) : null
                      }
                    </span>
                  </Dropdown>

                </AuthenBlock>
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
              </Fragment>


              :
              <AuthenBlock onClick={showModal}>
                Đăng nhập
              </AuthenBlock>
          }


        </HeaderRight>
      </Header>
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
    </HeaderWraper>
  )
}
export default withRouter(
  inject(
    'userStore',
    'loadingAnimationStore',
  )(observer(MainHeader)),
)