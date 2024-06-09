"use client"

import { CATEGORIES_OPTIONS } from "@/constants";
import ExploreDataContainer from "@/containers/ExploreDataContainer";
import useCategoryCompanyFIlter from "@/hooks/useCategoryCompanyFIlter";
import useCompanies from "@/hooks/useCompanies";
import { formFilterIndustryScema } from "@/lib/form-schema";
import { CompanyType, filterFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface FindCompaniesPageProps {}

const FindCompaniesPage: FC<FindCompaniesPageProps> = () => {
  const {filters} = useCategoryCompanyFIlter();

  const [categories, setCategories] = useState<string[]>([]);

  const {data, mutate, isLoading} = useCompanies(categories);

  useEffect(() => {
    mutate();
  }, [categories])

  const formFilter = useForm<z.infer<typeof formFilterIndustryScema>>({
      resolver: zodResolver(formFilterIndustryScema),
      defaultValues: {
        industry: []
      }
    })
  
  const onSubmitFilter = async (val: z.infer<typeof formFilterIndustryScema>) => {
    setCategories(val.industry)
  };

  return (
      <ExploreDataContainer
          formFilter={formFilter}
          onSubmitFIlter={onSubmitFilter}
          filterForm={filters}
          title='dream companies'
          subtitle='Find the dream companies you dream work for'
          loading={isLoading}
          type='company'
          data={data}
      />
  );
}
 
export default FindCompaniesPage;