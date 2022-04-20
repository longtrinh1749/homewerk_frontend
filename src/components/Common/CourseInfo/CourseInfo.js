import axios from "axios";
import React, { useEffect, useState } from "react";
import { Descriptions, Button } from 'antd'
import EditCourseForm from '../../Teacher/EditCourse/EditCourseInfo'

const CourseInfo = ({ course, refresh, setRefresh }) => {
    let BASE_URL = 'http://192.168.1.13:5000/courses'
    const [courseInfo, setCourseInfo] = useState(1)
    console.log("CourseInfo ", course)
    useEffect(() => {
        let params = {
            id: course.id
        }
        axios.get(BASE_URL, { params }).then(res => setCourseInfo(res.data.courses[0]))
    }, [refresh])

    //Edit Course Form
    const [visible, setVisible] = useState(false);

    const onEdit = (values) => {
        console.log('Received values from form', values)
        setVisible(false)
    }
    return (
        <>
            <EditCourseForm courseInfo={courseInfo} visible={visible} onEdit={onEdit} onCancel={() => setVisible(false)}></EditCourseForm>
            <Descriptions
                bordered
                title="Class Information"
                size='middle'
                extra={<Button type="primary" onClick={() => {
                    setVisible(true);
                }}>Edit</Button>}
            >
                <Descriptions.Item label="Name">{courseInfo.name}</Descriptions.Item>
                <Descriptions.Item label="School">{courseInfo.school}</Descriptions.Item>
                <Descriptions.Item label="Year">{courseInfo.school_year}</Descriptions.Item>
                <Descriptions.Item label="Class">{courseInfo.class}</Descriptions.Item>
                <Descriptions.Item label="Course Description">
                    This course is meant for students who is extremely good
                </Descriptions.Item>
            </Descriptions>
        </>
    )
}

export default CourseInfo