import React, { useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Radio, Tabs, Switch, Upload, Typography, notification } from 'antd';
import { FrownOutlined, SmileOutlined } from "@ant-design/icons"
import axios from 'axios';

const EditAssignment = ({ assignment, visible, onEdit, onCancel, refresh, setRefresh }) => {
    let BASE_URL = 'http://127.0.0.1:5000/assignments'

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([])

    const callUpdateCourse = (values) => {
        return new Promise((resolve) => {
            console.log('Values:', values)

            let formData = new FormData()
            if (fileList[0]) {
                console.log("Co file nhe")
                formData.append('file', fileList[0].originFileObj)
            }
            formData.append('id', assignment.id)
            formData.append('due', values.due)
            formData.append('instruction', values.instruction)
            formData.append('name', values.name)
            axios.put(BASE_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            }).then(function (response) {
                notification.open({
                    message: "Update assignment successfully.",
                    icon: <SmileOutlined style={{ color: 'green' }} />,
                })
            }).catch(res => {
                notification.open({
                    message: 'Update failed. Server error.',
                    icon: <FrownOutlined style={{ color: 'red' }} />,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            })
            resolve(true)
        });
    }

    const props = {
        name: 'file',
        beforeUpload: () => false,
        fileList: fileList,

        onChange({ fileList }) {
            setFileList(fileList)
        },
    };

    return (
        <Modal
            visible={visible}
            title="Manage Assignment"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(async (values) => {
                        form.resetFields();
                        onEdit(values);
                        await callUpdateCourse(values)
                    })
                    .then(() => setRefresh(!refresh))
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    name: assignment.name,
                    instruction: assignment.instruction,
                    due: assignment.due
                }}
            >
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="instruction" label="Instruction">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="due" label="Due">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
            <Typography.Text>
                Attachment
            </Typography.Text><br /><br />
            <Upload {...props}>
                <Button icon={<UploadOutlined />} disabled={fileList.length > 0}>Click to Upload</Button>
            </Upload>
        </Modal>
    );
};

export default EditAssignment