
import { Row, Col, Table, Button, Space, App, Input, Spin } from "antd"
import { useState, useRef, useEffect, useCallback } from "react";
import { buttons, columns } from '@/permissions/item'
import { itemApi } from '@/api'
import EditItemModal from './edit'
import MessageModal from "@/components/MessageModal";
import DataGrid from "../../components/DataGrid";
import Paging from "@/components/Paging";

import constant from '@/utils/constant'
const { actionType } = constant

const defaultFilterParameter = {
    pageNo: 1,
    pageSize: 50,
    keyword: ''
}


const { Search } = Input;

const Item = () => {

    const { message } = App.useApp();
    const gridRef = useRef()
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [itemId, setEditItemId] = useState(0);
    const [items, setItems] = useState([])
    const [filterParameter, setFilterParameter] = useState(defaultFilterParameter)
    const [page,setPage] = useState({
        current:1,
        pageSize:50,
        total:0
    })

    const loadItems = async () => {
        let res = await itemApi.pageItems(`pageNo=${filterParameter.pageNo}&pageSize=${filterParameter.pageSize}&keyword=${filterParameter.keyword}`)
        setItems(res.data.items)
        setPage({
            current:res.data.pageNo,
            pageSize:res.data.pageSize,
            total:res.data.totalItems
        })
    }

    useEffect(() => {
        loadItems()
    }, [])

    useEffect(() => {
        loadItems()
    }, [filterParameter])

    const onEditClose = (success) => {
        setShowEditModal(false)
        if (success) {
            loadItems()
        }
    }

    const onMessageModalClose = async (ok) => {
        setShowMessageModal(false)
        if (ok) {
            try {
                let selectedItem = gridRef.current.api.getSelectedRows()[0]
                let res = await itemApi.deleteItem(selectedItem.id)
                console.log(res);
                if (res.status == 204) {
                    message.info('成功删除商品!!');
                    loadItems()
                }
            } catch (e) {
                message.error(`删除失败!! 错误:${e.response.data}`)
            }
        }
    }

    const buttonClick = (type) => {
        switch (type) {
            case actionType.ADD:
                setShowEditModal(true)
                setEditItemId(0)
                break;
            case actionType.EDIT:
                let selectedItem = gridRef.current.api.getSelectedRows()[0]
                if (!selectedItem) {
                    message.info('请选择一条商品数据!!')
                    return
                }
                setShowEditModal(true)
                setEditItemId(selectedItem.id)
                break;
            case actionType.DELETE:                
                let deleteItem = gridRef.current.api.getSelectedRows()[0]
                if (!deleteItem) {
                    message.info('请选择一条商品数据!!')
                    return
                }
                setShowMessageModal(true)
                break;
            default:
                console.log('ddddd');
                break;
        }
    }

    const onSearch = (val) => {
        setFilterParameter({ ...filterParameter, keyword: val })
    }

    return (
        <>
            <Row style={{height:'48px',alignItems:'center'}}>
                <Col>
                    <Search width={800} placeholder="名称/编码" onSearch={onSearch} enterButton />
                </Col>
            </Row>
            <Row style={{height:'48px',alignItems:'center'}}>
                <Col>
                    <Space>
                        {buttons.map((btn, idx) => <Button key={idx} {...btn} onClick={() => buttonClick(btn.action)} >{btn.text}</Button>)}
                    </Space>
                </Col>
            </Row>
            <Row style={{ flexGrow: 1 }}>
                <Col flex="auto" style={{ display: 'flex', flexDirection: 'column' }}>
                    <DataGrid
                        ref={gridRef}
                        rowData={items}
                        columnDefs={columns}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Paging {...page} 
                        onChange={(page, pageSize)=>{
                            console.log(pageSize);
                            setFilterParameter({...filterParameter, pageNo:page,pageSize:pageSize })
                        }}/>
                </Col>                
            </Row>
            {showEditModal ? <EditItemModal id={itemId} onClose={onEditClose} /> : <></>}
            {showMessageModal ? <MessageModal open={showMessageModal} onClose={onMessageModalClose} message="确定删除这条商品数据？" /> : <></>}
        </>
    )

}

export default Item