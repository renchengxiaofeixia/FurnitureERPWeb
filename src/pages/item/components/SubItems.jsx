import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Datagrid from '@/components/Datagrid'
import { subColumnItem } from '../permission'



const SubItems = () => {
    let { subItems, isLoading } = useSelector((state) => state.item);

    const gridRef = useRef()

    const gridOptions = {
        rowData: subItems,

    }
    return (
        <>
            <Datagrid gridOptions={gridOptions} columnDefs={subColumnItem} ref={gridRef} style={{ height: '260px' }} />
        </>
    )
}

export default SubItems