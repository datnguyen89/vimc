import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { inject, observer } from 'mobx-react'
import ListUsers from '../../components/ListUsers'
import AddUser from '../../components/AddUser'

const Divider = () => <div style={{ marginBottom: 15 }}/>

const UserInfo = () => {
  return (
    <MainLayout>
      <AddUser/>
      <Divider/>
      <ListUsers edit={true} header={true} paging={true}/>
    </MainLayout>

  )
}

export default inject('userStore')(observer(UserInfo))