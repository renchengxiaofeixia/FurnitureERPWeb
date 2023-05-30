import React from 'react'
import { Pagination } from 'antd';
import { Col } from 'antd';

const Paging = ({pageOptions}) => {
    return (
        <Col className="paging">
            <Pagination
                showTitle
                showQuickJumper
                showSizeChanger
                {...pageOptions}
            />
            <span className="paging_total">共 {pageOptions?.total} 条</span>
        </Col>
    )
}

export default Paging