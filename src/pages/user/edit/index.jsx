import { Button, Form, Input,  Checkbox, App } from 'antd';
import { useEffect, useState } from 'react';
import { userApi } from '@/api'
import PopupModal from "@/components/PopupModal"

const { TextArea } = Input;



const EditUserModal = ({ id, onClose }) => {
    const { message } = App.useApp();

    const [form] = Form.useForm();

    const getUser = async (id) => {
        const res = await userApi.getUser(id)
        form.setFieldsValue(res.data)
    }

    useEffect(() => {
        if (id > 0) getUser(id)
    }, [])

    const onOk = () => {
        form.submit()
    }

    const onFinish = async (values) => {
        id > 0 ? await updateUser(id, values) : await createUser(values)
    };

    const updateUser = async (id, user) => {
        try {
            const res = await userApi.updateUser(id, user)
            if (res.status == 200) {
                message.success('修改成功!!')
                onClose(true)
            }
        }
        catch (e) {
            message.error(`修改失败!! 错误:${e.response.data}`)
        }
    }

    const createUser = async (user) => {
        try {
            const res = await userApi.createUser(user)
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
                    name="userinfo"
                    initialValues={{}}
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                >
                    <Form.Item label="用户名:"
                        name="userName"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input placeholder="用户名" />
                    </Form.Item>
                    <Form.Item label="密码:"
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            type="password"
                            placeholder="密码"
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
export default EditUserModal;