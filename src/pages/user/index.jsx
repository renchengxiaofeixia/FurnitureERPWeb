
import { Row, Col, Table, Button, Space, App, Input, Spin } from "antd"
import { useState, useRef, useEffect, useCallback } from "react";
import { buttons, columns } from '@/permissions/user'
import { userApi } from '@/api'
import EditUserModal from './edit'
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

const User = () => {

    const { message } = App.useApp();
    const gridRef = useRef()
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [userId, setEditUserId] = useState(0);
    const [users, setUsers] = useState([])
    const [filterParameter, setFilterParameter] = useState(defaultFilterParameter)
    const [page,setPage] = useState({
        current:1,
        pageSize:50,
        total:0
    })

    const loadUsers = async () => {
        let res = await userApi.pageUsers(`pageNo=${filterParameter.pageNo}&pageSize=${filterParameter.pageSize}&keyword=${filterParameter.keyword}`)
        setUsers(res.data.items)
        setPage({
            current:res.data.pageNo,
            pageSize:res.data.pageSize,
            total:res.data.totalItems
        })
    }

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        loadUsers()
    }, [filterParameter])

    const onEditClose = (success) => {
        setShowEditModal(false)
        if (success) {
            loadUsers()
        }
    }

    const onMessageModalClose = async (ok) => {
        setShowMessageModal(false)
        if (ok) {
            try {
                let selectedUser = gridRef.current.api.getSelectedRows()[0]
                let res = await userApi.deleteUser(selectedUser.id)
                console.log(res);
                if (res.status == 204) {
                    message.info('成功删除用户!!');
                    loadUsers()
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
                setEditUserId(0)
                break;
            case actionType.EDIT:
                let selectedUser = gridRef.current.api.getSelectedRows()[0]
                if (!selectedUser) {
                    message.info('请选择一条用户数据!!')
                    return
                }
                setShowEditModal(true)
                setEditUserId(selectedUser.id)
                break;
            case actionType.DELETE:
                
                let deleteUser = gridRef.current.api.getSelectedRows()[0]
                if (!deleteUser) {
                    message.info('请选择一条用户数据!!')
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
                    <Search width={800} placeholder="用户名" onSearch={onSearch} enterButton />
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
                        rowData={users}
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
            {showEditModal ? <EditUserModal id={userId} onClose={onEditClose} /> : <></>}
            {showMessageModal ? <MessageModal open={showMessageModal} onClose={onMessageModalClose} message="确定删除这条用户数据？" /> : <></>}
        </>
    )

}

export default User