import { apiFetch } from "../utils/api";

export class AgentService {

    static async getAgents(): Promise<any> {
        try {
            const result = await apiFetch('/user-management/agents');
            return result.data;
        } catch (error) {
            console.error('Error fetching agents:', error);
            return [];
        }
    }

    static async getAgetDetail(id: number): Promise<any> {
        try { 
            const result = await apiFetch(`/user-management/agent-detail?id=${id}`);
            return result.data;
        } catch (error) {
            console.error('Error fetching agent detail:', error);
            return null;
        }
    }

}
