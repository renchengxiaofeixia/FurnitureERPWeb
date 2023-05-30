
import { Row, Col, Table, Button, Space, App, Input, Spin } from "antd"
import { useState, useRef, useEffect, useCallback } from "react";
import { buttons, columns } from '@/permissions/shop'
import { shopApi } from '@/api'
import EditShopModal from './edit'
import MessageModal from "@/components/modal";
import DataGrid from "../../components/datagrid";
import constant from '@/utils/constant'
const { actionType } = constant

const Shop = () => {
    const { message } = App.useApp();
    const gridRef = useRef()
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [id, setEditId] = useState(0);
    const [ets, setEts] = useState([])

    const loadShops = async () => {
        let res = await shopApi.getWarehouses()
        setEts(res.data)
    }

    useEffect(() => {
        loadShops()
    }, [])

    const onEditClose = (success) => {
        setShowEditModal(false)
        if (success) {
            loadShops()
        }
    }
    const getSelectedRow = ()=>{
        return gridRef.current.api.getSelectedRows()[0];
    }

    const setSelectId = ()=>{
        let selectedRow = getSelectedRow()
        if (!selectedRow) {
            message.info('请选择一条数据修改!!')
            return false
        }
        setEditId(selectedRow.id)
        return true
    }

    const buttonClick = (type) => {
        switch (type) {
            case actionType.ADD:
                setShowEditModal(true)
                setEditId(0)
                break;
            case actionType.EDIT:
                if(setSelectId())
                    setShowEditModal(true)
                break;
            case actionType.DELETE:
                if(setSelectId())
                    setShowMessageModal(true)
                break;
            default:
                console.log('ddddd');
                break;
        }
    }



    const onMessageModalClose = async (ok) => {
        setShowMessageModal(false)
        if (ok) {
            try {
                let selectedRow = gridRef.current.api.getSelectedRows()[0]
                let res = await shopApi.deleteShop(selectedRow.id)
                console.log(res);
                if (res.status == 204) {
                    message.info('成功删除店铺!!');
                    loadShops()
                }
            } catch (e) {
                message.error(`删除失败!! 错误:${e.response.data}`)
            }
        }
    }



    return (
        <>
            <Row style={{ height: '48px', alignItems: "center" }}>
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
                        rowData={ets}
                        columnDefs={columns}
                    />
                </Col>
            </Row>
            
            {showEditModal ? <EditShopModal id={id} onClose={onEditClose} /> : <></>}
            {showMessageModal ? <MessageModal open={showMessageModal} onClose={onMessageModalClose} message="确定删除这条店铺数据？" /> : <></>}
        </>
    )

}

export default Shop