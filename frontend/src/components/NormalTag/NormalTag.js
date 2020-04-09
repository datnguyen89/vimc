import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper, Tag, ShowAllTagsButton,
} from './NormalTagStyled'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Tooltip } from 'antd'

const NormalTag = ({ tags = [], commonStore }) => {

  return (
    <Wrapper>
      {
        tags.slice(0, 2).map(tag =>
          <Tooltip key={tag} title={tag}>
            <Tag>
              {tag}
            </Tag>
          </Tooltip>,
        )
      }
      {
        tags.length <= 2
          ? null
          : <ShowAllTagsButton onMouseMove={e => commonStore.setMouseCordinate(e)}>...</ShowAllTagsButton>
      }
      <div className='tag-wrapper' style={{
        left: toJS(commonStore.mouseCordinate.x),
        top: toJS(commonStore.mouseCordinate.y),
      }}>
        {
          tags.map(tag =>
            <Tag key={tag}>
              {tag}
            </Tag>)
        }
      </div>
    </Wrapper>
  )

}

NormalTag.propTypes = {
  tags: PropTypes.array,
}

export default inject('commonStore')(observer(NormalTag))