import React, { useEffect, useState } from 'react';
import { FavorCity } from '../Models/FavorCity';
import { getAllFavorCities, addFavorCity, deleteFavorCity } from '../api/FavorCityService';
import { Button, Modal, Input, Form, message, Layout, Typography, Card, Radio, ConfigProvider, theme, Menu, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from "antd";

const { Header, Sider, Footer, Content } = Layout;
const { Title } = Typography;

const UserProfile: React.FC = () => {
    const [favorCities, setFavorCities] = useState<FavorCity[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentCity, setCurrentCity] = useState<Partial<FavorCity>>({});
    const [value, setValue] = useState("default");

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cities = await getAllFavorCities();
                setFavorCities(cities);
            } catch (error) {
                console.error('Failed to fetch favor cities:', error);
            }
        };

        fetchCities();
    }, []);

    const handleAddCity = () => {
        setCurrentCity({});
        setIsModalVisible(true);
    };

    const handleDeleteCity = async (id: number) => {
        try {
            await deleteFavorCity(id);
            setFavorCities(favorCities.filter(city => city.id !== id));
            message.success('City deleted successfully');
        } catch (error) {
            console.error('Failed to delete favor city:', error);
            message.error('Failed to delete favor city');
        }
    };

    const handleSaveCity = async (values: Partial<FavorCity>) => {
        try {
            await addFavorCity(values as FavorCity);
            setFavorCities([...favorCities, values as FavorCity]);
            setIsModalVisible(false);
            message.success('City added successfully');
        } catch (error) {
            console.error('Failed to save favor city:', error);
            message.error('Failed to save favor city');
        }
    };

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
        display: 'flex',
        alignItems: 'center',
    };

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        height: '100%',
        width: '100%',
        color: '#fff',
    };

    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
    };

    const layoutStyle = {
        display: 'flex',
        width: '100%',
        height: '100vh',
    };

    const gridStyle: React.CSSProperties = {
        width: '20%',
        textAlign: 'center',
        color: 'white',
        textShadow: '1px 1px 2px black',
    };

    const items = [UserOutlined, UserOutlined].map(
        (icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: `userprofile ${index + 1}`,
        }),
    );

    return (
        <ConfigProvider
            theme={{
                algorithm:
                    value === "default" ? theme.defaultAlgorithm : theme.darkAlgorithm
            }}
        >
            <Layout style={layoutStyle}>
                <Header style={headerStyle}>
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value={"default"}>default</Radio>
                        <Radio value={"dark"}>dark</Radio>
                    </Radio.Group>
                    <Title>User Profile</Title>
                </Header>
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        <Menu mode="inline" defaultSelectedKeys={['2']} items={items} />
                    </Sider>
                    <Layout>
                        <Content style={contentStyle}>
                            <Card title="Add/Delete Your Favorite Cities">
                                <Button type="primary" onClick={handleAddCity}>Add Favorite City</Button>
                            </Card>
                            <Row gutter={[150,16]}>
                                {favorCities.map((item, index) => (
                                    <Col span={8} key={index}>
                                        <Card.Grid
                                            style={gridStyle}
                                            title="Your Favorite Cities"
                                            hoverable
                                        >
                                            City: {item.city}      Country:{item.country}
                                            <Button danger onClick={() => handleDeleteCity(item.id)}>Delete</Button>
                                        </Card.Grid>
                                    </Col>
                                ))}
                            </Row>
                            <Modal
                                title="Add Favorite City"
                                open={isModalVisible}
                                onCancel={() => setIsModalVisible(false)}
                                footer={null}
                            >
                                <Form
                                    initialValues={currentCity}
                                    onFinish={handleSaveCity}
                                >
                                    <Form.Item
                                        name="city"
                                        label="City"
                                        rules={[{ required: true, message: 'Please enter the city name' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="country"
                                        label="Country"
                                        rules={[{ required: true, message: 'Please enter the country name' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Save
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Content>
                    </Layout>
                    <Footer style={footerStyle}></Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default UserProfile;