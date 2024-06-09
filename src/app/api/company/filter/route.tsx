import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import { supabasePublicUrl } from "@/lib/supabase";
import { CompanyType, JobType } from "@/types";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const filterCategory = searchParams.get('category') !== '' ? searchParams.get('category')?.split(',') : [];

    const categoryQuery: Prisma.CompanyWhereInput = filterCategory && filterCategory.length > 0 ? {
        CompanyOverview: {
            every: {
                industry: {
                    in: filterCategory
                }
            }
        }
    } : {};

    const companies = await prisma.company.findMany({
        where: {...categoryQuery},
        include: {
            CompanyOverview: true,
            CompanyTeam: true,
            CompanySocialMedia: true,
            _count: {
                select: {
                    Job: true
                }
            }
        }
    })

    if (!companies) return [];

    let imageName: string;
    let imageUrl: string;

    const parseCompanies: CompanyType[] = await Promise.all(
        companies.map(async (item: any) => { 
            imageName = item.CompanyOverview?.[0]?.image;

            if (imageName) {
                imageUrl = await supabasePublicUrl(imageName, 'company');
            } else {
                imageUrl = '/images/company2.png'
            }
            
            const companyDetail = item?.CompanyOverview?.[0];

            const company: CompanyType = {
                id: item.id,
                name: companyDetail?.name,
                image: imageUrl,
                dateFounded: companyDetail?.dateFounded,
                description: companyDetail?.description,
                employee: companyDetail?.employee,
                industry: companyDetail?.industry,
                location: companyDetail?.location,
                techStack: companyDetail?.techStack,
                webiste: companyDetail?.website,
                sosmed: item?.CompanySosialMedia?.[0],
                teams: item?.CompanyTeam,
                totalJobs: item._count.Job
            }

            return company;
        })
    );
    return NextResponse.json(parseCompanies);
}