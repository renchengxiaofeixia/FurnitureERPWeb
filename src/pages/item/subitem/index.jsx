import { Button, Form, Input,  InputNumber , App, Row } from 'antd';
import { useEffect, useState,useRef } from 'react';
import { itemApi } from '@/api'
import PopupModal from "@/components/PopupModal"
import DataGrid from '../../../components/DataGrid';
import { columns } from '@/permissions/item'
import ItemGridEditor from '@/components/ItemGridEditor'


const columnDefs = [    
    { field: 'picPath', headerName:'图片',width:'80px' },
    { field: 'itemName', headerName:'名称',width:'233px',
        cellEditorPopup: true, 
        editable: true,
        cellEditorPopupPosition: 'over', 
        cellEditor: ItemGridEditor,
        cellEditorParams: {
            cellRenderer: ItemGridEditor,
            rows: [],
            columns: columns,
            width: '500px',
            height: '500px'
        } 
    },
    { field: 'itemNo', headerName:'编码',width:'200px', resizable: true },
    { field: 'num', headerName:'数量',width:'80px', editable: true,
        cellEditor: 'agNumberCellEditor',
        cellEditorParams: {
            min: 1,
            max: 100,
            precision: 1,
        }
    }
]


const AddSubItemModal = ({ id, itemNo, onClose }) => {
    const { message } = App.useApp();
    const gridRef = useRef()

    const [items,setItems] = useState([])
    const getItem = async (id) => {     
        let resAll = await itemApi.getItems()
        // setPopupItems(resAll.data)
        console.log(resAll.data);
        columnDefs[1].cellEditorParams.rows = resAll.data

        const res = await itemApi.getSubItems(id)
        console.log(res);
        if(res.data.length>0){
            setItems(res.data)
        }
        else{
            setItems([{picPath:'',itemNo:'',itemName:'',num:0}])
        }
    }

    useEffect(() => {
        if (id > 0) getItem(id)
    }, [])

    const onOk = async () => {
        let selectedRows = gridRef.current.api.getSelectedRows()
        let subitems = []
        gridRef.current.api.forEachNode((node,idx)=>{
            subitems.push(node.data)
        })

        await updateItem(id,{
            id:id,
            subItems:subitems.map(k=> {
                return {
                    itemNo:itemNo,
                    subItemNo:k.itemNo,
                    num:k.num
                }
            })
        });
    }

    const updateItem = async (id, item) => {
        try {
            const res = await itemApi.updateSubItems(id, item)
            if (res.status == 200) {
                message.success('添加子商品成功!!')
                onClose(true)
            }
        }
        catch (e) {
            message.error(`添加子商品失败!! 错误:${e.response.data}`)
        }
    }

    const onCellEditingStopped = (e) => {
        console.log(e);
        if(e.colDef.field == 'itemName'){
            if(e.value){
            const rowNode = gridRef.current.api.getDisplayedRowAtIndex(e.rowIndex);
            rowNode.setDataValue('itemName', e.value.itemName);
            rowNode.setDataValue('itemNo', e.value.itemNo);
            rowNode.setDataValue('num', 1);
            }
            else{
            const rowNode = gridRef.current.api.getDisplayedRowAtIndex(e.rowIndex);
            rowNode.setDataValue('itemName', e.oldValue);
            }
        }
        if(e.colDef.field == 'num'){

        }
    
        gridRef.current.api.setFocusedCell(e.rowIndex,e.column.colId,e.column.pinned)
        gridRef.current.api.getRenderedNodes()[e.rowIndex].setSelected(true);
      }


    const navigateToNextCell = (grid) => {
        const suggestedNextCell = grid.nextCellPosition;
        if (!suggestedNextCell || suggestedNextCell.rowIndex < 0) return
        grid.api.forEachNode(node => {
            if (node.rowIndex === suggestedNextCell.rowIndex) {
                node.setSelected(true);
            }
        })
        return suggestedNextCell;
    }

    return (
        <>
            <PopupModal width={700} title={'子商品信息'} open={true} onOk={onOk} onCancel={onClose} bodyStyle={{height:400,display: 'flex', flexDirection: 'column' }}>
                <DataGrid showRowIdCol={false} showAddCol={true}
                        columnDefs={columnDefs} 
                        ref={gridRef}
                        rowData={items}                        
                        onCellEditingStopped={onCellEditingStopped}
                        navigateToNextCell={navigateToNextCell}
                        >
                </DataGrid>
            </PopupModal>
        </>
    );
};
export default AddSubItemModal;