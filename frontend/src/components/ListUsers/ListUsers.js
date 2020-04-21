import React, { Fragment, useState, useEffect } from 'react'
import { Table } from 'antd'
import { Pagination, Popconfirm, Divider, Tooltip, Tag } from 'antd'
import {
  DeleteOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import EditUser from '../../components/EditUser'
import accountStore from '../../stores/accountStore'
import { ActionRow } from './ListUsersStyled'
import { QuestionCircleOutlined } from '@ant-design/icons'

const ListUsers = (props) => {
  const { header, paging, edit, userStore, accountStore, viewInfo, viewCommand } = props
  const pageSize = 10
  const [pageIndex, setPageIndex] = useState(0)

  const iconStyle = {
    color: '#fc0000',
  }

  useEffect(() => {
    userStore.getlistUsers(pageIndex, pageSize)
  }, [pageIndex])

  let data = null
  let total_page = 0

  if (userStore.ListUsers) {
    data = userStore.ListUsers.data
    total_page = userStore.ListUsers.total_page
  }

  const callback = () => {
    userStore.getlistUsers(0, pageSize)
  }

  const onChange = page => {
    setPageIndex(page)
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

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'name_lowercase',
      key: 'name_lowercase',
      render: text => <span>{text}</span>,
    },
    viewInfo ?
      {
        title: 'Công ty',
        dataIndex: 'company',
        key: 'company',
        render: company => <span>{company.name}</span>,
      } : {},
    viewInfo ?
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      } : {},
    viewInfo ?
      {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
      } : {},
    viewCommand ?
      {
        title: 'Portal',
        dataIndex: 'commands',
        key: 'commands',
        render: commands => (
         commands.map((item,index)=>
           <Tag key={index}>{item.name}</Tag>
         )

        ),
      } : {},
    edit ?
      {
        title: 'Tác vụ',
        dataIndex: 'code',
        key: 'code',
        render: code => {
          return (
            <ActionRow>
              <Tooltip title={'Chỉnh sửa'}>
                <span>
                  <EditUser dataUser={toJS(data)} callback={callback} userCode={code}/>
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
      } :
      {
        title: 'Tác vụ',
        dataIndex: 'code',
        key: 'code',
        render: code => <FolderOpenOutlined onClick={() => viewAccounts(code)}/>,
      },
  ]


  return (

    data && <Fragment>

      <Table
        rowKey={record => record.code}
        columns={columns}
        pagination={false}
        showHeader={header}
        dataSource={data}
        scroll={{ x: 700 }}
      />
      <br/>
      {
        paging &&
        <Pagination
          current={pageIndex}
          hideOnSinglePage={true}
          onChange={onChange}
          total={total_page}
        />
      }
    </Fragment>

  )
}

export default inject('userStore', 'accountStore', 'commonStore')(observer(ListUsers))