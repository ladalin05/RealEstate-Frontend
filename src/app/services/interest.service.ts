import { apiFetch } from "../utils/api";

export class InterestService {
    static async scheduleTour(data: any) {
        try {
            const result = await apiFetch('/interest/schedule-tour', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }

    static async requestInfo(data: any) {
        try {
            const result = await apiFetch('/interest/request-info', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }
}