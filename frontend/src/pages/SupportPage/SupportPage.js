import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import MainLayout from '../../layouts/MainLayout'
import { inject, observer } from 'mobx-react'
import PageHeading from '../../components/PageHeading'
import BlockWrapper from '../../components/BlockWrapper'
import BlockHeading from '../../components/BlockHeading'
import { Collapse, Empty, Button, Modal } from 'antd'
import { FAQWrapper, StyledSearch } from './SupportPageStyled'
import { FAQRequest } from '../../requests'

const { Panel } = Collapse

const SupportPage = props => {

  const {
    faqStore, loadingAnimationStore,
  } = props

  useEffect(() => {
    loadingAnimationStore.showSpinner(true)
    faqStore.getFAQData()
      .finally(() => loadingAnimationStore.showSpinner(false))
  }, [])
  const handleAdd = () => {
    // FAQRequest.addFAQ("What's that","It's FAQ content")
  }
  const [visible,setVisible] = useState(false)
  return (
    <MainLayout>
      <Helmet>
        <title>Support | Dashboard</title>
      </Helmet>
      <PageHeading title={'Support'}>
        <StyledSearch placeholder={'Search your question here'}/>
      </PageHeading>
      <BlockWrapper>
        <FAQWrapper>
          <Button onClick={handleAdd}>Add</Button>
          <BlockHeading heading={'Frequently asked questions'}/>
          <Collapse
            expandIconPosition={'right'}
            defaultActiveKey={['0']} accordion>
            {
              faqStore.faqList.length === 0
                ? <Empty/> :
                faqStore.faqList.map((item, index) =>
                  <Panel
                    header={`${index + 1}. ${item.title}`}
                    key={index}>
                    <p>{item.content}</p>
                  </Panel>,
                )
            }
          </Collapse>
        </FAQWrapper>
      </BlockWrapper>

      <Modal
        title="Add more FAQ"
        visible={visible}
        onOk={handleOk}
        onCancel={this.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </MainLayout>
  )

}

export default inject('faqStore', 'loadingAnimationStore')(observer(SupportPage))