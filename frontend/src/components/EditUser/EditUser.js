import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button, Form, Input } from 'antd'
import {
  EditOutlined
} from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import {
  Hidden,
  EditUserWrap,
  FormWrapper,
} from './EditUserStyled'
import { toJS } from 'mobx'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const EditUser = props => {
  const [visible, setVisible] = useState(false)
  const { userStore, loadingAnimationStore, dataUser, userCode, history, callback } = props
  let data = dataUser.filter(item => item.code === userCode)
  const showModal = () => {
    setVisible(true)

  }
  const handleCancel = e => {
    setVisible(false)
  }
  const onFinish = values => {
    console.log(values)
    const { company_code, code, name, phone } = values
    let option = Object.assign({}, { company_code: company_code, name: name, phone: phone })
    loadingAnimationStore.showSpinner(true)
    userStore.editUser(code, option)
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
    <EditUserWrap>
      {

        <a onClick={showModal}>
          <EditOutlined />
        </a>
      }

      <Modal
        title={'Sửa thông tin User'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <FormWrapper>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              company_code: 'CPN7451091748209',
              code: userCode,
              name: data[0].name_lowercase,
              phone: data[0].phone,
            }}
            onFinish={onFinish}
          >
            <Hidden>
              <Form.Item
                {...tailLayout}
                label="company_code"
                name="company_code"
              >
                <Input/>
              </Form.Item>
              <Form.Item
                {...tailLayout}
                label="code"
                name="code"
              >
                <Input/>
              </Form.Item>
            </Hidden>

            <Form.Item
              {...tailLayout}
              label="Họ tên"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              {...tailLayout}
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Please input your username!' }]}
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

    </EditUserWrap>
  )
}

EditUser.propTypes = {
  callback: PropTypes.func,
  userCode: PropTypes.string,
  dataUser: PropTypes.array,
}

export default withRouter(inject('userStore', 'loadingAnimationStore')(observer(EditUser)))