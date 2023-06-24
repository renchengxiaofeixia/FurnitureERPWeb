import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Col, Row, Space, App } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import Datagrid from '@/components/Datagrid'
import { subColumnEditItem } from '../permission'


import {
  ProductInfoByItemNo
} from '@/Api/item'

import styles from "../index.module.scss"
// 该组件是编辑商品对应规格的组件
const SubItemsEditPop = () => {
  const gridRef = useRef();
  const { message, modal } = App.useApp();
  const [subItems, setSubItems] = useState([])

  const addSubItem = () => {
    const emptySubItem = {
      index: subItems.length,
      picPath: '',
      itemName: '',
      itemNo: '',
      itemNum: '',
      packageQty: ''

    }
    let subData = []
    gridRef.current.api.forEachNode(function (node, index) {
      subData.push(node.data)
    });
    subData = [...subData, emptySubItem]
    setSubItems(subData)

  }

  const gridOptions = {
    rowData: subItems,
    stopEditingWhenCellsLoseFocus: true,
    context: {
      subItems: subItems
    },
    onCellEditingStopped: useCallback(async (event) => {
      let subData = []
      gridRef.current.api.forEachNode(function (node, index) {
        subData.push(node.data)
      });
      message.destroy()
      let itemFilter = subData.filter(((k, idx) => {
        k.rowIndex = idx
        return k.itemNo == event.value
      }))
      let itemOpen = itemFilter.find((k) => k.itemNo == event.value && k.rowIndex != event.rowIndex)
      console.log(itemOpen);
      if (itemOpen && itemOpen.itemNo) {
        message.open({
          type: 'warning',
          content: '已存在该商品,请重新输入！',
        });
        subData[event.rowIndex].itemNo = ""
        event.api.setRowData(subData)
        return
      }

      if (event.colDef.field === "itemNo") {
        if (event.value == '') {
          message.open({
            type: 'warning',
            content: '商品编码错误！',
          });
          return
        }
        ProductInfoByItemNo(event.value).then((res) => {
          let data = { ...event.data, ...res.data }
          subData[event.rowIndex] = data
          setSubItems([...subData])
        }).catch(() => {
          message.open({
            type: 'warning',
            content: '商品编码不存在！',
          });
        })
      } else {
        subData[event.rowIndex] = event.data
        setSubItems([...subData])
      }
    }, [])
  }
  return (
    <>
      <Datagrid gridOptions={gridOptions} columnDefs={subColumnEditItem} ref={gridRef} className={styles.item_sub_edit_table} />
      <div className={styles.item_sub_edit_add} onClick={addSubItem}>
        <PlusOutlined />
        <span>添加一行数据</span>
      </div>
    </>
  )
}

export default SubItemsEditPop
