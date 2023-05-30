import { Button, Form, Input, Modal, App, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { roleApi } from '@/api'

const { TextArea } = Input;

const EditRoleModal = ({ id, onClose }) => {
    const { message } = App.useApp();

    const [form] = Form.useForm();

    const getRole = async (id) => {
        const res = await roleApi.getRole(id)
        form.setFieldsValue(res.data)
    }

    useEffect(() => {
        if (id > 0) getRole(id)
    }, [])

    const onOk = () => {
        form.submit()
    }

    const onFinish = async (values) => {
        id > 0 ? await updateRole(id, values) : await createRole(values)
    };


    const updateRole = async (id, role) => {
        try {
            const res = await roleApi.updateRole(id, role)
            if (res.status == 200) {
                message.success('修改成功!!')
                onClose(true)
            }
        }
        catch (e) {
            message.error(`修改失败!! 错误:${e.response.data}`)
        }
    }

    const createRole = async (role) => {
        try {
            const res = await roleApi.createRole(role)
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
                    name="roleinfo"
                    initialValues={{}}
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                >
                    <Form.Item label="角色名:"
                        name="roleName"
                        rules={[{ required: true, message: 'Please input your rolename!' }]}
                    >
                        <Input placeholder="角色名" />
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
export default EditRoleModal;