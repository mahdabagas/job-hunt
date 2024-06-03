"use client"

import TitleSection from '@/components/atoms/TitleSection'
import React, { FC } from 'react'
import JobItem from './JobItem';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { JobType } from '@/types';
import Loading from '@/components/atoms/Loading';

interface FeaturedJobsProps {}

const FeaturedJobs: FC<FeaturedJobsProps> = ({}) => {
  const {data, isLoading, error} = useSWR<JobType[], Error>('/api/job/featured', fetcher);

  return (
    <div className='mt-32 mb-10'>
        <TitleSection word1='Featured' word2='jobs'/>

        {isLoading ? (
          <Loading/>
        ) : (
          <div className='grid grid-cols-4 gap-8 mt-12'>
              {data?.map((item: JobType) => (
                  <JobItem 
                      key={item.id}
                      {...item}
                  />
                  
              ))}
          </div>
        )}
    </div>
  )
}

export default FeaturedJobs;