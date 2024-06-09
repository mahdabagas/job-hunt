import { fetcher, parsingCategoriesOptions } from "@/lib/utils"
import { filterFormType } from "@/types";
import { useMemo } from "react";
import useSWR from "swr"

const useCategoryCompanyFIlter = () => {
    const {data, isLoading, error} = useSWR('/api/company/categories', fetcher);

    const categories = useMemo(() => parsingCategoriesOptions(data, isLoading, error, true)
    , [data, error, isLoading]
    );

    const filters = useMemo(() => {
        return [
            {
                name: 'industry',
                label: 'Industry',
                items: categories
            }
        ] as filterFormType[]
    }, [categories])
    
    return {
        filters
    }
}

export default useCategoryCompanyFIlter;