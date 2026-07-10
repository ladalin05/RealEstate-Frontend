import { apiFetch } from "../utils/api";

export class CMSService {

    static async getHomePageData() {
        try {
            const result = await apiFetch('/cms/home');
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }

    static async getFeaturedProperties(limit: number) {
        try {
            const result = await apiFetch(`/cms/featured-properties?limit=${limit}`);
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }

    static async getUserDashboard() {
        try {
            
            const result = await apiFetch(`/cms/user-dashboard`);
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }


}