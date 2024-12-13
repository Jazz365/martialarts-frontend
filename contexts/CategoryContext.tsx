'use client';


import { CategoryService } from "@/services/categoryService";
import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext<{
    categories: ICategory[];
    setCategories: (categories: ICategory[]) => void;
    categoriesLoading: boolean;
    setCategoriesLoading: (val: boolean) => void;
    categoriesLoaded: boolean;
    setCategoriesLoaded: (val: boolean) => void;
}>({
    categories: [],
    setCategories: () => {},
    categoriesLoading: true,
    setCategoriesLoading: () => {},
    categoriesLoaded: false,
    setCategoriesLoaded: () => {},
});

export const useCategoryContext = () => useContext(CategoryContext);

const CategoryContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [ categories, setCategories ] = useState<ICategory[]>([]);
    const [ categoriesLoading, setCategoriesLoading ] = useState(true);
    const [ categoriesLoaded, setCategoriesLoaded ] = useState(false);

    const categoryService = new CategoryService();

    useEffect(() => {
        if (categoriesLoaded) return setCategoriesLoading(false);

        categoryService.getAllCategories().then(res => {
            setCategories(res);
            setCategoriesLoaded(true);
            setCategoriesLoading(false);
        }).catch(() => {
            setCategoriesLoading(false);
        })
    }, [])

    return <>
        <CategoryContext.Provider value={{
            categories,
            setCategories,
            categoriesLoading,
            setCategoriesLoading,
            categoriesLoaded,
            setCategoriesLoaded,
        }}>
            {children}
        </CategoryContext.Provider>
    </>
}

export default CategoryContextProvider;