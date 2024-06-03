"use client"

import TitleSection from '@/components/atoms/TitleSection';
import React, { FC } from 'react'
import CategoryItem from './CategoryItem';
import { fetcher } from '@/lib/utils';
import useSwr from 'swr';
import { categoryJobType } from '@/types';
import Loading from '@/components/atoms/Loading';

interface CategoryProps {}

const Category: FC<CategoryProps> = ({}) => {
  const { data, isLoading, error } = useSwr<categoryJobType[], Error>('/api/job/categories', fetcher);

  return (
    <div className='mt-32 mb-8'>
        <TitleSection word1='Explore by' word2='category' />
        {isLoading ? (
          <Loading/>
        ) : (
          <div className='grid grid-cols-5 gap-9 mt-12'>
              {data?.map((item: categoryJobType) => (
                  <CategoryItem key={item.id} name={item.name} totalJobs={item.totalJobs} />
              ))}
          </div>
        )}
    </div>
  )
}

export default Category;