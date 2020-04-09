import React, { useEffect, useState, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import MainLayout from '../../layouts/MainLayout'
import breadcrumbs from './breadcrumbs'
import { inject, observer } from 'mobx-react'
import PageHeading from '../../components/PageHeading'
import BlockWrapper from '../../components/BlockWrapper'
import { Form, Select, Row, Col, Button, message } from 'antd'
import {
  BlockHeading,
  UserInfoWrapper,
  UserInfoHeader,
  AvatarWrapper,
  ActionWrapper,
  AppSettingWrapper,
} from './SettingsPageStyled'
import UserInfoContent from './UserInfoContent'
import UserInfoEdit from './UserInfoEdit'

const { Option } = Select

const SettingsPage = props => {

  const { commonStore, userStore, history, loadingAnimationStore } = props
  const [editMode, setEditMode] = useState(false)

  const Divider = () => <div style={{ marginBottom: 30 }}/>

  const handleThemeChange = themeName => {
    commonStore.setTheme(themeName)
    let userId = userStore.currentUser && userStore.currentUser.id
    loadingAnimationStore.showSpinner(true)
    userStore.updateUserInfo(userId, { theme: themeName })
      .finally(() => {
        message.success(`Theme changed`)
        loadingAnimationStore.showSpinner(false)
      })
  }

  const handleLogout = () => {
    userStore.userLogout()
      .finally(() => history.push('/login'))
  }

  useEffect(() => setEditMode(false), [])

  return (
    <MainLayout>
      <Helmet>
        <title>Settings | Dashboard</title>
      </Helmet>
      <PageHeading
        title={'Settings'}
        breadcrumbs={breadcrumbs}/>
      <BlockWrapper>
        <UserInfoWrapper>
          <UserInfoHeader>
            <AvatarWrapper>
              <div className="img">
                <img src={`${process.env.PUBLIC_URL}/assets/imgs/default-avatar.jpg`} alt=""/>
              </div>
              <div className="info">
                <p>{userStore.currentUser.firstName} {userStore.currentUser.lastName}</p>
                <a onClick={() => handleLogout()}>
                  Logout <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAYCAYAAADpnJ2CAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGjSURBVHgB3ZZdTsJAEMdnFkhAjOIJrCcQEjG+WSAmvskN1Bt4BI+gJxBv4KOJAcqTH32AI9QbEEQ0bbbjTgMIpGmlLT7wT9rubmf3l9md2V0cVg+uAPEMYgoBrXzz7TLUblg7JEhKkkqbhtkLMklPCgTURxCBxr4iKij3ilxMIWyHmU+BgvAh33oNnZJFDarlCwF491d7Af+s9QEOT8rFr9MjDZIGStcxVMRZ/HyT8+7B1LqCi13XcduL0DTE1I7Rs9Rnb7ZNqGh1gSMftDG0knt8sbx/sAJtNM1bF+ge5qEa1wM9JF0vfIjPOkQRgYEIxwyc9TQQOEqNuirHNIgomi970MAppeQ2vel4gR46rl3JZnK7EFFSypvJtsdRzOMFAscRaEEEDWrlhkCcg/F4sdPCT14eAp4vwrgaG8jhLh3ZVedh35Z2SQ3c5xwUPjCABPLQsaWuvClwFGYxs89tWy2zkRIpXcFKszDWSqaUlXt67vi1r//x9HvFQKqr+40OS0tdMaIAeeHVa6nO435LWafVBntNhDrEFKpLWK5tdsLsfgBuL7TET31YoQAAAABJRU5ErkJggg=="
                  alt="Logout"/>
                </a>
              </div>
            </AvatarWrapper>
            <ActionWrapper>
              {
                editMode
                  ? (
                    <Fragment>
                      <Button type={'primary'} form={'userInfoForm'} key="submit" htmlType="submit">Save changes</Button>
                      <Button onClick={() => setEditMode(false)}>Cancel</Button>
                    </Fragment>
                  )
                  : <Button type={'primary'} onClick={() => setEditMode(true)}>Edit information</Button>
              }
            </ActionWrapper>
          </UserInfoHeader>
          {
            editMode
              ? (
                <Fragment>
                  <BlockHeading>Update personal information</BlockHeading>
                  <UserInfoEdit onSave={() => setEditMode(false)}/>
                </Fragment>
              )
              : (
                <Fragment>
                  <BlockHeading>Personal information</BlockHeading>
                  <UserInfoContent/>
                </Fragment>
              )
          }
        </UserInfoWrapper>
      </BlockWrapper>
      <Divider/>
      <BlockWrapper>
        <AppSettingWrapper>
          <BlockHeading>App settings</BlockHeading>
          <Form layout={'vertical'}>
            <Row type={'flex'} justify={'space-between'}>
              <Col xs={24} md={11}>
                <Form.Item label={'Change theme'}>
                  {
                    userStore.currentUser.hasOwnProperty('theme')
                      ? (
                        <Select
                          defaultValue={userStore.currentUser.theme || 'green'}
                          onChange={val => handleThemeChange(val)}
                          showSearch={true}>
                          <Option value={'green'}>Green</Option>
                          <Option value={'blue'}>Blue</Option>
                          <Option value={'pink'}>Pink</Option>
                          <Option value={'csstricks'}>CSS Tricks ^^</Option>
                          <Option value={'black'}>Black</Option>
                        </Select>
                      ) : null
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </AppSettingWrapper>
      </BlockWrapper>
    </MainLayout>
  )
}

export default inject('commonStore', 'userStore', 'loadingAnimationStore')(observer(SettingsPage))