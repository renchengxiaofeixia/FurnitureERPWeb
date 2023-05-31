import { Transfer, App } from 'antd';
import { useEffect, useState } from 'react';
import { roleApi, userApi } from '@/api'
import PopupModal from "@/components/PopupModal"

const RoleUserModal = ({ id, onClose }) => {
    const { message } = App.useApp();

    const [users, setUsers] = useState([])
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);

    const getRoleUsers = async (id) => {
        try {
            const userRes = await userApi.getUsers()
            setUsers(userRes.data.map(u => { return { key: u.id, title: u.userName } }))
            const roleRes = await roleApi.getRoleUsers(id)
            setTargetKeys(roleRes.data.map(u => u.id))
        } catch (e) {
            message.error(`数据刷新失败!! 错误:${e.response.data}`)
        }
    }

    useEffect(() => {
        if (id > 0) getRoleUsers(id)
    }, [])

    const onOk = async () => {
        await createRoleUsers({ roleId: id, userIds: targetKeys })
    }

    const createRoleUsers = async (roleUsers) => {
        try {
            console.log(roleUsers);
            const res = await roleApi.createUserRole(roleUsers)
            if (res.status == 200) {
                message.success('角色用户设置成功!!')
                onClose(true)
            }
        }
        catch (e) {
            console.log(e);
            message.error(`角色用户设置失败!! 错误:${e.response.data}`)
        }
    }

    const onChange = (newTargetKeys, direction, moveKeys) => {
        setTargetKeys(newTargetKeys);
    };
    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
    return (
        <>
            <PopupModal title="角色用户" open={true} onOk={onOk} onCancel={onClose} bodyStyle={{ height: 400 }}>
                <Transfer
                    dataSource={users}
                    titles={['待选择', '已选择']}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={onChange}
                    onSelectChange={onSelectChange}
                    showSearch={true}
                    render={(item) => item.title}
                    listStyle={{
                        width: 250,
                        height: 350,
                    }}
                />
            </PopupModal>
        </>
    );
};
export default RoleUserModal;