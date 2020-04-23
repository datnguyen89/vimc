import React, { Fragment, useState, useEffect } from 'react'
import { Table } from 'antd'
import { Pagination, Popconfirm, Divider, Tooltip, Tag } from 'antd'
import {
  DeleteOutlined,
  FolderOpenOutlined,
  QuestionCircleOutlined, ToolOutlined,
} from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import EditUser from '../../components/EditUser'
import accountStore from '../../stores/accountStore'
import { ActionRow } from './ListUsersStyled'
import ModalUpdateCommands from '../../components/ModalUpdateCommands'

const ListUsers = (props) => {
  const { userStore, accountStore, pageName } = props
  const pageSize = 10

  const iconStyle = {
    color: '#fc0000',
  }

  useEffect(() => {
    userStore.getlistUsers(userStore.pageIndex, pageSize)
  }, [userStore.pageIndex])
  useEffect(() => {
    userStore.getlistUsers(userStore.pageIndex, pageSize)
  }, [userStore.totalUser])

  let data = null
  if (userStore.ListUsers) {
    data = userStore.ListUsers.data
  }

  const callback = () => {
    userStore.getlistUsers(0, pageSize)
  }

  const onChange = page => {
    userStore.setPageIndex(page)
  }

  const viewAccounts = (code) => {
    accountStore.setUserCode(code)
  }

  function confirm(code) {

    userStore.deleteUser(code)
      .then((response) => {
        if (response.status !== 200) return
        userStore.getlistUsers(0, pageSize)
      })
  }

  function cancel(e) {
    console.log(e)
  }

  //trigger modal update command
  const [visible, setVisible] = useState(false)
  const [currUserCode, setCurrUserCode] = useState(null)
  const showModal = (code) => {
    setCurrUserCode(code)
    setVisible(true)

  }
  const handleCancel = e => {
    setVisible(false)
  }
  const columnsAccount = [

    {
      title: 'Họ tên',
      dataIndex: 'name_lowercase',
      key: 'name_lowercase',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Tác vụ',
      dataIndex: 'code',
      key: 'code',
      render: code => {
        return (
          <ActionRow>
            <Tooltip title={'Thông tin account'}>
              <FolderOpenOutlined onClick={() => viewAccounts(code)}/>
            </Tooltip>
            <Divider type={'vertical'}/>
            <Tooltip title={'Phân quyền truy cập'}>
              <ToolOutlined onClick={() => showModal(code)}/>
            </Tooltip>
          </ActionRow>
        )
      },
    },
    {
      title: 'Portal',
      dataIndex: 'commands',
      key: 'commands',
      render: commands => (
        commands.map((item, index) =>
          <Tag key={index}>{item.name}</Tag>,
        )

      ),
    },
  ]
  const columnsInfo = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: username => <span>{username}</span>,
    },
    {
      title: 'Họ tên',
      dataIndex: 'name_lowercase',
      key: 'name_lowercase',
      render: text => <span>{text}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: status => <span>{status ? 'Active' : 'Locked'}</span>,
    },

    {
      title: 'Công ty',
      dataIndex: 'company',
      key: 'company',
      render: company => <span>{company.name}</span>,
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },

    {
      title: 'Tác vụ',
      dataIndex: 'code',
      key: 'code',
      render: code => {
        return (
          <ActionRow>
            <Tooltip title={'Chỉnh sửa'}>
                <span>
                  <EditUser callback={callback} userCode={code}/>
                </span>
            </Tooltip>
            <Divider type="vertical"/>
            <Popconfirm
              title="Bạn chắc chắn muốn xóa user này ?"
              onConfirm={() => confirm(code)}
              onCancel={cancel}
              okType={'danger'}
              okText="Xác nhận"
              icon={<QuestionCircleOutlined style={{ color: 'red' }}/>}
              cancelText="Hủy bỏ">
              <Tooltip title={'Xoá'}>
                <DeleteOutlined style={iconStyle}/>
              </Tooltip>
            </Popconfirm>
          </ActionRow>
        )
      },
    },
  ]

  return (

    data && <Fragment>

      <Table
        rowKey={record => record.code}
        columns={pageName === 'Info' ? columnsInfo : columnsAccount}
        pagination={false}
        showHeader={true}
        dataSource={data}
        scroll={{ x: 800 }}
      />
      <br/>
      {
        pageName === 'Info' &&
        <Pagination
          current={userStore.pageIndex}
          hideOnSinglePage={true}
          onChange={onChange}
          total={userStore.totalUser}
        />
      }
      <ModalUpdateCommands onClose={handleCancel} visible={visible} userCode={currUserCode}/>
    </Fragment>

  )
}

export default inject('userStore', 'accountStore', 'commonStore')(observer(ListUsers))