'use client'


import useLoadData from "@/hooks/useLoadData";
import { BlogService } from "@/services/blogService";
import { createContext, useContext, useState } from "react";
import { useAppContext } from "./AppContext/AppContext";

const BlogContext = createContext<BlogContextType>({
    blogs: [],
    setBlogs: () => {},
    blogsLoaded: false,
    setBlogsLoaded: () => {},
    blogsLoading: true,
    setBlogsLoading: () => {},
});

export const useBlogContext = () => useContext(BlogContext);

const BlogContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { stylesLoaded } = useAppContext();

    const [ blogs, setBlogs ] = useState<IBlog[]>([]);
    const [ blogsLoading, setBlogsLoading ] = useState(true);
    const [ blogsLoaded, setBlogsLoaded ] = useState(false);

    const blogService = new BlogService();
    
    useLoadData(
        blogsLoaded,
        setBlogsLoading,
        blogService.getAllBlogs.bind(blogService),
        setBlogs,
        setBlogsLoaded,
        {
            hasDependency: true,
            dependency:  stylesLoaded === true,
        },
    );

    return <BlogContext.Provider value={{
        blogs,
        setBlogs,
        blogsLoaded,
        setBlogsLoaded,
        blogsLoading,
        setBlogsLoading,
    }}>
        {children}
    </BlogContext.Provider>
}

export default BlogContextProvider;