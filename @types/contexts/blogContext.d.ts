type BlogContextType = {
    blogs: IBlog[];
    setBlogs: (val: IBlog[]) => void;
    blogsLoading: boolean;
    setBlogsLoading: (val: boolean) => void;
    blogsLoaded: boolean;
    setBlogsLoaded: (val: boolean) => void;
}