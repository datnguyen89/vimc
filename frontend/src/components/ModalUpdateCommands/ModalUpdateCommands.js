import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Button, Form, Input, Select, Row, Col } from 'antd'
import {
  EditOutlined,
} from '@ant-design/icons'
import { inject, observer } from 'mobx-react'
import {
  Hidden,
  EditUserWrap,
  FormWrapper,
} from './ModalUpdateCommandsStyled'
import { toJS } from 'mobx'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import validator from '../../validator'

const EditUser = props => {
  const { userStore, visible, userCode ,commandStore, onClose} = props
  const { Option } = Select

  const onFinish = values => {
    const commandList = values.commands.map(item => {
      return {
        code: item,
      }
    })
    const submitValues = {
      ...values,
      commands: commandList,
    }
    console.log(submitValues)
    // const { code } = submitValues
    // loadingAnimationStore.showSpinner(true)
    // userStore.editUser(code, submitValues)
    //   .then((response) => {
    //     if (response.status !== 200) return
    //     setVisible(false)
    //     callback && callback()
    //   })
    //   .finally(() => {
    //     loadingAnimationStore.showSpinner(false)
    //   })

  }
  let initialCommands = []
  const [formValue, setFormValue] = useState()
  useEffect(() => {
    userStore.getUserByCode(userCode)
      .then((response) => {

        if (response) {
          const { data } = response
          const { commands } = data
          commands.map(item => {
              return initialCommands.push(item.code)
            },
          )

          let retVal = Object.assign({}, {
            code: userCode,
            commands: initialCommands,
          })
          setFormValue(retVal)
        }
      })
  }, [userCode])
  useEffect(() => {
    console.log(formValue)
  }, [])

  return (

    <EditUserWrap>


      <Modal
        title={'Sửa thông tin User'}
        visible={visible}
        onCancel={()=>{onClose(false)}}
        footer={null}
      >
        <FormWrapper>
          <Form
            layout={'vertical'}
            name="basic"
            initialValues={formValue}
            onFinish={onFinish}
          >

            <Form.Item
              label="Hệ thống"
              name="commands">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Chọn hệ thống"
                rules={[
                  { required: true, message: 'Hãy chọn hệ thống!' },
                ]}>
                {
                  commandStore.ListCommands.map(item => {
                    return (
                      <Option key={item.code} value={item.code}>
                        {item.name}
                      </Option>
                    )
                  })
                }
              </Select>
            </Form.Item>

            <Hidden>
              <Form.Item
                label="code"
                name="code"
              >
                <Input/>
              </Form.Item>
            </Hidden>
            {/*<Form.Item*/}
            {/*  label="Hệ thống"*/}
            {/*  name="commands">*/}
            {/*  <Select*/}
            {/*    mode="multiple"*/}
            {/*    style={{ width: '100%' }}*/}
            {/*    placeholder="Chọn hệ thống"*/}
            {/*    rules={[*/}
            {/*      { required: true, message: 'Hãy chọn hệ không được để trống!' },*/}
            {/*    ]}>*/}
            {/*    {*/}
            {/*      commandStore.ListCommands.map(item => {*/}
            {/*        return (*/}
            {/*          <Option key={item.code} value={item.code}>*/}
            {/*            {item.name}*/}
            {/*          </Option>*/}
            {/*        )*/}
            {/*      })*/}
            {/*    }*/}
            {/*  </Select>*/}
            {/*</Form.Item>*/}

            <Form.Item>
              <Row type={'flex'} justify={'space-between'} gutter={10}>
                <Col span={12}>
                  <Button type="primary" htmlType="submit" block>
                    {'Sửa'}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button onClick={() => onClose(false)} block>
                    Huỷ
                  </Button>
                </Col>
              </Row>
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

export default withRouter(inject('commandStore', 'userStore', 'loadingAnimationStore', 'companiesStore')(observer(EditUser)))