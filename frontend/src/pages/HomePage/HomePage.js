import React from 'react'
import { Helmet } from 'react-helmet'
import MainLayout from '../../layouts/MainLayout'
import { WelcomeMessage } from './HomePageStyled'

const HomePage = () => {

  return (
    <MainLayout>
      <Helmet>
        <title>Home page | Dashboard</title>
      </Helmet>
      <WelcomeMessage>
        Welcome to Admin Dashboard
      </WelcomeMessage>
    </MainLayout>
  )
}

export default HomePage