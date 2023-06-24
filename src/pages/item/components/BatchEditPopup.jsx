import React, { useState } from 'react'
import { Col, Row, Modal, Radio, Space, Input, List, Divider } from 'antd';
import PopupModal from "@/components/PopupModal"

const { Search } = Input;

const data = [
    '沙发',
    '茶几',
    '电视柜',
    '床头柜',
    '现代床',
];
const BatchEditPopup = ({ isShowBatch, setIsShowBatch }) => {

    return (
        <>
            <PopupModal title="批量处理"
                open={isShowBatch}
                onOk={() => setIsShowBatch(false)}
                onCancel={() => setIsShowBatch(false)}>
                <Row >
                    < Col span={24} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                        <Radio.Group name="radiogroup" defaultValue={1}>
                            <Space direction="vertical">
                                <Radio value={1}>订单列表勾选商品</Radio>
                                <Radio value={2}>当前筛选条件下所有订单</Radio>
                            </Space>
                        </Radio.Group>
                    </Col>

                    <Col span={24} >
                        <Search placeholder="请输入商品名称" allowClear />
                    </Col>

                    <Col span={24} style={{ marginTop: '10px' }}>
                        <List
                            header={<div>商品名称修改</div>}
                            bordered
                            dataSource={data}
                            renderItem={(item, idx) => (
                                <List.Item>
                                    <Radio value={idx}>{item}</Radio>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </PopupModal>
        </>
    )
}

export default BatchEditPopup