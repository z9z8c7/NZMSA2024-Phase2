import React, { useEffect, useState } from 'react';
import { FavorCity } from '../Models/FavorCity';
import { getAllFavorCities, addFavorCity, deleteFavorCity } from '../api/FavorCityService';
import { List, Button, Modal, Input, Form, message, Layout, Typography, Card } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const UserProfile: React.FC = () => {
    const [favorCities, setFavorCities] = useState<FavorCity[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentCity, setCurrentCity] = useState<Partial<FavorCity>>({});

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

    return (
        <Layout>
            <Header>
                <Title style={{ color: 'white' }}>User Profile</Title>
            </Header>
            <Content style={{ padding: '50px' }}>
                <Card title="Add Favorite City">
                    <Button type="primary" onClick={handleAddCity}>Add Favorite City</Button>
                </Card>
                <List
                    dataSource={favorCities}
                    renderItem={city => (
                        <List.Item
                            actions={[
                                <Button danger onClick={() => handleDeleteCity(city.id)}>Delete</Button>
                            ]}
                        >
                            {city.city} - {city.country}
                        </List.Item>
                    )}
                />
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
    );
};

export default UserProfile;