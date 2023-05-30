import { Button, Form, Input, Modal, App, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { warehouseApi } from '@/api'

const { TextArea } = Input;

const EditWarehouseModal = ({ id, onClose }) => {
    const { message } = App.useApp();

    const [form] = Form.useForm();

    const getWarehouse = async (id) => {
        const res = await warehouseApi.getWarehouse(id)
        form.setFieldsValue(res.data)
    }

    useEffect(() => {
        if (id > 0) getWarehouse(id)
    }, [])

    const onOk = () => {
        form.submit()
    }

    const onFinish = async (values) => {
        id > 0 ? await updateWarehouse(id, values) : await createWarehouse(values)
    };


    const updateWarehouse = async (id, role) => {
        try {
            const res = await warehouseApi.updateWarehouse(id, role)
            if (res.status == 200) {
                message.success('修改成功!!')
                onClose(true)
            }
        }
        catch (e) {
            message.error(`修改失败!! 错误:${e.response.data}`)
        }
    }

    const createWarehouse = async (et) => {
        try {
            const res = await warehouseApi.createWarehouse(et)
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
            <Modal title={id > 0 ? '编辑' : '新增'} open={true} onOk={onOk} onCancel={onClose}>
                <Divider />
                <Form form={form}
                    name="Warehouse"
                    initialValues={{}}
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                >
                    <Form.Item label="仓库:"
                        name="warehouseName"
                        rules={[{ required: true, message: 'Please input your warehousename!' }]}
                    >
                        <Input placeholder="仓库" />
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
            </Modal>
        </>
    );
};
export default EditWarehouseModal;