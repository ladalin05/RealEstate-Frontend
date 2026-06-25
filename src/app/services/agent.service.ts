const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export class AgentService {

    static async getAgents(): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/user-management/agents`);
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching agents:', error);
            return [];
        }
    }

}
