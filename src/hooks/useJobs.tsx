import { fetcher } from "@/lib/utils";
import { JobType } from "@/types";
import { useMemo } from "react";
import useSWR from "swr";

const JOB_PATH = "/api/job/filter";

const useJobs = (filter?: string[]) => {
    const paramsCategory = useMemo(() => {
        if (filter && filter.length > 0) {
            return filter.join(",")
        }

        return "";
    }, [filter]);

    const { data, isLoading, mutate } = useSWR<JobType[], Error>(
        `${JOB_PATH}?category=${paramsCategory}`,
        fetcher,
        {revalidateOnMount: false}
    );
    return {
        data,
        mutate,
        isLoading
    }
}

export default useJobs;