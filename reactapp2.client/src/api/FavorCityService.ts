import { FavorCity } from '../Models/FavorCity';

const FavorCityApi = 'http://localhost:5297/api/FavorCity';

export const getAllFavorCities = async (): Promise<FavorCity[]> => {
    const response = await fetch(FavorCityApi);
    if (!response.ok) {
        throw new Error('Failed to fetch favor cities');
    }
    return response.json();
};

export const getFavorCityById = async (id: number): Promise<FavorCity> => {
    const response = await fetch(`${FavorCityApi}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch favor city with id ${id}`);
    }
    return response.json();
};

export const addFavorCity = async (newCity: FavorCity): Promise<void> => {
    const response = await fetch(FavorCityApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCity)
    });
    if (!response.ok) {
        throw new Error('Failed to add new favor city');
    }
    return response.json();
};

export const deleteFavorCity = async (id: number): Promise<void> => {
    const response = await fetch(`${FavorCityApi}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Failed to delete favor city with id ${id}`);
    }
};