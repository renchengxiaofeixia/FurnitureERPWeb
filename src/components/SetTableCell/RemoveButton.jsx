import React from 'react'
import { Button } from 'antd'

const RemoveButton = (props) => {
    return <Button type='primary' danger size='small' onClick={() => {
        props.colDef?.callbackFun(props.rowIndex)
    }}>移除</Button>
}
export default RemoveButton