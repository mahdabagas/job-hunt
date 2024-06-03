"use client"

import TitleSection from "@/components/atoms/TitleSection";
import { FC } from "react";
import JobItem from "./JobItem";
import useSWR from "swr";
import { JobType } from "@/types";
import { fetcher } from "@/lib/utils";
import Loading from "@/components/atoms/Loading";

interface LatestJobsProps {}

const LatestJobs: FC<LatestJobsProps> = () => {
    const {data, isLoading, error} = useSWR<JobType[], Error>('/api/job/featured', fetcher);

    return ( 
        <div className="py-16 mt-32 mb-10 relative">
            <TitleSection word1="Latest" word2="jobs open" />

            {isLoading ? (
                <Loading/>
            ) : (
                <div className="mt-12 grid grid-cols-3 gap-8">
                    {data?.map((item: JobType) => (
                        <JobItem 
                            key={item.id}
                            {...item} 
                            />
                            
                    ))}
                </div>
            )}

        </div>
     );
}
 
export default LatestJobs;