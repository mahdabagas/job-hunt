import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { JobType } from "@/types";
import { supabasePublicUrl } from "@/lib/supabase";

export async function GET() {
    const jobs = await prisma.job.findMany({
        take: 6,
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
            imageName = item.Company?.CompanyOverview?.[0].image;

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