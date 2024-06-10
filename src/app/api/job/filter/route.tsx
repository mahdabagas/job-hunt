import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";
import { supabasePublicUrl } from "@/lib/supabase";

export async function GET(request: Request){
    try {
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
            where: { ...categoryQuery },
            include: {
                CategoryJob: true,
                Company: {
                    include: {
                        CompanyOverview: true
                    }
                }
            }
        });

        if (!jobs || jobs.length === 0) {
            return NextResponse.json([]);
        }

        const parseJobs = await Promise.all(
            jobs.map(async (item) => {
                const imageName = item.Company?.CompanyOverview?.[0]?.image;
                const imageUrl = imageName ? await supabasePublicUrl(imageName, 'company') : '/images/company2.png';

                return {
                    id: item.id,
                    applicants: item.applicants,
                    categories: item.CategoryJob,
                    desc: item.description,
                    image: imageUrl,
                    jobType: item.jobType,
                    location: item.Company?.CompanyOverview?.[0]?.location,
                    name: item.roles,
                    needs: item.needs,
                    type: item.CategoryJob?.name,
                    skills: item.requiredSkils
                };
            })
        );

        return NextResponse.json(parseJobs);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
