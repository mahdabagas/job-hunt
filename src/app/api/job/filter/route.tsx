import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import { supabasePublicUrl } from "@/lib/supabase";
import { JobType } from "@/types";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const filterCategory = searchParams.get('category') !== '' ? searchParams.get('category')?.split(',') : [];

    const categoryQuery: Prisma.JobWhereInput = filterCategory && filterCategory.length > 0 ? {
        CategoryJob: {
            id: {
                in: filterCategory
            }
        }
    } : {};

    const jobs = await prisma.job.findMany({
        where: {...categoryQuery},
        include: {
            CategoryJob: true,
            Company: {
                include: {
                    CompanyOverview: true
                }
            }
        }
    })

    if (!jobs) return [];

    let imageName: string;
    let imageUrl: string;

    const parseJobs: JobType[] = await Promise.all(
        jobs.map(async (item: any) => { 
            imageName = item.Company?.CompanyOverview?.[0]?.image;

            if (imageName) {
                imageUrl = await supabasePublicUrl(imageName, 'company');
            } else {
                imageUrl = '/images/company2.png'
            }
            
        return ({
            id: item?.id,
            applicants: item?.applicants,
            categories: item?.CategoryJob,
            desc: item?.description,
            image: imageUrl,
            jobType: item?.jobType,
            location: item?.Company?.CompanyOverview?.[0]?.location,
            name: item?.roles,
            needs: item?.needs,
            type: item?.CategoryJob?.name,
            skills: item.requiredSkils
        })
    }))

    return NextResponse.json(parseJobs);
}