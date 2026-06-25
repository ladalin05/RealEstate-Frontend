const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export class BlogService {
    static async getBlogs(): Promise<any> {
        try {
            const response = await fetch(`${API_URL}/blogs`);
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }
    }
}