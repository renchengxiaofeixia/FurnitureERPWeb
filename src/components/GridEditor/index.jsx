import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';

const defaultRowData = [
        { name: "Bob", mood: "Happy", number: 10 },
        { name: "Harry", mood: "Sad", number: 3 },
        { name: "Sally", mood: "Happy", number: 20 },
        { name: "Mary", mood: "Sad", number: 5 },
        { name: "John", mood: "Happy", number: 15 },
        { name: "Jack", mood: "Happy", number: 25 },
        { name: "Sue", mood: "Sad", number: 43 },
        { name: "Sean", mood: "Sad", number: 1335 },
        { name: "Niall", mood: "Happy", number: 2 },
        { name: "Alberto", mood: "Happy", number: 123 },
        { name: "Fred", mood: "Sad", number: 532 },
        { name: "Jenny", mood: "Happy", number: 34 },
        { name: "Larry", mood: "Happy", number: 13 },
    ]

const GridEditor = forwardRef((props, ref) => {
    const [inputValue, setInputValue] = useState('');
    const gridRef = useRef(null);
    const refInput = useRef(null);
    
    const [rowData,setRowData] = useState(defaultRowData);

    const columnDefs = useMemo(() => [
        {
            headerName: 'name',
            field: 'name',
            width: 300,
        },
        {
            headerName: 'mood',
            field: 'mood',
            width: 300,
        },
        {
            headerName: 'Numeric',
            field: 'number',
            width: 280,
        },
    ], [])

    useEffect(() => {
        refInput.current.focus();
    }, []);

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return selectedValue;
            },
 
            isCancelBeforeStart() {
                return false;
            },
            isCancelAfterEnd() {
                return false;
            }
        };
    });
 
  
    const onRowDoubleClicked =(event)=>{
        setSelectedValue(event.data.name);
        props.stopEditing();
    }
    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <input type="text"
              ref={refInput}
              value={value}
              onChange={event => {
                setInputValue(event.target.value)
                let rd = defaultRowData.filter(k=>k.name.indexOf(event.target.value) > -1);
                setRowData(rd)
              }}
              style={{width: "100%"}}
            />
            <AgGridReact
                ref = {gridRef}
                rowData={rowData}
                rowSelection={'single'}
                columnDefs={columnDefs}
                onRowDoubleClicked ={onRowDoubleClicked }
                >
            </AgGridReact>
      </div>
    );
 });

 export default GridEditor