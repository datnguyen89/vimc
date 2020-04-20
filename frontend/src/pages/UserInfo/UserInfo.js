import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { inject, observer } from 'mobx-react'
import ListUsers from '../../components/ListUsers'
import AddUser from '../../components/AddUser'

const UserInfo = () => {
  return (
    <MainLayout>
      <AddUser/>
      <ListUsers edit={true} header={true} paging={true}/>
    </MainLayout>

  )
}

export default inject('userStore')(observer(UserInfo))