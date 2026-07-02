const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export class PropertyService {

    static async getProperties(): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/property`);
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching properties:', error);
            return [];
        }
    }

    static async getPropertyDetail({ propertyId, userId = null }: { propertyId: number, userId?: number | null }): Promise<any> {
        try {
            const params = new URLSearchParams({ property_id: String(propertyId) });
            if (userId) {
                params.append('user_id', String(userId));
            }

            const response = await fetch(`${API_URL}/property/detail?${params.toString()}`);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching property detail:', error);
            return null;
        }
    }

    static async getFavoriteProperties(userId: number): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/property/favourite?user_id=${userId}`);
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching favorite properties:', error);
            return [];
        }
    }

    static async getDataFillter(): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/property/get-data-fillter`);
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching data fillter:', error);
            return [];
        }
    }

    static async filterProperties(filters: Record<string, any>): Promise<any[]> {
        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, val]) => {
                if (val !== undefined && val !== null && val !== '') {
                    params.append(key, String(val));
                }
            }); 

            const response = await fetch(`${API_URL}/property/fillter-properties?${params.toString()}`, {
                method:  'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            return result.data ?? [];
        } catch (error) {
            console.error('Error fetching filtered properties:', error);
            return [];
        }
    }

}
