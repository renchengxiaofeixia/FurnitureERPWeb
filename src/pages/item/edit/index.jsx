import { Button, Form, Input,  InputNumber , App, Row } from 'antd';
import { useEffect, useState } from 'react';
import { itemApi } from '@/api'
import PopupModal from "@/components/PopupModal"

const { TextArea } = Input;

const EditItemModal = ({ id, onClose }) => {
    const { message } = App.useApp();

    const [form] = Form.useForm();

    const getItem = async (id) => {
        const res = await itemApi.getItem(id)
        form.setFieldsValue(res.data)
    }

    useEffect(() => {
        if (id > 0) getItem(id)
    }, [])

    const onOk = () => {
        form.submit()
    }

    const onFinish = async (values) => {
        id > 0 ? await updateItem(id, values) : await createItem(values)
    };

    const updateItem = async (id, item) => {
        try {
            const res = await itemApi.updateItem(id, item)
            if (res.status == 200) {
                message.success('修改成功!!')
                onClose(true)
            }
        }
        catch (e) {
            message.error(`修改失败!! 错误:${e.response.data}`)
        }
    }

    const createItem = async (item) => {
        try {
            const res = await itemApi.createItem(item)
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
                    name="iteminfo"
                    initialValues={{}}
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                >
                    <Form.Item label="名称:"
                        name="itemName"
                    >
                        <Input placeholder="名称" />
                    </Form.Item>
                    <Form.Item label="编码:"
                        name="itemNo"
                    >
                        <Input placeholder="编码"
                        />
                    </Form.Item>
                    <Form.Item label="体积:" name="volume">
                        <InputNumber placeholder="体积"/>                        
                    </Form.Item>
                    <Form.Item label="件数:"
                        name="packageQty"
                    >
                        <InputNumber  placeholder="件数"
                        />
                    </Form.Item>
                    <Form.Item label="备注:" name="remark">
                        <TextArea
                            showCount
                            maxLength={100}
                            style={{
                                height: 80,
                                marginBottom: 24,
                            }}
                            placeholder="备注"
                        />
                    </Form.Item>
                </Form>
            </PopupModal>
        </>
    );
};
export default EditItemModal;