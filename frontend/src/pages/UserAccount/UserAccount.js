import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import {
  UserAccountWrapper,
  ListUser,
  AccountInfo,

} from './UserAccountStyled'


const UserAccount = () => {
  return (
    <MainLayout>
      <UserAccountWrapper>
        <ListUser>

        </ListUser>
        <AccountInfo>

        </AccountInfo>
      </UserAccountWrapper>
    </MainLayout>
  )
}

export default UserAccount