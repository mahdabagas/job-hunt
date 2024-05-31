"use client"

import { CATEGORIES_OPTIONS } from "@/constants";
import ExploreDataContainer from "@/containers/ExploreDataContainer";
import { formFilterIndustryScema } from "@/lib/form-schema";
import { CompanyType, filterFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FILTER_FORMS: filterFormType[] = [
    {
      name: 'industry',
      label: 'Industry',
      items: CATEGORIES_OPTIONS
    }
]

const dataDummy: CompanyType[] = [
  {
    image: '/images/company2.png',
    categories: 'Marketing',
    description: 'Lorem',
    name: 'Twitter',
    totalJobs: 10
  },
  {
    image: '/images/company2.png',
    categories: 'Marketing',
    description: 'Lorem',
    name: 'Twitter',
    totalJobs: 10
  },
  {
    image: '/images/company2.png',
    categories: 'Marketing',
    description: 'Lorem',
    name: 'Twitter',
    totalJobs: 10
  },
]

interface FindCompaniesPageProps {
    
}
 
const FindCompaniesPage: FC<FindCompaniesPageProps> = () => {
    const formFilter = useForm<z.infer<typeof formFilterIndustryScema>>({
        resolver: zodResolver(formFilterIndustryScema),
        defaultValues: {
          industry: []
        }
      })
    
      const onSubmitFilter = async (val: z.infer<typeof formFilterIndustryScema>) => console.log(val);
    return (
        <ExploreDataContainer
            formFilter={formFilter}
            onSubmitFIlter={onSubmitFilter}
            filterForm={FILTER_FORMS}
            title='dream companies'
            subtitle='Find the dream companies you dream work for'
            loading={false}
            type='company'
            data={dataDummy}
        />
    );
}
 
export default FindCompaniesPage;