import React, { useState ,Fragment} from 'react'
import { inject, observer } from 'mobx-react'
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
      .then((res) => {

      })
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
        setVisible(false)
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
                  {userStore.currentUser.username}
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
export default inject(
  'userStore',
  'loadingAnimationStore',
)(observer(MainHeader))