import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { inject, observer } from 'mobx-react'
import ListUsers from '../../components/ListUsers'


import {
  UserInfoWrap,
} from './UserInfoStyled'
import AddUser from '../../components/AddUser'

const UserInfo = (props) => {
  // const { userStore } = props
  // const pcompanySize = 10
  // const [listUsers, setListUsers] = useState(null)
  // useEffect(() => {
  //   userStore.getlistUsers(0, pcompanySize)
  //     .then((response) => {
  //         const {data,total_count,total_pcompany} = response;
  //
  //     })
  //
  //
  // }, [])

  return (
    <MainLayout>
      <UserInfoWrap>
        <AddUser/>
        <ListUsers edit={true} header={true} paging={true}/>
      </UserInfoWrap>
    </MainLayout>

  )
}

export default inject('userStore')(observer(UserInfo))