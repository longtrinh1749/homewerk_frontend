import React, { useState } from "react";
import { Col, Card, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, ProForm, ProFormDigit } from '@ant-design/pro-form';
import { FrownOutlined, SmileOutlined } from "@ant-design/icons"
import axios from "axios";
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Modal,
    message,
    Space

} from 'antd';
const JoinCourse = () => {

    let BASE_URL = 'http://127.0.0.1:5000/course'

    const callJoinCourse = (values) => {
        return new Promise((resolve) => {
            // setTimeout(() => {
            //     resolve(true);
            // }, 2000);
            axios.post(BASE_URL, {
                course_id: values.code,
                user_id: sessionStorage.getItem('id'),
            }, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            }).then(function (response) {
                notification.open({
                    message: "Join course successfully",
                    icon: <SmileOutlined style={{ color: 'green' }} />,
                })
            }).catch(res => {
                notification.open({
                    message: 'Join course failed.',
                    description:
                        'Course not existed.',
                    icon: <FrownOutlined style={{ color: 'red' }} />,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
            })
            resolve(true)
        });
    };

    return (
        <>
            <ModalForm
                title="Join Course"
                trigger={
                    <Col span={8}>
                        <Card hoverable={true} title="Join Course" bordered={true} style={{ height: '100%', textAlign: 'center' }}>
                            <PlusOutlined style={{ textAlign: 'center', fontSize: '200%', margin: '10.5% 0 0 0' }} />
                        </Card>
                    </Col>
                }
                submitter={{
                    searchConfig: {
                        submitText: 'Submit',
                        resetText: 'Cancel',
                    },
                }}
                onFinish={async (values) => {
                    await callJoinCourse(values);
                    console.log(values);
                    message.success('Success');
                    return true;
                }}
            >
                <ProFormDigit label="Course Code" name="code" width="md" min={1} max={10000000} placeholder="Code..." />
            </ModalForm>
        </>
    );
};

export default JoinCourse