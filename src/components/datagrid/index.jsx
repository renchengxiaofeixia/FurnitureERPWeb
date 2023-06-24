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


const DataGrid = forwardRef(({showRowNoCol = true, rowData, columnDefs, 
    onSelectionChanged, 
    treeData,getDataPath,autoGroupColumnDef,rowSelection = 'single',
    groupSelectsChildren,suppressRowClickSelection,
    rowGroupOpened,onColumnGroupOpened,groupDefaultExpanded,
    onRowDragEnd,rowDragManaged,
    onCellEditingStopped,
    navigateToNextCell }, ref) => {

    const [showColumnSettingModal, setShowColumnSettingModal] = useState(false);

    const localeText = useMemo(() => {
        return AG_GRID_LOCALE_ZH;
    }, []);

    const onSortChanged = useCallback(() => {
        ref.current.api.refreshCells();
    }, []);

    const rowIdColumn = {
        headerName: '#',
        maxWidth: 50,
        cellRenderer: params => {
            return params.rowIndex + 1;
        },
        // headerComponent: ()=><SettingOutlined onClick={()=>{
        //     setShowColumnSettingModal(true)
        // }}/>,

        headerComponent: () => <ColumnSettingPopover columns={columnDefs}>
            <SettingOutlined />
        </ColumnSettingPopover>,
    }

    

    return (
        <>
            <Col className="ag-theme-balham" flex="auto">
                <AgGridReact
                    ref={ref}
                    rowData={rowData}
                    columnDefs={showRowNoCol ? [rowIdColumn, ...columnDefs] : columnDefs}
                    animateRows={true}
                    rowSelection={rowSelection}
                    localeText={localeText}
                    treeData={treeData}
                    onSelectionChanged={onSelectionChanged}
                    onSortChanged={onSortChanged}
                    getDataPath={getDataPath}
                    autoGroupColumnDef={autoGroupColumnDef}
                    groupSelectsChildren={groupSelectsChildren}
                    suppressRowClickSelection={suppressRowClickSelection}
                    rowGroupOpened={rowGroupOpened}
                    onColumnGroupOpened ={onColumnGroupOpened}
                    groupDefaultExpanded={groupDefaultExpanded}
                    onRowDragEnd={onRowDragEnd}
                    rowDragManaged={rowDragManaged}
                    onCellEditingStopped={onCellEditingStopped}
                    navigateToNextCell={navigateToNextCell}
                />
            </Col>

            {showColumnSettingModal ? <ColumnSettingModal columns={columnDefs} onClose={() => setShowColumnSettingModal(false)} /> : <></>}
        </>
    )
})

export default DataGrid