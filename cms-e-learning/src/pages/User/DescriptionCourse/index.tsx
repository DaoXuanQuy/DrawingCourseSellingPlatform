import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import CardCourse from '@/components/CardCourse';
import { GET_IMAGE } from '@/constant';
import { getDetailCourse } from '@/services/api/CourseController';
import {
  BookOutlined,
  CheckCircleOutlined,
  FieldTimeOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useParams } from '@umijs/max';
import { Button, Image, Layout, List, Typography } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
const { Sider, Content } = Layout;
const DescriptionCourse: React.FC = () => {
  const { courseId } = useParams();

  const [course, setCourse] = useState<API.CourseEntity>({});

  useEffect(() => {
    getDetailCourse({ id: courseId || '' }).then((res) => {
      if (res.code === 0) {
        setCourse(res.data || {});
      } else {
        history.push('/not-found');
      }
    });
  }, [courseId]);
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          { name: 'Home', path: '/welcome' },
          { name: 'Courses', path: '/courses' },
          { name: 'Register Course', path: '' },
        ]}
      />
      <Layout className="layout">
        <Content>
          <Image
            style={{ borderRadius: '6px' }}
            width={200}
            src={course.avatar ? GET_IMAGE.getUrl(course.avatar) : '/icons/Logo.png'}
          />
          <div>
            <Typography.Title
              style={{
                margin: '20px 0 5px 0',
                fontSize: '35px',
                fontWeight: '500',
                lineHeight: '35px',
              }}
            >
              Nvidia and UE4 Technologies Practice
            </Typography.Title>
            <Typography.Text style={{ fontSize: '16px', lineHeight: '25px', fontWeight: '400' }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </Typography.Text>
          </div>
          <div>
            <Typography.Title
              style={{
                margin: '20px 0',
                fontSize: '22px',
                fontWeight: '500',
                lineHeight: '28px',
              }}
            >
              Overview
            </Typography.Title>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: '0 0 33.3333%', padding: '0 15px' }}>
              <div
                style={{
                  display: 'flex',
                  padding: '15px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                  <BookOutlined />
                  <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                    Lectures
                  </Typography.Text>
                </div>
                <Typography.Text style={{ width: '40%' }}>8</Typography.Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '15px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                  <QuestionCircleOutlined />
                  <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                    Quizzes
                  </Typography.Text>
                </div>
                <Typography.Text style={{ width: '40%' }}>1</Typography.Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '15px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                  <FieldTimeOutlined />
                  <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                    Duration
                  </Typography.Text>
                </div>
                <Typography.Text style={{ width: '40%' }}>60 Hours</Typography.Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '15px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                  <RiseOutlined />
                  <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                    Skill level
                  </Typography.Text>
                </div>
                <Typography.Text style={{ width: '40%' }}>Beginner</Typography.Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '15px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                  <TranslationOutlined />
                  <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                    Language
                  </Typography.Text>
                </div>
                <Typography.Text style={{ width: '40%' }}>English</Typography.Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '15px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                  <UserOutlined />
                  <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                    Students
                  </Typography.Text>
                </div>
                <Typography.Text style={{ width: '40%' }}>32</Typography.Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  padding: '15px',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                  <CheckCircleOutlined />
                  <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                    Assessments
                  </Typography.Text>
                </div>
                <Typography.Text style={{ width: '40%' }}>Yes</Typography.Text>
              </div>
            </div>
            <div style={{ flex: '0 0 66.6667%', padding: '0 15px' }}>
              <Typography.Title
                style={{
                  margin: '20px 0',
                  fontSize: '22px',
                  fontWeight: '500',
                  lineHeight: '28px',
                }}
              >
                Course Description
              </Typography.Title>
              <Typography.Text
                style={{
                  marginBottom: '24px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  fontWeight: '400',
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry’s standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </Typography.Text>
              <Typography.Title
                style={{
                  margin: '20px 0',
                  fontSize: '22px',
                  fontWeight: '500',
                  lineHeight: '28px',
                }}
              >
                Certification
              </Typography.Title>
              <Typography.Text
                style={{
                  marginBottom: '24px',
                  fontSize: '16px',
                  lineHeight: '24px',
                  fontWeight: '400',
                }}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry’s standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
              </Typography.Text>
              <Typography.Title
                style={{
                  margin: '20px 0',
                  fontSize: '22px',
                  fontWeight: '500',
                  lineHeight: '28px',
                }}
              >
                Learning Outcomes
              </Typography.Title>
              <List>
                <List.Item style={{ padding: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined />
                    <Typography.Text
                      style={{ paddingLeft: '15px', fontSize: '15px', fontWeight: '400' }}
                    >
                      Over 37 lectures and 55.5 hours of content!
                    </Typography.Text>
                  </div>
                </List.Item>
                <List.Item style={{ padding: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined />
                    <Typography.Text
                      style={{ paddingLeft: '15px', fontSize: '15px', fontWeight: '400' }}
                    >
                      LIVE PROJECT End to End Software Testing Training Included.
                    </Typography.Text>
                  </div>
                </List.Item>
                <List.Item style={{ padding: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined />
                    <Typography.Text
                      style={{ paddingLeft: '15px', fontSize: '15px', fontWeight: '400' }}
                    >
                      Learn Software Testing and Automation basics from a professional trainer from
                      your own desk.
                    </Typography.Text>
                  </div>
                </List.Item>
                <List.Item style={{ padding: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined />
                    <Typography.Text
                      style={{ paddingLeft: '15px', fontSize: '15px', fontWeight: '400' }}
                    >
                      Information packed practical training starting from basics to advanced testing
                      techniques.
                    </Typography.Text>
                  </div>
                </List.Item>
                <List.Item style={{ padding: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined />
                    <Typography.Text
                      style={{ paddingLeft: '15px', fontSize: '15px', fontWeight: '400' }}
                    >
                      Best suitable for beginners to advanced level users and who learn faster when
                      demonstrated.
                    </Typography.Text>
                  </div>
                </List.Item>
                <List.Item style={{ padding: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined />
                    <Typography.Text
                      style={{ paddingLeft: '15px', fontSize: '15px', fontWeight: '400' }}
                    >
                      Course content designed by considering current software testing technology and
                      the job market.
                    </Typography.Text>
                  </div>
                </List.Item>
                <List.Item style={{ padding: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined />
                    <Typography.Text
                      style={{ paddingLeft: '15px', fontSize: '15px', fontWeight: '400' }}
                    >
                      Practical assignments at the end of every session.
                    </Typography.Text>
                  </div>
                </List.Item>
                <List.Item style={{ padding: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined />
                    <Typography.Text
                      style={{ paddingLeft: '15px', fontSize: '15px', fontWeight: '400' }}
                    >
                      Practical learning experience with live project work and examples.cv
                    </Typography.Text>
                  </div>
                </List.Item>
              </List>
            </div>
          </div>
        </Content>
        <Sider
          className="sider"
          style={{
            backgroundColor: '#f0f2f5',
            minWidth: '500px !important',
            maxWidth: '500px !important',
            width: '500px !important',
          }}
        >
          <div style={{ marginTop: 100 }}>
            <CardCourse course={course} type="register" />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="primary"
                shape="round"
                size={'large'}
                style={{ padding: 0, maxHeight: 60, maxWidth: 240, minHeight: 40, minWidth: 150 }}
                onClick={() => {
                  history.push(`payment/${course.id}`);
                }}
              >
                <Typography.Title
                  style={{ fontSize: 24, fontWeight: 500, color: '#fff', margin: 0, padding: 0 }}
                >
                  Buy Now
                </Typography.Title>
              </Button>
            </div>
          </div>
        </Sider>
      </Layout>
    </>
  );
};

export default DescriptionCourse;
