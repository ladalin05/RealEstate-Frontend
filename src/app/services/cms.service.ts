const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export class CMSService {

    static async getHomePageData() {
        try {
            const response = await fetch(`${API_URL}/cms/home`);
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }

    static async getFeaturedProperties(limit: number) {
        try {
            const response = await fetch(`${API_URL}/cms/featured-properties?limit=${limit}`);
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }


}