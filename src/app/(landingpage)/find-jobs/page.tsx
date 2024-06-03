'use client'

import ExploreDataContainer from '@/containers/ExploreDataContainer';
import React, { useEffect, useState } from 'react';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formFilterSchema } from '@/lib/form-schema';
import { useForm } from 'react-hook-form';
import useCategoryJobFilter from '@/hooks/useCategoryJobFilter';
import useJobs from '@/hooks/useJobs';

export default function FindJobsPage() {
  const {filters} = useCategoryJobFilter();
  
  const [categories, setCategories] = useState<string[]>([]);
  
  const {data, mutate, isLoading} = useJobs(categories);

  useEffect(() => {
    mutate();
  }, [categories])

  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: []
    }
  })

  const onSubmitFilter = async (val: z.infer<typeof formFilterSchema>) => {
    setCategories(val.categories);
  };

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFIlter={onSubmitFilter}
      filterForm={filters}
      title='dream job'
      subtitle='Find your next career at companies like Hubspot, Nike, and Dropbox'
      loading={isLoading}
      type='job'
      data={data}
    />
  )
}
