
import { Row, Col, Table, Button, Space, App, Input, Spin } from "antd"
import { useState, useRef, useEffect, useCallback } from "react";
import { buttons, columns } from '@/permissions/role'
import { roleApi } from '@/api'
import EditRoleModal from './edit'
import RoleUserModal from "./roleuser";
import RolePermitModal from "./rolepermit";
import MessageModal from "@/components/MessageModal";
import DataGrid from "../../components/datagrid";
import constant from '@/utils/constant'
import Paging from "@/components/Paging";

const { actionType } = constant

const defaultFilterParameter = {
    pageNo: 1,
    pageSize: 50,
    keyword: ''
}


const { Search } = Input;

const Role = () => {
    const { message } = App.useApp();
    const gridRef = useRef()
    const [showEditModal, setShowEditModal] = useState(false);
    const [showRoleUserModal, setShowRoleUserModal] = useState(false);
    const [showRolePermitModal, setShowRolePermitModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [roleId, setEditRoleId] = useState(0);
    const [roleName, setRoleName] = useState('');
    const [roles, setRoles] = useState([])
    const [filterParameter, setFilterParameter] = useState(defaultFilterParameter)
    const [page,setPage] = useState({
        current:1,
        pageSize:50,
        total:0
    })

    const loadRoles = async () => {
        let res = await roleApi.pageRoles(`pageNo=${filterParameter.pageNo}&pageSize=${filterParameter.pageSize}&keyword=${filterParameter.keyword}`)
        setRoles(res.data.items)
        setPage({
            current:res.data.pageNo,
            pageSize:res.data.pageSize,
            total:res.data.totalItems
        })
    }

    useEffect(() => {
        loadRoles()
    }, [])

    useEffect(() => {
        loadRoles()
    }, [filterParameter])

    const onEditClose = (success) => {
        setShowEditModal(false)
        if (success) {
            loadRoles()
        }
    }

    const onRoleUserClose = (success) => {
        setShowRoleUserModal(false)
        if (success) {
            loadRoles()
        }
    }

    const onRolePermitClose = (success) => {
        setShowRolePermitModal(false)

    }

    const getSelectedRole = () => {
        return gridRef.current.api.getSelectedRows()[0];
    }

    const setSelectRoleId = () => {
        let selectedRole = getSelectedRole()
        if (!selectedRole) {
            message.info('请选择一条数据修改!!')
            return false
        }
        setEditRoleId(selectedRole.id)
        setRoleName(selectedRole.roleName)
        return true
    }

    const buttonClick = (type) => {
        switch (type) {
            case actionType.ADD:
                setShowEditModal(true)
                setEditRoleId(0)
                break;
            case actionType.EDIT:
                if (setSelectRoleId())
                    setShowEditModal(true)
                break;
            case actionType.DELETE:
                if (setSelectRoleId())
                    setShowMessageModal(true)
                break;
            case actionType.CREATE_ROLEUSER:
                if (setSelectRoleId())
                    setShowRoleUserModal(true)
                break;
            case actionType.ROLE_PERMIT:
                if (setSelectRoleId())
                    setShowRolePermitModal(true)
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
                let selectedRole = gridRef.current.api.getSelectedRows()[0]
                let res = await roleApi.deleteRole(selectedRole.id)
                console.log(res);
                if (res.status == 204) {
                    message.info('成功删除角色!!');
                    loadRoles()
                }
            } catch (e) {
                message.error(`删除失败!! 错误:${e.response.data}`)
            }
        }
    }

    const onSearch = (val) => {
        setFilterParameter({ ...filterParameter, keyword: val })
    }

    return (
        <>
            <Row style={{height:'48px',alignItems:'center'}}>
                <Col>
                    <Search width={800} placeholder="角色名" onSearch={onSearch} enterButton />
                </Col>
            </Row>
            <Row style={{height:'48px',alignItems:'center'}}>
                <Col>
                    <Space>
                        {buttons.map((btn, idx) => <Button key={idx} {...btn} onClick={() => buttonClick(btn.action)} >{btn.text}</Button>)}
                    </Space>
                </Col>
            </Row>
            <DataGrid
                ref={gridRef}
                rowData={roles}
                columnDefs={columns}
            />
            <Row>
                <Col>
                    <Paging {...page} 
                        onChange={(page, pageSize)=>{
                            setFilterParameter({...filterParameter, pageNo:page,pageSize:pageSize })
                        }}/>
                </Col>                
            </Row>
            {showRolePermitModal ? <RolePermitModal id={roleId} roleName={roleName} onClose={onRolePermitClose} /> : <></>}
            {showRoleUserModal ? <RoleUserModal id={roleId} onClose={onRoleUserClose} /> : <></>}
            {showEditModal ? <EditRoleModal id={roleId} onClose={onEditClose} /> : <></>}
            {showMessageModal ? <MessageModal open={showMessageModal} onClose={onMessageModalClose} message="确定删除这条角色数据？" /> : <></>}
        </>
    )

}

export default Role