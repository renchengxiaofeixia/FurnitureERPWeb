import React from 'react'
import { Pagination } from 'antd';
import { Space } from 'antd';

const Paging = (props) => {
    return (
        <Space className="paging">
            <Pagination
                showTitle
                showQuickJumper
                showSizeChanger
                showTotal={(total) => `总数 ${total} 条`}
                {...props}
            />
        </Space>
    )
}

export default Paging