import { apiFetch } from "../utils/api";

export class InteractionService {

    static async getScheduleTour() {
        try {
            const result = await apiFetch('/interaction/get-schedule-tour');
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }

    static async scheduleTour(data: any) {
        try {
            const result = await apiFetch('/interaction/schedule-tour', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }

    static async getRequestInfo() {
        try {
            const result = await apiFetch('/interaction/get-request-info');
            return result.data;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }

    static async requestInfo(data: any) {
        try {
            const result = await apiFetch('/interaction/request-info', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            return result;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }
}