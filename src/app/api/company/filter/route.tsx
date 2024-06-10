import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import { supabasePublicUrl } from "@/lib/supabase";
import { CompanyType, JobType } from "@/types";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const filterCategory = searchParams.get('category')?.split(',').filter(Boolean) || [];

        const categoryQuery: Prisma.CompanyWhereInput = filterCategory.length > 0 ? {
            CompanyOverview: {
                every: {
                    industry: {
                        in: filterCategory
                    }
                }
            }
        } : {};

        const companies = await prisma.company.findMany({
            where: categoryQuery,
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
        });

        if (!companies.length) {
            return NextResponse.json([]);
        }

        const parseCompanies = await Promise.all(
            companies.map(async (item) => {
                const companyDetail = item.CompanyOverview[0];
                const imageName = companyDetail?.image;
                const imageUrl = imageName ? await supabasePublicUrl(imageName, 'company') : '/images/company2.png';

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
                    sosmed: item.CompanySocialMedia[0],
                    teams: item.CompanyTeam,
                    totalJobs: item._count.Job
                };

                return company;
            })
        );

        return NextResponse.json(parseCompanies);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}