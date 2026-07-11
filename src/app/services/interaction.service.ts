import { apiFetch } from "../utils/api";

export class InteractionService {
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

    static async requestInfo(data: any) {
        try {
            const result = await apiFetch('/interaction/request-info', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            console.log(result);
            return result;
        } catch (error) {
            console.error('CMS Fetch Error:', error);
            throw error;
        }
    }
}