import { apiFetch } from "../utils/api";

export class PropertyService {

    static async getProperties(): Promise<any> {
        try {
            const result = await apiFetch('/property');
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

            const result = await apiFetch(`/property/detail?${params.toString()}`);
            return result.data;
        } catch (error) {
            console.error('Error fetching property detail:', error);
            return null;
        }
    }

    static async toggleFavorite({ propertyId, userId }: { propertyId: number, userId: number }): Promise<any> {
        try {
            const result = await apiFetch('/property/toggle-favourite', {
                method: 'POST',
                body: JSON.stringify({ property_id: propertyId, user_id: userId }),
            });
            return result.data;
        } catch (error) {
            console.error('Error toggling favorite:', error);
            return null;
        }
    }

    static async getFavoriteProperties(userId: number): Promise<any> {
        try {
            const result = await apiFetch(`/property/favourite?user_id=${userId}`);
            return result.data;
        } catch (error) {
            console.error('Error fetching favorite properties:', error);
            return [];
        }
    }

    static async getDataFillter(): Promise<any> {
        try {
            const result = await apiFetch('/property/get-data-fillter');
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

            const result = await apiFetch(`/property/fillter-properties?${params.toString()}`);
            return result.data ?? [];
        } catch (error) {
            console.error('Error fetching filtered properties:', error);
            return [];
        }
    }

}
