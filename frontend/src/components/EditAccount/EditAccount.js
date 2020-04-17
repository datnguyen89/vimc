import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import {
  EditOutlined,
} from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import {
  Hidden,
  EditAccountWrap,
  FormWrapper,
} from './EditAccountStyled'
import { toJS } from 'mobx'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const EditAccount = props => {
  const [visible, setVisible] = useState(false)
  const { accountStore, loadingAnimationStore, dataAccount, callback} = props

  const showModal = () => {
    setVisible(true)

  }
  const handleCancel = e => {
    setVisible(false)
  }
  const onFinish = values => {
    console.log(values)
    const { id, account_name, password } = values
    let option = Object.assign({}, { account_name: account_name, password: password})
    loadingAnimationStore.showSpinner(true)
    accountStore.editAccount(id, option)
      .then((response) => {
        if (response.status !== 200) return
        setVisible(false)
        callback && callback()
      })
      .finally(() => {
        loadingAnimationStore.showSpinner(false)
      })

  }
  const layout = {
    labelCol: { span: 6 },
    // wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 0, span: 18 },
  }
  return (
    <EditAccountWrap>
      {

        <span onClick={showModal}>
          <EditOutlined/>
        </span>
      }

      <Modal
        title={'Sửa thông tin Account'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <FormWrapper>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              id: dataAccount.id,
              account_name: dataAccount.account_name,
              password: dataAccount.password,
            }}
            onFinish={onFinish}
          >
            <Hidden>
              <Form.Item
                {...tailLayout}
                label="id"
                name="id"
              >
                <Input/>
              </Form.Item>

            </Hidden>

            <Form.Item
              {...tailLayout}
              label="Account"
              name="account_name"
              rules={[{ required: true, message: 'Please input your accountname!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              {...tailLayout}
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Please input your accountname!' }]}
            >
              <Input/>
            </Form.Item>


            <Form.Item
              {...tailLayout} >
              <Button type="primary" htmlType="submit">
                {'Chỉnh sửa'}
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>

      </Modal>

    </EditAccountWrap>
  )
}

EditAccount.propTypes = {
  callback: PropTypes.func,
  accountCode: PropTypes.string,
  dataAccount: PropTypes.object,
}

export default withRouter(inject('accountStore', 'loadingAnimationStore')(observer(EditAccount)))