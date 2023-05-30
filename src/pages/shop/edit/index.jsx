import { Button, Form, Input, Modal, App, Divider, Select } from 'antd';
import { useEffect, useState } from 'react';
import { shopApi } from '@/api'
import PopupModal from "@/components/PopupModal"

const { TextArea } = Input;

const EditShopModal = ({ id, onClose }) => {
    const { message } = App.useApp();

    const [form] = Form.useForm();

    const getShop = async (id) => {
        const res = await shopApi.getShop(id)
        form.setFieldsValue(res.data)
    }

    useEffect(() => {
        if (id > 0) getShop(id)
    }, [])

    const onOk = () => {
        form.submit()
    }

    const onFinish = async (values) => {
        id > 0 ? await updateShop(id, values) : await createShop(values)
    };


    const updateShop = async (id, role) => {
        try {
            const res = await shopApi.updateShop(id, role)
            if (res.status == 200) {
                message.success('修改成功!!')
                onClose(true)
            }
        }
        catch (e) {
            message.error(`修改失败!! 错误:${e.response.data}`)
        }
    }

    const createShop = async (et) => {
        try {
            const res = await shopApi.createShop(et)
            if (res.status == 201) {
                message.success('新增成功!!')
                onClose(true)
            }
        }
        catch (e) {
            message.error(`新增失败!! 错误:${e.response.data}`)
        }
    }

    return (
        <>
            <PopupModal title={id > 0 ? '编辑' : '新增'} open={true} onOk={onOk} onCancel={onClose}>
                <Form form={form}
                    name="Warehouse"
                    initialValues={{}}
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                >
                    <Form.Item label="店铺:"
                        name="sellerNick"
                        rules={[{ required: true, message: 'Please input your shopname!' }]}
                    >
                        <Input placeholder="店铺" />
                    </Form.Item>
                    <Form.Item label="平台:"
                        name="shopType"
                        rules={[{ required: true, message: 'Please input your shopType!' }]}
                    >
                        <Select
                            defaultValue="天猫"
                            options={[
                                {
                                    value: '淘宝',
                                    label: '淘宝',
                                },
                                {
                                    value: '天猫',
                                    label: '天猫',
                                },
                                {
                                    value: '京东',
                                    label: '京东',
                                },
                                {
                                    value: '抖音',
                                    label: '抖音',
                                },
                                {
                                    value: '拼多多',
                                    label: '拼多多',
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item label="授权码:"
                        name="sessionKey"
                        rules={[{ required: true, message: 'Please input your sessionKey!' }]}
                    >
                        <Input placeholder="授权码" />
                    </Form.Item>
                </Form>
            </PopupModal>
        </>
    );
};
export default EditShopModal;