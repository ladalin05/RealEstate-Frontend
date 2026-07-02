import { apiFetch } from "../utils/api";

export class BlogService {
    static async getBlogs(): Promise<any> {
        try {
            const result = await apiFetch(`/blogs`);
            return result.data;
        } catch (error) {
            console.error('Error fetching blogs:', error);
            return [];
        }
    }

    static async getBlogDetail(id: number): Promise<any> {
        try {
            const result = await apiFetch(`/blogs/detail?id=${id}`);
            return result.data;
        } catch (error) {
            console.error('Error fetching blog:', error);
            return [];
        }
    }
}