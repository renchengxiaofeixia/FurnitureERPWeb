import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RightOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Col, Card, Popover } from 'antd';

import { loadAsync } from '@/store/modules/item'
import TreeCatgories from "@/components/TreeCatgories"

import styles from "../index.module.scss";

const DrawerFilter = (props) => {
    const dispatch = useDispatch()
    let transitionRef = useRef()
    let { page } = useSelector((state) => state.item);
    const catgoriesOptions = {
        draggable: true,
        blockNode: true,
        onSelect: (selectedKeys, { node }) => {
            dispatch(loadAsync({
                pageNo: 1,
                pageSize: page.pageSize,
                keyword: "",
                Cate: node.cateName || ''
            }))
        }
    }

    return (
        <>

            <Col style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }} ref={transitionRef}>
                <Card
                    // title="商品分类"
                    bordered={false}
                    size="small"
                    className={styles.item_drawer_card}
                >
                    <TreeCatgories catgoriesOptions={catgoriesOptions} />
                </Card>
                <div className={styles.item_drawer_recycle}>
                    <div style={{ flex: '1' }} onClick={() => {
                        dispatch(loadAsync({
                            pageNo: 1,
                            pageSize: page.pageSize,
                            keyword: "",
                            Status: 'Delete'
                        }))
                    }}>
                        <DeleteOutlined style={{ color: '#666' }} />
                        <span>回收站</span>
                    </div>
                    <Popover content='设置自动清除时间' title="">
                        <EllipsisOutlined style={{ fontSize: '20px' }} />
                    </Popover>
                </div>

                {/* {!props.lateralOpen ? (<RightOutlined className={`${styles.product_drawer_btn} ${styles.product_drawer_come}`} onClick={() => props.setLateralOpen(true)} />) : ''} */}
            </Col>
        </>
    )
}

export default DrawerFilter