import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Row, Col, Space, Button, Popconfirm, App } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'


import { PageItems } from '@/Api/item'

import Datagrid from '@/components/Datagrid'
import Paging from '@/components/Paging'
import PopupModal from "@/components/PopupModal"
import TreeCatgories from "@/components/TreeCatgories"
import { itemColumnDefs, subColumnEditItem1 } from '../permission'


const { Search } = Input

// 该组件是输入编号那里的手动输入和点击icon弹出商品多选的组件
const SubItemNoCell = (props) => {
  const { message, modal } = App.useApp();

  let { selectedItem } = useSelector((state) => state.item)

  const [modalVisible, setModalVisible] = useState(false) // 商品编号icon点击弹出商品列表开关
  const [editPopCheckedItems, setEditPopCheckedItems] = useState([]) // 商品编号icon点击弹出商品列表数据
  const [editPopItems, setEditPopItems] = useState([]) // 商品编号icon点击弹出商品列表数据

  const [searchVal, setSearchVal] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    Cate: ''
  })

  const itemGridRef = useRef(null)
  const subGridRef = useRef(null)


  // 排序刷新列表
  const onSortChanged = useCallback(() => {
    itemGridRef.current.api.refreshCells()
  }, [])
  // 选中的规格实时存储,供删除使用
  const onSelectionChanged = useCallback((event) => {
    // 如果已经选择了，则去重，
    const selectedRows = event.api.getSelectedRows()
    const mergeArr = editPopCheckedItems
    const idsArr = editPopCheckedItems.map((one) => one.id)
    selectedRows.forEach((one, index) => {
      if (!idsArr.includes(one.id)) {
        mergeArr.push(one)
      }
    })
    setEditPopCheckedItems([...mergeArr])
  }, [])
  const replaceSubPopItems = () => {
    // 该方式是选择了规格之后去更新规格列表
    editPopCheckedItems.forEach((item) => {
      item.itemNum = '';
    })
    props.api.setRowData([...editPopCheckedItems, ...props.context.subItems])
    props.context.subItems = [...editPopCheckedItems, ...props.context.subItems]
    setModalVisible(false)
  }
  useEffect(() => {
    let data = { keyword: searchVal, pageNo: page.current, pageSize: page.pageSize || 10 }
    modalVisible && getPageItems(data)

  }, [modalVisible, page.current])

  const isRowSelectable = useMemo(() => {
    // 该方法是禁止在弹出规格的选择框里选择本商品和已经添加进去的规格
    let subdata = props.context.subItems
    return (params) => {
      const hasAddedSubItems = subdata.map((one) => one.id)
      return !!params.data && params.data.id !== selectedItem.id && !hasAddedSubItems.includes(params.data.id)
    }
  }, [])

  const onSearchItem = (e) => {
    let data = { keyword: searchVal, pageNo: page.current, pageSize: page.pageSize || 10 }
    // 搜索商品
    getPageItems(data)
  }

  const getPageItems = (data) => {
    setIsLoading(true)
    PageItems(data).then((res) => {
      setEditPopItems(res.data.items)
      setPage({ ...page, total: res.data.totalItems })
      setIsLoading(false)
    })

  }

  // 移除选项
  const removeCheckedItem = (index) => {
    modal.confirm({
      title: '移除',
      icon: <ExclamationCircleOutlined />,
      content: '是否移除该商品',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        editPopCheckedItems.splice(index, 1)
        const cloneArr = JSON.parse(JSON.stringify(editPopCheckedItems))
        setEditPopCheckedItems(cloneArr)
      }
    });
  }

  const itemsGridOptions = {
    rowData: editPopItems,
    rowSelection: 'multiple',
    onSelectionChanged: onSelectionChanged,
    isRowSelectable: isRowSelectable,
    onSortChanged: onSortChanged,
  }

  const subItemsGridOptions = {
    rowData: editPopCheckedItems,
    isRowSelectable: isRowSelectable,
    onSortChanged: onSortChanged,
  }

  const pageOptions = {
    ...page,
    onChange: (pageCurrent) => {
      setPage({ ...page, current: pageCurrent })
    }
  }
  const catgoriesOptions = {
    blockNode: true,
    onSelect: (selectedKeys, { node }) => { //分类搜索
      let data = {
        keyword: searchVal,
        pageNo: page.current,
        pageSize: page.pageSize || 10,
        Cate: node.cateName || ''
      }
      // 分类
      getPageItems(data)
    }
  }
  return (
    <Row align="center" className='flex'>
      <Col span={24}>
        <Space>
          <a href='#'
            onClick={(e) => {
              e.stopPropagation()
              setModalVisible(true)
            }}>选择</a>
          <Popconfirm
            title="移除"
            description="是否移除该商品？"
            cancelText="取消"
            okText="确定"
            onConfirm={(index) => {
              message.destroy()
              props.context.subItems.splice(props.rowIndex, 1)
              props.api.setRowData([...props.context.subItems])
              message.open({
                type: 'warning',
                content: '移除成功！',
              });

            }}
          >
            <a href='#'>移除</a>
          </Popconfirm>
        </Space>
      </Col>

      {modalVisible && (
        <PopupModal title={'选择规格'} open={modalVisible} footer={null} width={'85vw'} onCancel={() => setModalVisible(false)}>
          <Col flex="auto">
            <Row className="flex">
              <TreeCatgories style={{ marginRight: '16px', width: '280px' }} catgoriesOptions={catgoriesOptions} />
              <Col flex="auto">
                <Col span={12} className='mar-bottom'>
                  <Search
                    placeholder="请输入"
                    value={searchVal}
                    onSearch={onSearchItem}
                    enterButton
                    onChange={(e) => setSearchVal(e.target.value.trim())} />
                </Col>
                <Datagrid gridOptions={itemsGridOptions} columnDefs={itemColumnDefs} ref={itemGridRef} style={{ height: '30vh' }} isLoading={isLoading} />
                <Paging pageOptions={pageOptions} />
                <Col span={12} style={{ padding: '16px 0 8px 0', fontWeight: 'bold', fontSize: '16px' }}>
                  待添加的商品规格
                </Col>
                <Datagrid
                  gridOptions={subItemsGridOptions}
                  columnDefs={subColumnEditItem1.map((one) => {
                    if (one.headerName === '操作') {
                      return {
                        ...one,
                        callbackFun: removeCheckedItem
                      }
                    }
                    return one
                  })}
                  ref={subGridRef}
                  style={{ height: '30vh' }} />
              </Col>
            </Row>
            <Col span={24} style={{ display: 'flex', flexDirection: 'column' }} flex="50px">
              <Space size={[16]}>
                <Button
                  onClick={() => {
                    setModalVisible(false)
                  }}
                >
                  取消
                </Button>
                <Button type="primary" onClick={replaceSubPopItems}>
                  确定
                </Button>
              </Space>
            </Col>
          </Col>
        </PopupModal>
      )}
    </Row>
  )
}
export default SubItemNoCell
