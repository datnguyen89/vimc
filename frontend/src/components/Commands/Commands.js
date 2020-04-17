import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Select } from 'antd'


const Commands = (props) => {
  const { commandStore } = props
  useEffect(() => {
    commandStore.getListCommands()
  }, [])
  const { Option } = Select
  // console.log(commandStore.ListCommands)
  return (
    <Select>
      {/*{*/}
      {/*  commandStore.ListCommands && commandStore.ListCommands.length > 0 && commandStore.ListCommands.map((item, index) =>*/}
      {/*    <Option value={item.code}>{item.code}</Option>,*/}
      {/*  )*/}
      {/*}*/}
      <Option value="jack">Jack</Option>
    </Select>
  )
}

export default inject('commandStore')
observer(Commands)