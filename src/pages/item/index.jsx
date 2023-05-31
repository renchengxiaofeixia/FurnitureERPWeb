import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { DownOutlined, SettingFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Row, Space, Button, Dropdown, App, Input, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux'


import Datagrid from '@/components/Datagrid'
import Paging from '@/components/Paging'
import DrawerFilter from './components/DrawerFilter';
import ContentFooter from './components/ContentFooter';
import EditItemPopup from './components/EditItemPopup';
import BatchEditPopup from './components/BatchEditPopup';

import { itemColumnDefs, batchOperate } from './permission'
import { changeEditPopupOpen, SubAsync, setItem, delAsync, loadAsync, RestoreItemAsync, GetItemAsync } from '@/store/modules/item'

const { Search } = Input;
const item = () => {
  const dispatch = useDispatch()
  const { message, modal } = App.useApp();

  const refContent = useRef();
  const gridRef = useRef()
  let { items, page, isOpenEditPopup } = useSelector((state) => state.item);
  let [checkedItem, setCheckedItem] = useState({})
  let [offsetHeight, setOffsetHeight] = useState('');
  let [lateralOpen, setLateralOpen] = useState(true)
  let [isShowBatch, setIsShowBatch] = useState(false)

  useEffect(() => {
    setOffsetHeight(refContent.current.offsetHeight - 100)
  }, []);

  const btnOptions = {
    add: {
      // icon: <DownOutlined />,
      onClick: () => {
        dispatch(changeEditPopupOpen({
          props: 'add',
          isPopup: true
        }))
        dispatch(setItem({}))
      }
    },
    edit: {
      onClick: () => {
        message.destroy()
        if (!gridRef.current.api.getSelectedRows()[0]) {
          return message.open({
            type: 'warning',
            content: '请选择商品！',
          });
        }
        if (gridRef.current.api.getSelectedRows().length != 1) {
          return message.open({
            type: 'warning',
            content: '请选择单个商品！',
          });
        }
        dispatch(changeEditPopupOpen({
          props: 'change',
          isPopup: true
        }))
        dispatch(setItem(checkedItem))
        dispatch(GetItemAsync(checkedItem.id))
      }
    },
    del: {
      danger: true,
      onClick: () => {
        message.destroy()
        if (!gridRef.current.api.getSelectedRows()[0]) {
          return message.open({
            type: 'warning',
            content: '请选择商品！',
          });
        }

        modal.confirm({
          title: '删除',
          icon: <ExclamationCircleOutlined />,
          content: '是否确定删除',
          okText: '确认',
          cancelText: '取消',
          centered: true,
          onOk: () => {
            setCheckedItem({})
            let checkedData = gridRef.current.api.getSelectedRows();
            checkedData.forEach((item) => {
              dispatch(delAsync(item.id))
            })
            message.open({
              type: 'success',
              content: '已移至回收站！',
            });
          }
        });
      }
    },
    restore: {
      onClick: () => {
        message.destroy()
        if (!gridRef.current.api.getSelectedRows()[0]) {
          return message.open({
            type: 'warning',
            content: '请选择商品！',
          });
        }
        modal.confirm({
          title: '回收站',
          icon: <ExclamationCircleOutlined />,
          content: '恢复商品至原来的目录',
          okText: '确认',
          cancelText: '取消',
          centered: true,
          onOk: () => {
            let nodes = gridRef.current.api.getRenderedNodes()
            nodes.forEach((item) => {
              if (item.selected) {
                let data = JSON.parse(JSON.stringify(item.data));
                data.status = 'Using';
                dispatch(RestoreItemAsync(data.id, data))
              }
            });
            message.open({
              type: 'success',
              content: '恢复成功！',
            });
          }
        });
      }
    },
    search: {
      placeholder: "输入名称或编码",
      allowClear: true,
      onSearch: (val) => {
        dispatch(loadAsync({
          pageNo: 1,
          pageSize: page.pageSize,
          keyword: val
        }))
      }
    },
    batch: {
      icon: <DownOutlined />,
      menu: {
        items: batchOperate,
        onClick: () => {
          console.log('menu click')
        }
      },
      onClick: (item) => {
        setIsShowBatch(true)

      }
    }
  }

  const gridOptions = {
    rowSelection: 'multiple',
    onRowClicked: useCallback((params) => {
      setCheckedItem(params.data)
      dispatch(SubAsync(params.data.id))
    }),
    onSortChanged: useCallback(() => {
      gridRef.current.api.refreshCells();
    }, []),
    onGridReady: useCallback((params) => {
      dispatch(loadAsync({
        pageNo: 1,
        pageSize: page.pageSize,
        keyword: ""
      }))
    }, []),
    onSelectionChanged: useCallback((params) => {
      // 优化选择表格的逻辑，原写法会导致id重合并无取消选择判断
      const selectedRows = gridRef.current.api.getSelectedRows();
      setCheckedItem(selectedRows[0] || {})
      if (selectedRows.length == 0) return
      if (!selectedRows[0]) {
        dispatch(setSubItems([]))
      } else {
      }
    }, []),
    navigateToNextCell: useCallback((params) => {
      const suggestedNextCell = params.nextCellPosition;
      if (!suggestedNextCell || suggestedNextCell.rowIndex < 0) return
      params.api.forEachNode(node => {
        if (node.rowIndex === suggestedNextCell.rowIndex) {
          node.setSelected(true);
        }
      });

      return suggestedNextCell;
    }),
    selectAll: (params) => {
      console.log(params);
    }
  }

  const pageOptions = {
    ...page,
    onChange: (pageNo, pageSize) => {
      dispatch(loadAsync({
        pageNo: pageNo,
        pageSize: pageSize,
        keyword: ""
      }))
    }
  }

  return (
    <Row style={{ display: 'flex', flexDirection: 'column', flex: '1', padding: '0 10px' }}>
      <Col flex="40px">
        <Row >
          <Col style={{ width: '290px', fontSize: '20px', fontWeight: '600' }}>
            <span>商品审核</span> <SettingFilled />
          </Col>
          <Col>
            <Search
              {...btnOptions.search}
            />
          </Col>
        </Row>
      </Col>
      <Col flex="auto" style={{ display: 'flex' }} >
        <Row style={{ flex: '1' }}>
          <DrawerFilter lateralOpen={lateralOpen} setLateralOpen={setLateralOpen} />
          <Col flex="auto" style={{ display: 'flex' }}>
            <Row style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
              <Col flex="50px" >
                {page.Status ?
                  (<Space size={[10]}>
                    <Button
                      {...btnOptions.restore}
                    >还原</Button>
                  </Space>) :
                  (<Space size={[10]}>
                    <Button
                      {...btnOptions.add}
                    >新增</Button>
                    <Button
                      {...btnOptions.edit}
                    >修改</Button>
                    <Button
                      {...btnOptions.del}
                    >删除</Button>

                    <Dropdown.Button
                      {...btnOptions.batch}
                    >
                      批量
                    </Dropdown.Button>
                  </Space>)}
              </Col>
              <Col flex="auto" style={{ display: 'flex' }}>
                <Row style={{ flex: '1', flexDirection: 'column' }} ref={refContent}>
                  <Datagrid
                    rowData={items}
                    columnDefs={itemColumnDefs}
                    ref={gridRef}
                    blankCell
                    gridOptions={gridOptions} />
                  <Col>
                    <Paging pageOptions={pageOptions} />
                    <ContentFooter offsetHeight={offsetHeight} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col >
      <EditItemPopup isOpenEditPopup={isOpenEditPopup} ids={checkedItem.id} />
      <BatchEditPopup isShowBatch={isShowBatch} setIsShowBatch={setIsShowBatch} />
    </Row >
  )
}

export default item