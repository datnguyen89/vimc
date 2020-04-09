import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import MainLayout from '../../layouts/MainLayout'
import PageHeading from '../../components/PageHeading'
import { Button, List, Avatar, Tooltip, message } from 'antd'
import { EyeOutlined, AlignRightOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import BlockWrapper from '../../components/BlockWrapper'

const NotificationsPage = props => {

  const { notificationStore } = props

  const handleViewUser = userId => {
    message.info(`View info for user with id ${userId}`)
  }

  const handleClearNotification = notificationID => {
    message.info(`Clear notification with id ${notificationID}`)
  }

  const handleClearAllNotifications = () => {
    notificationStore.clearNotification()
  }

  return (
    <MainLayout>
      <Helmet>
        <title>Notifications | Otrafy</title>
      </Helmet>
      <PageHeading title={'Notifications'}>
        <Button
          onClick={() => handleClearAllNotifications()}
          type={'primary'} icon={<CheckCircleOutlined/>}>
          Mark all as read
        </Button>
      </PageHeading>
      <BlockWrapper>
        <List
          itemLayout="horizontal"
          dataSource={notificationStore.notificationList}
          renderItem={item => (
            <List.Item
              actions={[
                <Tooltip title={'View'}>
                  <EyeOutlined key="list-view"/>
                </Tooltip>,
                <Tooltip title={'Mark as read'}>
                  <AlignRightOutlined onClick={() => handleClearNotification(item.id)} key="list-clear"/>
                </Tooltip>,
              ]}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                title={
                  <a onClick={() => handleViewUser(item.userId)}>{item.user}</a>
                }
                description={item.action}
              />
            </List.Item>
          )}
        />
      </BlockWrapper>
    </MainLayout>
  )
}

export default inject(
  'notificationStore', 'userStore',
)(observer(NotificationsPage))