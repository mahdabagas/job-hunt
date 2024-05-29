'use client'

import ExploreDataContainer from '@/containers/ExploreDataContainer';
import React from 'react';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { formFilterSchema } from '@/lib/form-schema';
import { useForm } from 'react-hook-form';
import { filterFormType } from '@/types';
import { CATEGORIES_OPTIONS } from '@/constants';

const FILTER_FORMS: filterFormType[] = [
  {
    name: 'categories',
    label: 'Categories',
    items: CATEGORIES_OPTIONS
  }
]

export default function FindJobsPage() {
  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: []
    }
  })

  const onSubmitFilter = async (val: z.infer<typeof formFilterSchema>) => console.log(val);

  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFIlter={onSubmitFilter}
      filterForm={FILTER_FORMS}
    />
  )
}
