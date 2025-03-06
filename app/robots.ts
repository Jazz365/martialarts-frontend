import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/dashboard/*', 
                '/api/*', 
                '/login-success', 
                '/cgi-bin/',
            ],
        },
        sitemap: 'https://martialarts.guru/sitemap.xml',
    }
}