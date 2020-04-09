import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { BlockWrapper, BlockContent } from './UserInfoContentStyled'
import {
  UserOutlined, MailOutlined, PhoneOutlined, ShoppingOutlined, CarOutlined, IdcardOutlined, ContactsOutlined
} from '@ant-design/icons'

const UserInfoContent = props => {

  const { userStore, commonStore } = props
  const {
    firstName, lastName,
    biography, phoneNumber, address, email, jobTitle,
    created_at, updated_at,
  } = userStore.currentUser

  return (
    <Fragment>
      <BlockWrapper>
        <BlockContent theme={commonStore.appTheme}>
          <dt><UserOutlined/> Fullname:</dt>
          <dd>{firstName} {lastName}</dd>
          <dt><MailOutlined/> Email:</dt>
          <dd>{email}</dd>
          <dt><PhoneOutlined/> Phone number:</dt>
          <dd>{phoneNumber || 'N/A'}</dd>
          <dt><ShoppingOutlined/> Job title:</dt>
          <dd>{jobTitle || 'N/A'}</dd>
        </BlockContent>
        <BlockContent theme={commonStore.appTheme}>
          <dt><CarOutlined/> Address:</dt>
          <dd>{address || 'N/A'}</dd>
          <dt><IdcardOutlined/> Biography:</dt>
          <dd>{biography || 'N/A'}</dd>
          <dt><ContactsOutlined/> Register date:</dt>
          <dd>{moment(created_at).format('DD/MM/YYYY, HH:mm:ss') || 'N/A'}</dd>
          <dt><ContactsOutlined/> Updated date:</dt>
          <dd>{moment(updated_at).format('DD/MM/YYYY, HH:mm:ss') || 'N/A'}</dd>
        </BlockContent>
      </BlockWrapper>
    </Fragment>
  )
}

export default inject('userStore', 'commonStore')(observer(UserInfoContent))