import { useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community';
import AG_GRID_LOCALE_ZH from './locale.zh'
import { SettingOutlined } from '@ant-design/icons'
import { useCallback,forwardRef,useState } from "react";
// import ColumnSettingModal from "../../components/columsetting";
import ColumnSettingPopover from "../../components/columsetting"

const DataGrid = forwardRef(({ rowData, columnDefs,onSelectionChanged, },ref) => {
    
    const [showColumnSettingModal, setShowColumnSettingModal] = useState(false);

    const localeText = useMemo(() => {
        return AG_GRID_LOCALE_ZH;
    }, []);
    const onSortChanged = useCallback(() => {
        ref.current.api.refreshCells();
    }, []);
    const rowIdColumn = {
        headerName: '#',
        maxWidth: 40,
        cellRenderer: params =>{
        return params.rowIndex+1;
        },
        // headerComponent: ()=><SettingOutlined onClick={()=>{
        //     setShowColumnSettingModal(true)
        // }}/>,

        headerComponent: ()=><ColumnSettingPopover columns={columnDefs}> 
            <SettingOutlined/>
        </ColumnSettingPopover>,
    }
    return (
        <>
            <div className="ag-theme-balham" style={{ flexGrow: 1 }}>
                <AgGridReact
                    ref={ref}
                    rowData={rowData}
                    columnDefs={[rowIdColumn,...columnDefs]}
                    animateRows={true}
                    rowSelection={'single'}
                    localeText={localeText}
                    onSelectionChanged={onSelectionChanged}
                    onSortChanged={onSortChanged}
                />
            </div>
            
            {showColumnSettingModal ? <ColumnSettingModal columns={columnDefs} onClose={()=>setShowColumnSettingModal(false)} /> : <></>}
        </>
    )
})

export default DataGrid