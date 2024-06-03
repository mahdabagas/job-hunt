import { fetcher, parsingCategoriesOptions } from "@/lib/utils"
import { filterFormType } from "@/types";
import { useMemo } from "react";
import useSWR from "swr"

const useCategoryJobFilter = () => {
    const {data, isLoading, error} = useSWR('/api/job/categories', fetcher);

    const categories = useMemo(() => parsingCategoriesOptions(data, isLoading, error)
    , [data, error, isLoading]
    );

    const filters = useMemo(() => {
        return [
            {
                name: 'categories',
                label: 'Categories',
                items: categories
            }
        ] as filterFormType[]
    }, [categories])
    
    return {
        filters
    }
}

export default useCategoryJobFilter;