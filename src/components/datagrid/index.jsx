import { useMemo } from 'react';
import { Col } from 'antd'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import AG_GRID_LOCALE_ZH from './locale.zh'
import { SettingOutlined } from '@ant-design/icons'
import { useCallback, forwardRef, useState } from "react";
// import ColumnSettingModal from "../../components/columsetting";
import ColumnSettingPopover from "../../components/ColumnSetting"
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
]);


const DataGrid = forwardRef(({showRowIdCol =true,showAddCol = false,rowSelection = 'single',...props}, ref) => {

    const [showColumnSettingModal, setShowColumnSettingModal] = useState(false);

    const localeText = useMemo(() => {
        return AG_GRID_LOCALE_ZH;
    }, []);

    const onSortChanged = useCallback(() => {
        ref.current.api.refreshCells();
    }, []);

    const addColumn = {
        headerName: ' ',
        maxWidth: 56,      
        pinned: 'right',
        cellRenderer: (props)=>(
        <span>
          <button style={{width:'24px'}} onClick={()=>
          {
            let rows = ref.current.api.getRenderedNodes().map(k=>k.data);
            ref.current.api.setRowData([...rows,{}])          
          }} >+</button> 
          <button style={{width:'24px'}} onClick={()=>
          {
            var selectedRowData = ref.current.api.getSelectedRows();
            ref.current.api.applyTransaction({ remove: selectedRowData });
  
          }}>-</button>
        </span>),
        cellStyle:{padding:0,margin:0}
      }

    const rowIdColumn = {
        headerName: '#',
        maxWidth: 50,
        cellRenderer: params => {
            return params.rowIndex + 1;
        },
        // headerComponent: ()=><SettingOutlined onClick={()=>{
        //     setShowColumnSettingModal(true)
        // }}/>,

        headerComponent: () => <ColumnSettingPopover columns={props.columnDefs}>
            <SettingOutlined />
        </ColumnSettingPopover>,
    }

    let columns = showRowIdCol ? [rowIdColumn, ...props.columnDefs] : props.columnDefs;
    columns = showAddCol ? [...columns,addColumn] : columns;
    

    const modelUpdated = useCallback(() => {
        console.log(111);
        const allColumnIds = [];
        gridRef.current.columnApi.getColumns().forEach((column) => {
          allColumnIds.push(column.getId());
        });
        gridRef.current.columnApi.autoSizeColumns(allColumnIds);
      }, []);
    return (
        <>
            <Col className="ag-theme-balham" flex="auto">
                <AgGridReact
                    ref={ref}
                    rowData={props.rowData}
                    columnDefs={columns}
                    animateRows={true}
                    rowSelection={rowSelection}
                    localeText={localeText}
                    treeData={props.treeData}
                    onSelectionChanged={props.onSelectionChanged}
                    onSortChanged={onSortChanged}
                    getDataPath={props.getDataPath}
                    autoGroupColumnDef={props.autoGroupColumnDef}
                    groupSelectsChildren={props.groupSelectsChildren}
                    suppressRowClickSelection={props.suppressRowClickSelection}
                    rowGroupOpened={props.rowGroupOpened}
                    onColumnGroupOpened ={props.onColumnGroupOpened}
                    groupDefaultExpanded={props.groupDefaultExpanded}
                    onRowDragEnd={props.onRowDragEnd}
                    rowDragManaged={props.rowDragManaged}
                    onCellEditingStopped={props.onCellEditingStopped}
                    navigateToNextCell={props.navigateToNextCell}
                    modelUpdated = {modelUpdated}
                />
            </Col>

            {showColumnSettingModal ? <ColumnSettingModal columns={props.columnDefs} onClose={() => setShowColumnSettingModal(false)} /> : <></>}
        </>
    )
})

export default DataGrid