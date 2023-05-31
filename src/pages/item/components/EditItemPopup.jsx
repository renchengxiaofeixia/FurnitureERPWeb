import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Input, Col, Tabs, Row, InputNumber, Form, Space, Switch, App } from 'antd'

import { addAsync, editAsync, changeEditPopupOpen, setItem, setEditSubItems } from '@/store/modules/item'
import TreeCatgories from "@/components/TreeCatgories"
import PopupModal from "@/components/PopupModal"
import SubItemsEditPop from './SubItemsEditPop'
import UploadImages from './UploadImages'

import styles from '../index.module.scss'

const { TextArea } = Input

const tabItems = [{
    label: '商品规格',
    children: <SubItemsEditPop />,
    key: '1',
}, {
    label: '图片上传',
    children: <UploadImages />,
    key: '2',
}];

const EditItemPopup = (props) => {
    const { message } = App.useApp();
    const dispatch = useDispatch()
    const formRef = useRef(null)
    const { selectedItem, isOpenEditPopup, editSubItems, previewImage } = useSelector((state) => state.item)

    const [status, setStatus] = useState("")
    const [selectValue, setSelectValue] = useState({})

    useEffect(() => {
        if (isOpenEditPopup.props == 'change') {
            setStatus(selectedItem.status)
            setSelectValue(selectedItem.cate)
        }
    }, [selectedItem])


    const onFinish = async () => {
        const item = formRef.current.getFieldsValue(true)
        message.destroy()
        if (!item.itemName) {
            return message.open({
                type: 'warning',
                content: '名称不能为空！'
            })
        }
        if (!item.itemNo) {
            return message.open({
                type: 'warning',
                content: '商品编号不能为空！'
            })
        }

        let subItemFlag = false
        if (editSubItems.length) {
            item.subItems = editSubItems.map(one => {
                if (!one.id) {
                    // 没有id的情况是选择规格的时候只新增了，没有去查询对应的商品，这种情况则禁止新增
                    subItemFlag = true
                }
                return {
                    itemNo: item.itemNo,
                    subItemNo: one.itemNo,
                    num: 5
                }
            })
        } else {
            item.subItems = []
        }
        if (subItemFlag) {
            return message.open({
                type: 'warning',
                content: '商品规格发生错误,请检查！'
            })
        }
        item.status = status;
        item.cate = selectValue || '';
        item.picPath = previewImage;

        if (isOpenEditPopup.props == 'change') {
            dispatch(editAsync(props.ids, item))
        } else {
            dispatch(addAsync(item))
        }
        dispatch(changeEditPopupOpen({
            props: 'add',
            isPopup: false
        }))
    }

    const onFinishFailed = (e) => {
        console.log(e)
    }

    const onCancel = () => {
        dispatch(setItem({}))
        dispatch(setEditSubItems([]))
        dispatch(
            changeEditPopupOpen({
                props: 'add',
                isPopup: false
            })
        )
    }

    const treeSelectOptions = {
        value: selectValue || null,
        onChange: (cateName, newValue) => {
            setSelectValue(cateName);
        }
    }

    return (
        <>
            <PopupModal title={isOpenEditPopup.props == 'change' ? '修改商品' : '新建商品'} open={isOpenEditPopup.isPopup} footer={null} width={1000} onCancel={onCancel}>
                <Form ref={formRef} labelCol={{ span: 7 }}  onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={selectedItem}>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="商品编号：" name="itemNo" rules={[{ required: true }]} >
                                <Input disabled={isOpenEditPopup.props == 'change'} placeholder="请输入商品编号" value={selectedItem.itemNo} className={styles.item_edit_Input} size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="名称：" name="itemName" rules={[{ required: true }]} >
                                <Input placeholder="请输入商品名称" value={selectedItem.itemName} className={styles.item_edit_Input} size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="分类" name="cate">
                                <TreeCatgories placeholder="请选择分类" treeSelect treeSelectOptions={treeSelectOptions} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="供应商：" name="suppName" >
                                <Input placeholder="请输入供应商 " value={selectedItem.suppName} className={styles.item_edit_Input} size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="体积：" name="volume">
                                <InputNumber placeholder="请输入体积" value={selectedItem.volume} className={styles.item_edit_Input} size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="采购价：" name="costPrice">
                                <InputNumber placeholder="请输入采购价" value={selectedItem.costPrice} className={styles.item_edit_Input} size="large" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="包装件数：" name="packageQty">
                                <InputNumber placeholder="请输入包装件数" value={selectedItem.packageQty} className={styles.item_edit_Input} size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="安全库存：" name="safeQty">
                                <InputNumber placeholder="请输入安全库存" value={selectedItem.safeQty} className={styles.item_edit_Input} size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="销售价：" name="price">
                                <InputNumber placeholder="请输入销售价" value={selectedItem.price} className={styles.item_edit_Input} size="large" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="备注：" name="remark">
                                <TextArea placeholder="请输入备注" value={selectedItem.remark} autoSize={{ minRows: 1 }} className={styles.product_add_tectarea} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="是否启用：" name="" labelCol={{ span: 7 }}>
                                <Switch onChange={(checked, event) => {
                                    setStatus(checked ? 'Using' : 'ForBid')
                                }} size="default" checked={status == "Using" ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Tabs
                                onChange={() => { }}
                                type="card"
                                items={tabItems}
                                className='tab_heade_content'
                            />
                        </Col>
                        <Col span={24} className="flex_conter display_flex mar_top">
                            <Space size={[16]}>
                                <Form.Item>
                                    <Button onClick={onCancel}>取消</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={onFinish}>
                                        确定
                                    </Button>
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </PopupModal>

        </>
    )
}

export default EditItemPopup
