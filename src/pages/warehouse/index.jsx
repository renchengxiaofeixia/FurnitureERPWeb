
import { Row, Col, Table, Button, Space, App, Input, Spin } from "antd"
import { useState, useRef, useEffect, useCallback } from "react";
import { buttons, columns } from '@/permissions/warehouse'
import { warehouseApi } from '@/api'
import EditWarehouseModal from './edit'
import MessageModal from "@/components/modal";
import DataGrid from "@/components/Datagrid";
import constant from '@/utils/constant'
const { actionType } = constant

const Warehouse = () => {
    const { message } = App.useApp();
    const gridRef = useRef()
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [id, setEditId] = useState(0);
    const [ets, setEts] = useState([])

    const loadWarehouses = async () => {
        let res = await warehouseApi.getWarehouses()
        setEts(res.data)
    }

    useEffect(() => {
        loadWarehouses()
    }, [])

    const onEditClose = (success) => {
        setShowEditModal(false)
        if (success) {
            loadWarehouses()
        }
    }
    const getSelectedRow = () => {
        return gridRef.current.api.getSelectedRows()[0];
    }

    const setSelectId = () => {
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
                if (setSelectId())
                    setShowEditModal(true)
                break;
            case actionType.DELETE:
                if (setSelectId())
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
                let res = await warehouseApi.deleteWarehouse(selectedRow.id)
                console.log(res);
                if (res.status == 204) {
                    message.info('成功删除仓库!!');
                    loadWarehouses()
                }
            } catch (e) {
                message.error(`删除失败!! 错误:${e.response.data}`)
            }
        }
    }



    return (
        <Row style={{ flex: '1', flexDirection: 'column', padding: '0 10px' }}>
            <Col flex="40px" style={{ alignItems: "center" }}>
                <Space>
                    {buttons.map((btn, idx) => <Button key={idx} {...btn} onClick={() => buttonClick(btn.action)} >{btn.text}</Button>)}
                </Space>
            </Col>

            <DataGrid
                ref={gridRef}
                rowData={ets}
                columnDefs={columns}
            />

            {showEditModal ? <EditWarehouseModal id={id} onClose={onEditClose} /> : <></>}
            {showMessageModal ? <MessageModal open={showMessageModal} onClose={onMessageModalClose} message="确定删除这条仓库数据？" /> : <></>}
        </Row >
    )

}

export default Warehouse