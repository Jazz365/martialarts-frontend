import { BlogService } from "@/services/blogService";
import { MetadataRoute } from "next";

async function fetchBlogSlugs (): Promise<IBlog[]> {
    const blogService = new BlogService();

    try {
        const blogs: IBlog[] = await blogService.getAllBlogs();
        if (!Array.isArray(blogs)) return [];
        return blogs;
    } catch (error) {
        console.log('An error occured while trying to fetch blogs for sitemap index');
        return [];
    }
}

async function fetchFeaturedStudios() {
    
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogSlugs = await fetchBlogSlugs();
    const featuredStudios = [];

    const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map(blog => ({
        url: `https://martialarts.guru/blog/${blog.slug}`,
        lastModified: new Date(
            blog.updated_at && blog.updated_at.length > 0 ? 
                blog.updated_at
            : 
            blog.created_at
        ),
        changeFrequency: 'monthly',
        priority: 0.5,
    }));
    
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: 'https://martialarts.guru',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ];

    return [
        ...staticRoutes,
        ...blogRoutes,
    ];
}