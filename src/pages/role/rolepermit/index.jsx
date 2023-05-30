import { Modal, Tree, App, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { roleApi,userApi } from '@/api'
import permissions from '@/permissions'
import menus from '@/permissions/menu'

const RolePermitModal = ({ id, onClose }) => {
    const { message } = App.useApp();

    const [permits,setPermits] = useState([])
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);


    const setup = async (id)=>{
        try{
            setPermits(buildPermitsData(permissions))
        }catch(e){
            message.error(`数据刷新失败!! 错误:${e.response.data}`)
        }
    }

    const buildPermitsData = () =>{
        let tds = []

        menus.forEach(menu =>{
            if(menu.children){
                let td = {title:menu.label,key:menu.key,children:[]}
                tds.push(td)
                menu.children.forEach(cmd=>{                    
                    let modulePermits = permissions.filter(p=>p.key == cmd.key)

                    if(modulePermits.length > 0){
                        let md = modulePermits[0]

                        let mtd = {title:cmd.label,key:cmd.key,children:[]}
                        td.children.push(mtd)
                        let btnPermit = {title:'按钮权限',key:`${cmd.key}button`,children:[]}
                        let gridPermit = {title:'网格权限',key:`${cmd.key}grid`,children:[]}

                        md.permissions.buttons.forEach(btn=>{
                            btnPermit.children.push({title:btn.text,key:`${cmd.key}${btn.text}`})
                        })

                        md.permissions.columns.forEach(col=>{
                            gridPermit.children.push({title:col.headerName,key:`${cmd.key}${col.field}`})
                        })
                        mtd.children = [btnPermit,gridPermit]
                    }
                })
            }
            else{
                tds.push({title:menu.label, key:menu.key})
            }
        })
        return tds
    }

    useEffect(() => {
        setup(id)
    }, [])

    const onOk = async () => {
    }

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
      };
      const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
      };
    return (
        <>
            <Modal title="角色权限" open={true} onOk={onOk} onCancel={onClose} bodyStyle={{height: 500}}>
                <Divider />
                <Tree
                    checkable
                    // defaultExpandedKeys={[]}
                    // defaultSelectedKeys={[]}
                    // defaultCheckedKeys={[]}
                    height={450}
                    onSelect={onSelect}
                    onCheck={onCheck}
                    treeData={permits}
                    />
            </Modal>
        </>
    );
};
export default RolePermitModal;