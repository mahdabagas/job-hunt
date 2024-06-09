import { fetcher } from "@/lib/utils";
import { CompanyType } from "@/types";
import { useMemo } from "react";
import useSWR from "swr";

const COMPANY_PATH = "/api/company/filter";

const useCompanies = (filter?: string[]) => {
    const paramsCategory = useMemo(() => {
        if (filter && filter.length > 0) {
            return filter.join(",")
        }

        return "";
    }, [filter]);

    const { data, isLoading, mutate } = useSWR<CompanyType[], Error>(
        `${COMPANY_PATH}?category=${paramsCategory}`,
        fetcher,
        {revalidateOnMount: false}
    );
    return {
        data,
        mutate,
        isLoading
    }
}

export default useCompanies;