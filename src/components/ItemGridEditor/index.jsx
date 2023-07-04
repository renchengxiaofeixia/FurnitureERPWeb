import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);



const GridEditor = forwardRef(({ rows, columns, width, height, stopEditing }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const gridRef = useRef(null);
    const refInput = useRef(null);
    const columnDefs = useMemo(() => columns, [])
    const [rowData, setRowData] = useState(rows)

    useEffect(() => {
        refInput.current.focus();
    }, []);

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                let selectedRow = gridRef.current.api.getSelectedRows()[0]
                return selectedRow
            },

            isCancelBeforeStart() {
                return false;
            },
            isCancelAfterEnd() {
                return false;
            }
        };
    });

    const onRowDoubleClicked = (event) => {
        stopEditing();
    }

    const navigateToNextCell = (grid) => {
        if(grid.nextCellPosition && grid.nextCellPosition.rowIndex == -1){
            refInput.current.focus()            
            gridRef.current.api.getRenderedNodes()[0].setSelected(false);
            return
        }

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
        <div className="ag-theme-balham" style={{ height, width }}>
            <input type="text" className='ag-input-field-input ag-text-field-input' onKeyDown={(e) => {
                if (e.key == "ArrowDown") {
                    gridRef.current.api.getRenderedNodes()[0].setSelected(true);
                    gridRef.current.api.setFocusedCell(0,'itemName')
                }
            }}
                ref={refInput}
                value={inputValue}
                onChange={event => {
                    setInputValue(event.target.value)
                    setRowData(rows.filter(k => k.itemName.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1))
                }}
                style={{ width: "100%" }}
            />
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                rowSelection={'single'}
                columnDefs={columnDefs}
                onRowDoubleClicked={onRowDoubleClicked}
                navigateToNextCell={navigateToNextCell}
            >
            </AgGridReact>
        </div>
    );
});

export default GridEditor