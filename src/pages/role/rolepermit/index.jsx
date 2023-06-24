import { Tree, App, Modal, Button } from 'antd';
import { useEffect, useState, useRef, useMemo,useCallback } from 'react';
import { roleApi, userApi } from '@/api'
import permissions from '@/permissions'
import menus from '@/permissions/menu'
import PopupModal from "@/components/PopupModal"
import DataGrid from "@/components/datagrid";


// this updates the filePath locations in our data, we update the data
// before we send it to AG Grid
const moveToPath = (newParentPath, node, allUpdatedNodes) => {
    // last part of the file path is the file name
    var oldPath = node.data.filePath;
    var fileName = oldPath[oldPath.length - 1];
    var newChildPath = newParentPath.slice();
    newChildPath.push(fileName);
    node.data.filePath = newChildPath;
    allUpdatedNodes.push(node.data);
    if (node.childrenAfterGroup) {
      node.childrenAfterGroup.forEach(function (childNode) {
        moveToPath(newChildPath, childNode, allUpdatedNodes);
      });
    }
  };
  
  const isSelectionParentOfTarget = (selectedNode, targetNode) => {
    let children = [...(selectedNode.childrenAfterGroup || [])];
    if (!targetNode) {
      return false;
    }
    while (children.length) {
      const node = children.shift();
      if (!node) {
        continue;
      }
      if (node.key === targetNode.key) {
        return true;
      }
      if (node.childrenAfterGroup && node.childrenAfterGroup.length) {
        children.push(...node.childrenAfterGroup);
      }
    }
    return false;
  };
  
  const arePathsEqual = (path1, path2) => {
    if (path1.length !== path2.length) {
      return false;
    }
    var equal = true;
    path1.forEach(function (item, index) {
      if (path2[index] !== item) {
        equal = false;
      }
    });
    return equal;
  };

const RolePermitModal = ({ id,roleName, onClose }) => {
    const columns = [
        // { field: 'pathName', headerName:'列名', checkboxSelection: true,headerCheckboxSelection:true, rowDrag: true,resizable: true },
        { field: 'showText', headerName: '显示名称', width: 100, resizable: true, editable: true },
    ]

    const autoGroupColumnDef = useMemo(() => {
        return {
            headerName: '模块权限',
            minWidth: 350,
            headerCheckboxSelection: true,
            rowDrag: true,
            cellRendererParams: {
                checkbox: true,
                suppressCount: true,
            },
        };
    }, []);

    const { message } = App.useApp();

    const gridRef = useRef()
    const [permits, setPermits] = useState([])
    // const [targetKeys, setTargetKeys] = useState([]);
    // const [selectedKeys, setSelectedKeys] = useState([]);


    const setup = async (id) => {
        try {
            setPermits(buildPermitsData(permissions))
            
            let res = await roleApi.getRolePermits(id)
            let permits = res.data
            // let rowNodes = gridRef.current.api.getRenderedNodes()
            // rowNodes.forEach(n=>{
            //     permits.forEach(j=>{
            //         if(n.data.pathName.join('.') == j.pertmitUniqueKey){    
            //             n.data.showText = j.showText ? j.showText : n.data.showText;                    
            //             n.setSelected(true);
            //         }
            //     })
            //     // gridRef.current.api.setRowNodeExpanded(n,false,false)
            // })

            gridRef.current.api.forEachNode((rowNode)=>{
                permits.forEach(j=>{
                    if(rowNode.data.pathName.join('.') == j.pertmitUniqueKey){    
                        rowNode.data.showText = j.showText ? j.showText : rowNode.data.showText;                    
                        rowNode.setSelected(true);
                    }
                })
                // gridRef.current.api.setRowNodeExpanded(rowNode,false,false)
            })

        } catch (e) {
            message.error(`加载权限数据失败！！${e.message}`)
        }
    }

    const buildPermitsData = () => {

        //构造antd tree的数据源
        // let tds = []
        // menus.forEach(menu => {
        //     if (menu.children) {
        //         let td = { title: menu.label, key: menu.key, children: [] }
        //         tds.push(td)
        //         menu.children.forEach(cmd => {
        //             let modulePermits = permissions.filter(p => p.key == cmd.key)

        //             if (modulePermits.length > 0) {
        //                 let md = modulePermits[0]

        //                 let mtd = { title: cmd.label, key: cmd.key, children: [] }
        //                 td.children.push(mtd)

        //                 let btnPermit = { title: '按钮权限', key: `${cmd.key}/buttons`, children: [] }
        //                 let gridPermits = { title: '网格权限', key: `${cmd.key}/grids`, children: [] }

        //                 md.permissions.buttons.forEach(btn => {
        //                     btnPermit.children.push({ title: btn.text, key: `${cmd.key}/${btn.id}`,isButton:true,name:btn.id, })
        //                 })

        //                 md.permissions.grids.forEach(grid => {
        //                     let gridPermit = {title:grid.gridName,key:`${cmd.key}/${grid.id}`, children: []}
        //                     gridPermits.children.push(gridPermit)
        //                     grid.columns.forEach(col => {
        //                         gridPermit.children.push({ title: col.headerName, key: `${cmd.key}/${col.field}`,isCol:true,name:col.field })
        //                     })
        //                 })
        //                 mtd.children = [btnPermit, gridPermits]
        //             }
        //         })
        //     }
        //     else {
        //         tds.push({ title: menu.label, key: menu.key })
        //     }
        // })
        // return tds

        //构造aggrid数据源
        let tds = []
        menus.forEach(menu => {  
            let pathDep1 = [menu.label]            
            tds.push(createGridRowData(pathDep1,'Menu',menu.key,menu.label,menu.label,true))
            if (menu.children){
                menu.children.forEach(cmd => {
                    let modulePermits = permissions.filter(p => p.key == cmd.key)
                    if (modulePermits.length > 0) {
                        let md = modulePermits[0]
                        let pathDep2 = [...pathDep1, cmd.label]     
                        tds.push(createGridRowData(pathDep2,'Menu',cmd.key,cmd.label,cmd.label,true,menu.key,menu.label))

                        let buttonPathDep3 = [...pathDep2, '按钮权限']   
                        tds.push(createGridRowData(buttonPathDep3,'VirtualNode','按钮权限','按钮权限','',false))                         
                        let gridPathDep3 = [...pathDep2, '网格权限']    
                        tds.push(createGridRowData(gridPathDep3,'VirtualNode','网格权限','网格权限','',false))  

                        md.permissions.buttons.forEach(btn => {
                            let buttonPathDep4 = [...buttonPathDep3, btn.text] 
                            tds.push(createGridRowData(buttonPathDep4,'Button',btn.id,btn.text,btn.text,true,cmd.key,cmd.label))  
                        })

                        md.permissions.grids.forEach(grid => {
                            let gridPathDep4 = [...gridPathDep3, grid.gridName] 
                            tds.push(createGridRowData(gridPathDep4,'VirtualNode',grid.gridName,grid.gridName,'',false))  

                            grid.columns.forEach(col => {                                
                                let gridPathDep5 = [...gridPathDep4, col.headerName] 
                                tds.push(createGridRowData(gridPathDep5,'GridColumn',col.field,col.headerName,col.headerName,true,cmd.key,cmd.label)) 
                            })
                        })
                    }
                })

            }
        })
        return tds
    }

    const createGridRowData = (pathName,componentType,componentName,defaultText,showText,isPermitNode,menuKey ='',menuName ='',actionUrl='')=>{
        return { 
            pathName: pathName, 
            menuKey: menuKey,
            menuName:menuName,
            isPermitNode: isPermitNode,
            componentType: componentType,                                    
            componentName: componentName,
            defaultText: defaultText,
            showText: showText,
            actionUrl: actionUrl
        }
    }


    useEffect(() => {
        setup(id)
    }, [])

    const onOk = async () => {
        let selectedRows = gridRef.current.api.getSelectedRows()
        let orderedRows = []
        gridRef.current.api.forEachNode((node,idx)=>{
            node.data.hasPermit = selectedRows.some(k=>k.pathName == node.data.pathName)
            orderedRows.push(node.data)
        })

        await createRolePermits(orderedRows.map(k=>{
            return {
                roleId:id,
                pertmitUniqueKey:k.pathName.join('.'),
                menuKey: k.menuKey,
                menuName: k.menuName,
                componentType: k.componentType,
                componentName: k.componentName,
                defaultText: k.defaultText,
                showText: k.showText,
                isPermitNode: k.isPermitNode,
                hasPermit: k.hasPermit,
                actionUrl: k.actionUrl
            }
        }));
    }

    const createRolePermits = async (permits) => {
        try {
            const res = await roleApi.createRolePermits(permits)
            if (res.status == 200) {
                message.success('角色权限设置成功!!')
                onClose(true)
            }
        }
        catch (e) {
            console.log(e);
            message.error(`角色权限设置失败!! 错误:${e.response.data}`)
        }
    }


    // const onSelect = (selectedKeys, info) => {
    //     console.log('selected', selectedKeys, info);
    // };
    // const onCheck = (checkedKeys, info) => {
    //     console.log('onCheck', checkedKeys, info);
    // };

    const getDataPath = useMemo(() => {
        return (data) => {
            return data.pathName;
        };
    }, []);

    const onRowDragEnd = useCallback((event) => {
        console.log(event);
      }, []);


    return (
        <>
            <Modal title={`正在分配[${roleName}]的权限`} open={true} onOk={onOk} onCancel={onClose} bodyStyle={{ height: 500, display: 'flex', flexDirection: 'column' }}>
                {/* <Button onClick={()=>{
                    gridRef.current.api.expandAll()
                }}>按钮</Button> */}
                {/* <Tree
                    checkable
                    // defaultExpandedKeys={[]}
                    // defaultSelectedKeys={[]}
                    // defaultCheckedKeys={[]}
                    height={450}
                    onSelect={onSelect}
                    onCheck={onCheck}
                    treeData={permits}
                /> */}
                <DataGrid
                    ref={gridRef}
                    rowData={permits}
                    treeData={true}
                    showRowNoCol={false}
                    rowSelection={'multiple'}
                    columnDefs={columns}
                    showOpenedGroup={false}
                    autoGroupColumnDef={autoGroupColumnDef}
                    groupSelectsChildren={true}
                    suppressRowClickSelection={true}
                    width='480px'
                    getDataPath={getDataPath}
                    groupDefaultExpanded={-1}
                    onRowDragEnd={onRowDragEnd}
                    rowDragManaged={true}
                />
            </Modal>
        </>
    );
};
export default RolePermitModal;