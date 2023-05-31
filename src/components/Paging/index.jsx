import React from 'react'
import { Pagination } from 'antd';
import { Col } from 'antd';
import styles from "./index.module.scss"

const Paging = ({ pageOptions }) => {
    return (
        <Col className={styles.paging}>
            <Pagination
                showTitle
                showQuickJumper
                showSizeChanger
                {...pageOptions}
            />
            <span className={styles.paging_total}>共 {pageOptions?.total} 条</span>
        </Col>
    )
}

export default Paging