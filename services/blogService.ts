import axios from "axios";
import apiBaseUrl from "./config"

class BlogService {
    private getBlogEndpoint(endpoint: string) {
        return `${apiBaseUrl}/content/blogs/${endpoint.length < 1 ? '' : endpoint + '/'}`;
    }

    async getAllBlogs () {
        try {
            const res = await fetch(`${this.getBlogEndpoint('')}`, {
                method: 'GET',
            });

            const jsonRes = await res.json();
            if (!res.ok) {
                const errorMsg = 'Something went wrong. Please try again later';
                throw Error(errorMsg);
            }

            return jsonRes;
        } catch (error) {
            throw error;
        }
    }

    async getSingleBlog (blogStr: string): Promise<IBlog> {
        try {
            const res = (await axios.get(`${this.getBlogEndpoint(blogStr)}`)).data;
            return res as IBlog;
        } catch (error) {
            throw error;
        }
    }
}

export {
    BlogService,
}